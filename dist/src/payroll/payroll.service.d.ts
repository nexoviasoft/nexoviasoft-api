import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { Repository } from 'typeorm';
import { Payroll } from './entities/payroll.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';
export declare class PayrollService {
    private readonly payrollRepository;
    private readonly ourTeamRepository;
    private readonly emailService;
    constructor(payrollRepository: Repository<Payroll>, ourTeamRepository: Repository<OurTeam>, emailService: EmailService);
    private computeNetPay;
    create(createPayrollDto: CreatePayrollDto): Promise<Payroll>;
    findAll(): Promise<Payroll[]>;
    getStats(periodYear?: number, periodMonth?: number): Promise<{
        periodYear: number;
        periodMonth: number;
        totalCost: number;
        avgSalary: number;
        pendingCount: number;
        paidCount: number;
        pendingAmount: number;
    }>;
    findOne(id: number): Promise<Payroll>;
    update(id: number, updatePayrollDto: UpdatePayrollDto): Promise<Payroll>;
    markPaid(id: number): Promise<Payroll>;
    remove(id: number): Promise<Payroll>;
    private sendPayrollPaidEmail;
}
