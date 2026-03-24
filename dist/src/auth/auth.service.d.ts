import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
export declare class AuthService {
    private readonly ourTeamRepository;
    private readonly jwtService;
    constructor(ourTeamRepository: Repository<OurTeam>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            position: any;
            department: any;
            profileImage: any;
        };
    }>;
    findById(id: number): Promise<any>;
    validateJwtPayload(payload: any): Promise<any>;
}
