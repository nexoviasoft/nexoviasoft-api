import { Repository } from 'typeorm';
import { CreateOurServiceDto } from './dto/create-our-service.dto';
import { UpdateOurServiceDto } from './dto/update-our-service.dto';
import { OurService } from './entities/our-service.entity';
export declare class OurServiceService {
    private readonly ourServiceRepository;
    constructor(ourServiceRepository: Repository<OurService>);
    create(createOurServiceDto: CreateOurServiceDto): Promise<OurService>;
    findAll(): Promise<OurService[]>;
    findOne(id: number): Promise<OurService>;
    update(id: number, updateOurServiceDto: UpdateOurServiceDto): Promise<OurService>;
    remove(id: number): Promise<OurService>;
}
