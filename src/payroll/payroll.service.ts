import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payroll, PayrollStatus } from './entities/payroll.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private readonly payrollRepository: Repository<Payroll>,
    @InjectRepository(OurTeam)
    private readonly ourTeamRepository: Repository<OurTeam>,
    private readonly emailService: EmailService,
  ) { }

  private computeNetPay(baseSalary = 0, bonus = 0, deductions = 0) {
    const net = Number(baseSalary) + Number(bonus) - Number(deductions);
    return Math.max(0, net);
  }

  async create(createPayrollDto: CreatePayrollDto) {
    const team = await this.ourTeamRepository.findOne({
      where: { id: createPayrollDto.teamId },
    });
    if (!team) {
      throw new NotFoundException(
        `Team member with ID ${createPayrollDto.teamId} not found`,
      );
    }

    const payroll = this.payrollRepository.create({
      ...createPayrollDto,
      baseSalary: createPayrollDto.baseSalary ?? 0,
      bonus: createPayrollDto.bonus ?? 0,
      deductions: createPayrollDto.deductions ?? 0,
      netPay: this.computeNetPay(
        createPayrollDto.baseSalary ?? 0,
        createPayrollDto.bonus ?? 0,
        createPayrollDto.deductions ?? 0,
      ),
      status: (createPayrollDto.status ?? 'Pending') as PayrollStatus,
      paymentDate:
        (createPayrollDto.status ?? 'Pending') === 'Paid' ? new Date() : null,
    });

    return await this.payrollRepository.save(payroll);
  }

  async findAll() {
    return await this.payrollRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['team', 'team.department'],
    });
  }

  async getStats(periodYear?: number, periodMonth?: number) {
    const qb = this.payrollRepository.createQueryBuilder('p');

    if (periodYear) qb.andWhere('p.periodYear = :periodYear', { periodYear });
    if (periodMonth) qb.andWhere('p.periodMonth = :periodMonth', { periodMonth });

    const row = await qb
      .select('COALESCE(SUM(p.netPay), 0)', 'totalNetPay')
      .addSelect('COALESCE(AVG(p.netPay), 0)', 'avgNetPay')
      .addSelect(
        "COALESCE(SUM(CASE WHEN p.status = 'Pending' THEN 1 ELSE 0 END), 0)",
        'pendingCount',
      )
      .addSelect(
        "COALESCE(SUM(CASE WHEN p.status = 'Paid' THEN 1 ELSE 0 END), 0)",
        'paidCount',
      )
      .addSelect(
        "COALESCE(SUM(CASE WHEN p.status = 'Pending' THEN p.netPay ELSE 0 END), 0)",
        'pendingAmount',
      )
      .getRawOne<{
        totalNetPay: string;
        avgNetPay: string;
        pendingCount: string;
        paidCount: string;
        pendingAmount: string;
      }>();

    return {
      periodYear: periodYear ?? null,
      periodMonth: periodMonth ?? null,
      totalCost: Number(row?.totalNetPay ?? 0),
      avgSalary: Number(row?.avgNetPay ?? 0),
      pendingCount: Number(row?.pendingCount ?? 0),
      paidCount: Number(row?.paidCount ?? 0),
      pendingAmount: Number(row?.pendingAmount ?? 0),
    };
  }

  async findOne(id: number) {
    const payroll = await this.payrollRepository.findOne({
      where: { id },
      relations: ['team', 'team.department'],
    });
    if (!payroll) {
      throw new NotFoundException(`Payroll with ID ${id} not found`);
    }
    return payroll;
  }

  async update(id: number, updatePayrollDto: UpdatePayrollDto) {
    const payroll = await this.findOne(id);
    const prevStatus = payroll.status;

    Object.assign(payroll, updatePayrollDto);

    // Recalculate net pay if any money fields changed
    const baseSalary =
      updatePayrollDto.baseSalary !== undefined
        ? updatePayrollDto.baseSalary
        : payroll.baseSalary;
    const bonus =
      updatePayrollDto.bonus !== undefined ? updatePayrollDto.bonus : payroll.bonus;
    const deductions =
      updatePayrollDto.deductions !== undefined
        ? updatePayrollDto.deductions
        : payroll.deductions;

    payroll.netPay = this.computeNetPay(baseSalary as any, bonus as any, deductions as any);

    // If status became Paid, set paymentDate + send email
    if (prevStatus !== 'Paid' && payroll.status === 'Paid') {
      payroll.paymentDate = payroll.paymentDate ?? new Date();
      await this.sendPayrollPaidEmail(payroll);
    }

    return await this.payrollRepository.save(payroll);
  }

  async markPaid(id: number) {
    return await this.update(id, { status: 'Paid' } as UpdatePayrollDto);
  }

  async remove(id: number) {
    const payroll = await this.findOne(id);
    return await this.payrollRepository.remove(payroll);
  }

  private async sendPayrollPaidEmail(payroll: Payroll) {
    // Ensure we have team loaded
    const loaded = payroll.team
      ? payroll
      : await this.findOne(payroll.id);

    const team = loaded.team;
    if (!team?.email) return;

    const name = `${team.firstName ?? ''} ${team.lastName ?? ''}`.trim() || 'Team member';
    const period = `${String(loaded.periodMonth).padStart(2, '0')}/${loaded.periodYear}`;
    const amount = Number(loaded.netPay ?? 0).toFixed(2);

    const subject = `Salary Paid - ${period}`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin: 0 0 12px;">Salary Paid</h2>
        <p>Hi ${name},</p>
        <p>Your salary has been marked as <b>Paid</b> for <b>${period}</b>.</p>
        <p><b>Net Pay:</b> $${amount}</p>
        ${loaded.paymentDate
        ? `<p><b>Payment Date:</b> ${new Date(loaded.paymentDate).toDateString()}</p>`
        : ''
      }
        <p style="margin-top: 18px;">Thanks,<br/>NexoviaSoft</p>
      </div>
    `;

    await this.emailService.sendGenericEmail(team.email, subject, htmlBody);
  }
}
