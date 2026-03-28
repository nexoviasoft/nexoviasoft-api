import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';
import { DocumentsService } from '../documents/documents.service';
export declare class ExpenseService {
    private readonly expenseRepository;
    private readonly teamRepository;
    private readonly emailService;
    private readonly documentsService;
    private readonly logger;
    constructor(expenseRepository: Repository<Expense>, teamRepository: Repository<OurTeam>, emailService: EmailService, documentsService: DocumentsService);
    create(createExpenseDto: CreateExpenseDto, user: any): Promise<Expense>;
    findAll(user: any): Promise<Expense[]>;
    findOne(id: number): Promise<Expense>;
    update(id: number, updateExpenseDto: UpdateExpenseDto, user: any): Promise<Expense>;
    approve(id: number, approverId: number): Promise<Expense>;
    reject(id: number, approverId: number): Promise<Expense>;
    remove(id: number): Promise<Expense>;
}
