import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(OurTeam)
    private readonly ourTeamRepository: Repository<OurTeam>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.ourTeamRepository.findOne({
      where: { email },
      relations: ['department'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return user without password
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        position: user.position,
        department: user.department,
        profileImage: user.profileImage,
      },
    };
  }

  async findById(id: number): Promise<any> {
    const user = await this.ourTeamRepository.findOne({
      where: { id },
      relations: ['department'],
    });

    if (!user) {
      return null;
    }

    const { password: _, ...result } = user;
    return result;
  }

  async validateJwtPayload(payload: any): Promise<any> {
    const user = await this.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is not active');
    }
    return user;
  }
}
