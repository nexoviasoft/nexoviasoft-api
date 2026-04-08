import type { PayrollStatus } from '../entities/payroll.entity';
export declare class CreatePayrollDto {
    teamId: number;
    periodYear: number;
    periodMonth: number;
    baseSalary?: number;
    bonus?: number;
    deductions?: number;
    status?: PayrollStatus;
    notes?: string;
}
