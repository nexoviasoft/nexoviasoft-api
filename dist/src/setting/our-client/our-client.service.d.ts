import { Repository } from 'typeorm';
import { CreateOurClientDto } from './dto/create-our-client.dto';
import { UpdateOurClientDto } from './dto/update-our-client.dto';
import { OurClient } from './entities/our-client.entity';
export declare class OurClientService {
    private readonly ourClientRepository;
    constructor(ourClientRepository: Repository<OurClient>);
    create(createOurClientDto: CreateOurClientDto): Promise<OurClient>;
    findAll(): Promise<OurClient[]>;
    findOne(id: number): Promise<OurClient>;
    update(id: number, updateOurClientDto: UpdateOurClientDto): Promise<OurClient>;
    remove(id: number): Promise<OurClient>;
}
