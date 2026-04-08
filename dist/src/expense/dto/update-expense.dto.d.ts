import { CreateExpenseDto } from './create-expense.dto';
import { ExpenseStatus } from '../entities/expense.entity';
declare const UpdateExpenseDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateExpenseDto>>;
export declare class UpdateExpenseDto extends UpdateExpenseDto_base {
    status?: ExpenseStatus;
    rejectionReason?: string;
}
export {};
