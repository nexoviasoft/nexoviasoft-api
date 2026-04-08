import { IncomeService } from './income.service';
import { CreateIncomeDto, UpdateIncomeDto } from './dto/create-income.dto';
export declare class IncomeController {
    private readonly incomeService;
    constructor(incomeService: IncomeService);
    create(createIncomeDto: CreateIncomeDto): Promise<import("./entities/income.entity").Income>;
    findAll(): Promise<import("./entities/income.entity").Income[]>;
    findOne(id: string): Promise<import("./entities/income.entity").Income>;
    update(id: string, updateIncomeDto: UpdateIncomeDto): Promise<import("./entities/income.entity").Income>;
    remove(id: string): Promise<import("./entities/income.entity").Income>;
}
