import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';
export declare enum ExpenseStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum ExpenseType {
    ADVANCE_SALARY = "advance salary",
    COMPANY_ITEMS = "company items",
    LOAN = "loan",
    OTHER = "other"
}
export declare class Expense {
    id: number;
    type: ExpenseType;
    amount: number;
    description: string;
    status: ExpenseStatus;
    requester: OurTeam;
    requesterId: number;
    approver: OurTeam;
    approverId: number;
    rejectionReason: string;
    createdAt: Date;
    updatedAt: Date;
}
