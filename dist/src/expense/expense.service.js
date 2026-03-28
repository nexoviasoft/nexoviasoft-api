"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ExpenseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_1 = require("./entities/expense.entity");
const our_team_entity_1 = require("../setting/home/our-team/entities/our-team.entity");
const email_service_1 = require("../common/services/email.service");
const documents_service_1 = require("../documents/documents.service");
let ExpenseService = ExpenseService_1 = class ExpenseService {
    constructor(expenseRepository, teamRepository, emailService, documentsService) {
        this.expenseRepository = expenseRepository;
        this.teamRepository = teamRepository;
        this.emailService = emailService;
        this.documentsService = documentsService;
        this.logger = new common_1.Logger(ExpenseService_1.name);
    }
    async create(createExpenseDto, user) {
        const expense = this.expenseRepository.create({
            ...createExpenseDto,
            requesterId: user.id,
            status: expense_entity_1.ExpenseStatus.PENDING,
        });
        const savedExpense = await this.expenseRepository.save(expense);
        try {
            const managers = await this.teamRepository.find({
                where: [
                    { role: 'Manager' },
                    { role: 'Admin' }
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
        `;
                await this.emailService.sendGenericEmail(managerEmails, subject, body);
            }
        }
        catch (error) {
            this.logger.error('Failed to send expense notification to managers', error);
        }
        return savedExpense;
    }
    async findAll(user) {
        if (user.role === 'Admin' || user.role === 'Manager') {
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
    async findOne(id) {
        const expense = await this.expenseRepository.findOne({
            where: { id },
            relations: ['requester', 'approver'],
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }
    async update(id, updateExpenseDto, user) {
        const expense = await this.findOne(id);
        if (updateExpenseDto.status && user.role !== 'Admin' && user.role !== 'Manager') {
            throw new common_1.ForbiddenException('Only Managers or Admins can approve/reject expenses');
        }
        if (updateExpenseDto.status === expense_entity_1.ExpenseStatus.APPROVED && expense.status !== expense_entity_1.ExpenseStatus.APPROVED) {
            return await this.approve(id, user.id);
        }
        if (updateExpenseDto.status === expense_entity_1.ExpenseStatus.REJECTED && expense.status !== expense_entity_1.ExpenseStatus.REJECTED) {
            return await this.reject(id, user.id);
        }
        Object.assign(expense, updateExpenseDto);
        return await this.expenseRepository.save(expense);
    }
    async approve(id, approverId) {
        const expense = await this.findOne(id);
        if (expense.status === expense_entity_1.ExpenseStatus.APPROVED) {
            return expense;
        }
        expense.status = expense_entity_1.ExpenseStatus.APPROVED;
        expense.approverId = approverId;
        const savedExpense = await this.expenseRepository.save(expense);
        try {
            const requester = await this.teamRepository.findOne({ where: { id: expense.requesterId } });
            if (requester) {
                await this.documentsService.create({
                    type: 'invoice',
                    clientName: `${requester.firstName} ${requester.lastName}`,
                    clientEmail: requester.email,
                    data: {
                        invoiceNumber: `EXP-${expense.id}`,
                        date: new Date().toLocaleDateString(),
                        clientName: `${requester.firstName} ${requester.lastName}`,
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
                const subject = `Expense Request Approved - ${expense.type}`;
                const body = `
          <h2>Expense Approved</h2>
          <p>Your expense request for <strong>${expense.type}</strong> of <strong>${expense.amount}</strong> has been approved.</p>
          <p>An invoice has been generated for your records.</p>
        `;
                await this.emailService.sendGenericEmail(requester.email, subject, body);
            }
        }
        catch (error) {
            this.logger.error('Failed to generate invoice or notify requester for approved expense', error);
        }
        return savedExpense;
    }
    async reject(id, approverId) {
        const expense = await this.findOne(id);
        expense.status = expense_entity_1.ExpenseStatus.REJECTED;
        expense.approverId = approverId;
        const savedExpense = await this.expenseRepository.save(expense);
        try {
            const requester = await this.teamRepository.findOne({ where: { id: expense.requesterId } });
            if (requester) {
                const subject = `Expense Request Rejected - ${expense.type}`;
                const body = `
          <h2>Expense Rejected</h2>
          <p>Your expense request for <strong>${expense.type}</strong> of <strong>${expense.amount}</strong> has been rejected.</p>
        `;
                await this.emailService.sendGenericEmail(requester.email, subject, body);
            }
        }
        catch (error) {
            this.logger.error('Failed to notify requester for rejected expense', error);
        }
        return savedExpense;
    }
    async remove(id) {
        const expense = await this.findOne(id);
        return await this.expenseRepository.remove(expense);
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = ExpenseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __param(1, (0, typeorm_1.InjectRepository)(our_team_entity_1.OurTeam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService,
        documents_service_1.DocumentsService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map