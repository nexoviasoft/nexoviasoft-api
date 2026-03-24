import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';
export type PayrollStatus = 'Pending' | 'Processing' | 'Paid';
export declare class Payroll {
    id: number;
    team: OurTeam;
    teamId: number;
    periodYear: number;
    periodMonth: number;
    baseSalary: number;
    bonus: number;
    deductions: number;
    netPay: number;
    status: PayrollStatus;
    paymentDate: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}
