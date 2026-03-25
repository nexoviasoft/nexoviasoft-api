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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payroll_entity_1 = require("./entities/payroll.entity");
const our_team_entity_1 = require("../setting/home/our-team/entities/our-team.entity");
const email_service_1 = require("../common/services/email.service");
let PayrollService = class PayrollService {
    constructor(payrollRepository, ourTeamRepository, emailService) {
        this.payrollRepository = payrollRepository;
        this.ourTeamRepository = ourTeamRepository;
        this.emailService = emailService;
    }
    computeNetPay(baseSalary = 0, bonus = 0, deductions = 0) {
        const net = Number(baseSalary) + Number(bonus) - Number(deductions);
        return Math.max(0, net);
    }
    async create(createPayrollDto) {
        const team = await this.ourTeamRepository.findOne({
            where: { id: createPayrollDto.teamId },
        });
        if (!team) {
            throw new common_1.NotFoundException(`Team member with ID ${createPayrollDto.teamId} not found`);
        }
        const payroll = this.payrollRepository.create({
            ...createPayrollDto,
            baseSalary: createPayrollDto.baseSalary ?? 0,
            bonus: createPayrollDto.bonus ?? 0,
            deductions: createPayrollDto.deductions ?? 0,
            netPay: this.computeNetPay(createPayrollDto.baseSalary ?? 0, createPayrollDto.bonus ?? 0, createPayrollDto.deductions ?? 0),
            status: (createPayrollDto.status ?? 'Pending'),
            paymentDate: (createPayrollDto.status ?? 'Pending') === 'Paid' ? new Date() : null,
        });
        return await this.payrollRepository.save(payroll);
    }
    async findAll() {
        return await this.payrollRepository.find({
            order: { createdAt: 'DESC' },
            relations: ['team', 'team.department'],
        });
    }
    async getStats(periodYear, periodMonth) {
        const qb = this.payrollRepository.createQueryBuilder('p');
        if (periodYear)
            qb.andWhere('p.periodYear = :periodYear', { periodYear });
        if (periodMonth)
            qb.andWhere('p.periodMonth = :periodMonth', { periodMonth });
        const row = await qb
            .select('COALESCE(SUM(p.netPay), 0)', 'totalNetPay')
            .addSelect('COALESCE(AVG(p.netPay), 0)', 'avgNetPay')
            .addSelect("COALESCE(SUM(CASE WHEN p.status = 'Pending' THEN 1 ELSE 0 END), 0)", 'pendingCount')
            .addSelect("COALESCE(SUM(CASE WHEN p.status = 'Paid' THEN 1 ELSE 0 END), 0)", 'paidCount')
            .addSelect("COALESCE(SUM(CASE WHEN p.status = 'Pending' THEN p.netPay ELSE 0 END), 0)", 'pendingAmount')
            .getRawOne();
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
    async findOne(id) {
        const payroll = await this.payrollRepository.findOne({
            where: { id },
            relations: ['team', 'team.department'],
        });
        if (!payroll) {
            throw new common_1.NotFoundException(`Payroll with ID ${id} not found`);
        }
        return payroll;
    }
    async update(id, updatePayrollDto) {
        const payroll = await this.findOne(id);
        const prevStatus = payroll.status;
        Object.assign(payroll, updatePayrollDto);
        const baseSalary = updatePayrollDto.baseSalary !== undefined
            ? updatePayrollDto.baseSalary
            : payroll.baseSalary;
        const bonus = updatePayrollDto.bonus !== undefined ? updatePayrollDto.bonus : payroll.bonus;
        const deductions = updatePayrollDto.deductions !== undefined
            ? updatePayrollDto.deductions
            : payroll.deductions;
        payroll.netPay = this.computeNetPay(baseSalary, bonus, deductions);
        if (prevStatus !== 'Paid' && payroll.status === 'Paid') {
            payroll.paymentDate = payroll.paymentDate ?? new Date();
            await this.sendPayrollPaidEmail(payroll);
        }
        return await this.payrollRepository.save(payroll);
    }
    async markPaid(id) {
        return await this.update(id, { status: 'Paid' });
    }
    async remove(id) {
        const payroll = await this.findOne(id);
        return await this.payrollRepository.remove(payroll);
    }
    async sendPayrollPaidEmail(payroll) {
        const loaded = payroll.team
            ? payroll
            : await this.findOne(payroll.id);
        const team = loaded.team;
        if (!team?.email)
            return;
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
                : ''}
        <p style="margin-top: 18px;">Thanks,<br/>NexoviaSoft</p>
      </div>
    `;
        await this.emailService.sendGenericEmail(team.email, subject, htmlBody);
    }
};
exports.PayrollService = PayrollService;
exports.PayrollService = PayrollService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payroll_entity_1.Payroll)),
    __param(1, (0, typeorm_1.InjectRepository)(our_team_entity_1.OurTeam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
    typeorm_2.Repository,
    email_service_1.EmailService])
], PayrollService);
//# sourceMappingURL=payroll.service.js.map