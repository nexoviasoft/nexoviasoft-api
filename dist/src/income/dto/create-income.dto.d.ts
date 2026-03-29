export declare class CreateIncomeDto {
    orderId?: number;
    clientId: number;
    amount: number;
    description?: string;
    date?: string;
    receiptNo?: string;
}
export declare class UpdateIncomeDto {
    orderId?: number;
    clientId?: number;
    amount?: number;
    description?: string;
    date?: string;
    receiptNo?: string;
}
