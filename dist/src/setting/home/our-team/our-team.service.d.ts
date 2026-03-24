import { Repository } from 'typeorm';
import { CreateOurTeamDto } from './dto/create-our-team.dto';
import { UpdateOurTeamDto } from './dto/update-our-team.dto';
import { OurTeam } from './entities/our-team.entity';
export declare class OurTeamService {
    private readonly ourTeamRepository;
    constructor(ourTeamRepository: Repository<OurTeam>);
    create(createOurTeamDto: CreateOurTeamDto): Promise<OurTeam>;
    findAll(): Promise<OurTeam[]>;
    findAllPublic(): Promise<{
        id: number;
        name: string;
        image: string;
        designation: string;
    }[]>;
    findOne(id: number): Promise<OurTeam>;
    findByEmail(email: string): Promise<OurTeam>;
    update(id: number, updateOurTeamDto: UpdateOurTeamDto): Promise<OurTeam>;
    remove(id: number): Promise<OurTeam>;
    activate(id: number): Promise<OurTeam>;
    deactivate(id: number): Promise<OurTeam>;
    suspend(id: number): Promise<OurTeam>;
}
