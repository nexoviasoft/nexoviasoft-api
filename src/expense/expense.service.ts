import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense, ExpenseStatus } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';
import { DocumentsService } from '../documents/documents.service';

@Injectable()
export class ExpenseService {
  private readonly logger = new Logger(ExpenseService.name);

  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    @InjectRepository(OurTeam)
    private readonly teamRepository: Repository<OurTeam>,
    private readonly emailService: EmailService,
    private readonly documentsService: DocumentsService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, user: any) {
    const expense = this.expenseRepository.create({
      ...createExpenseDto,
      requesterId: user.id,
      status: ExpenseStatus.PENDING,
    });

    const savedExpense = await this.expenseRepository.save(expense);

    // Notify Managers
    try {
      const managers = await this.teamRepository.find({
        where: [
          { role: 'Manager' },
          { role: 'manager' },
          { role: 'Admin' },
          { role: 'admin' }
        ],
      });

      const managerEmails = managers.map(m => m.email).filter(e => !!e);
      if (managerEmails.length > 0) {
        const requesterName = `${user.firstName} ${user.lastName}`;
        const subject = `New Expense Request from ${requesterName}`;
        const body = `
          <h2>New Expense Request</h2>
          <p><strong>Requester:</strong> ${requesterName}</p>
          <p><strong>Type:</strong> ${savedExpense.type}</p>
          <p><strong>Amount:</strong> ${savedExpense.amount}</p>
          <p><strong>Description:</strong> ${savedExpense.description || 'N/A'}</p>
          <p>Please log in to the admin panel to approve or reject this request.</p>
          <div style="margin-top: 20px;">
            <a href="${process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com'}/admin/expense" 
               style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Review Expense Request
            </a>
          </div>
        `;
        await this.emailService.sendGenericEmail(managerEmails, subject, body);
      }
    } catch (error) {
      this.logger.error('Failed to send expense notification to managers', error);
    }

    return savedExpense;
  }

  async findAll(user: any) {
    const userRole = user?.role?.toLowerCase();
    if (userRole === 'admin' || userRole === 'manager') {
      return await this.expenseRepository.find({
        relations: ['requester', 'approver'],
        order: { createdAt: 'DESC' },
      });
    }
    return await this.expenseRepository.find({
      where: { requesterId: user.id },
      relations: ['requester', 'approver'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const expense = await this.expenseRepository.findOne({
      where: { id },
      relations: ['requester', 'approver'],
    });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto, user: any) {
    const expense = await this.findOne(id);

    // Only Admin or Manager can update status (approve/reject)
    const userRole = user?.role?.toLowerCase();
    if (updateExpenseDto.status && userRole !== 'admin' && userRole !== 'manager') {
      throw new ForbiddenException('Only Managers or Admins can approve/reject expenses');
    }

    if (updateExpenseDto.status === ExpenseStatus.APPROVED && expense.status !== ExpenseStatus.APPROVED) {
      return await this.approve(id, user.id);
    }

    if (updateExpenseDto.status === ExpenseStatus.REJECTED && expense.status !== ExpenseStatus.REJECTED) {
      return await this.reject(id, user.id, updateExpenseDto.rejectionReason);
    }

    Object.assign(expense, updateExpenseDto);
    return await this.expenseRepository.save(expense);
  }

  async approve(id: number, approverId: number) {
    const expense = await this.findOne(id);
    if (expense.status === ExpenseStatus.APPROVED) {
      return expense;
    }

    const approver = await this.teamRepository.findOne({ where: { id: approverId } });
    const managerName = approver ? `${approver.firstName} ${approver.lastName}` : 'Manager';

    expense.status = ExpenseStatus.APPROVED;
    expense.approverId = approverId;
    const savedExpense = await this.expenseRepository.save(expense);

    // Generate Invoice
    try {
      const requester = await this.teamRepository.findOne({ where: { id: expense.requesterId } });
      if (requester) {
        const invoice = await this.documentsService.create({
          type: 'invoice',
          clientName: `${requester.firstName} ${requester.lastName}`,
          clientEmail: requester.email,
          data: {
            invoiceNumber: `EXP-${expense.id}`,
            date: new Date().toLocaleDateString(),
            clientName: `${requester.firstName} ${requester.lastName}`,
            managerName: managerName,
            items: [
              {
                description: `Expense: ${expense.type} - ${expense.description || ''}`,
                quantity: 1,
                rate: expense.amount,
              }
            ],
          },
          status: 'approved',
        });

        // Generate Invoice HTML for attachment
        const invoiceHtml = this.documentsService.generateInvoiceHtml(invoice.data);

        // Notify Requester
        await this.emailService.sendExpenseApproval(
          requester.email,
          `${requester.firstName} ${requester.lastName}`,
          expense.type,
          expense.amount,
          managerName,
          invoice.id,
          invoiceHtml,
        );
      }
    } catch (error) {
      this.logger.error('Failed to generate invoice or notify requester for approved expense', error);
    }

    return savedExpense;
  }

  async reject(id: number, approverId: number, rejectionReason?: string) {
    const expense = await this.findOne(id);
    
    const approver = await this.teamRepository.findOne({ where: { id: approverId } });
    const managerName = approver ? `${approver.firstName} ${approver.lastName}` : 'Manager';

    expense.status = ExpenseStatus.REJECTED;
    expense.approverId = approverId;
    if (rejectionReason) {
      expense.rejectionReason = rejectionReason;
    }
    const savedExpense = await this.expenseRepository.save(expense);

    // Notify Requester
    try {
      const requester = await this.teamRepository.findOne({ where: { id: expense.requesterId } });
      if (requester) {
        await this.emailService.sendExpenseRejection(
          requester.email,
          `${requester.firstName} ${requester.lastName}`,
          expense.type,
          expense.amount,
          rejectionReason,
          managerName,
        );
      }
    } catch (error) {
      this.logger.error('Failed to notify requester for rejected expense', error);
    }

    return savedExpense;
  }

  async remove(id: number) {
    const expense = await this.findOne(id);
    return await this.expenseRepository.remove(expense);
  }
}
