import { ExpenseType } from '../entities/expense.entity';
export declare class CreateExpenseDto {
    type: ExpenseType;
    amount: number;
    description?: string;
}
