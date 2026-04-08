import { Repository } from 'typeorm';
import { Income } from './entities/income.entity';
import { CreateIncomeDto, UpdateIncomeDto } from './dto/create-income.dto';
import { Order } from '../order/entities/order.entity';
import { EmailService } from '../common/services/email.service';
import { OurClient } from '../setting/our-client/entities/our-client.entity';
export declare class IncomeService {
    private readonly incomeRepository;
    private readonly orderRepository;
    private readonly clientRepository;
    private readonly emailService;
    private readonly logger;
    constructor(incomeRepository: Repository<Income>, orderRepository: Repository<Order>, clientRepository: Repository<OurClient>, emailService: EmailService);
    private isMissingOrdersClientIdColumnError;
    create(createIncomeDto: CreateIncomeDto): Promise<Income>;
    findAll(): Promise<Income[]>;
    findOne(id: number): Promise<Income>;
    update(id: number, updateIncomeDto: UpdateIncomeDto): Promise<Income>;
    remove(id: number): Promise<Income>;
}
