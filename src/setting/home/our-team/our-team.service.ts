import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOurTeamDto } from './dto/create-our-team.dto';
import { UpdateOurTeamDto } from './dto/update-our-team.dto';
import { OurTeam } from './entities/our-team.entity';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../../../common/services/email.service';

@Injectable()
export class OurTeamService {
  private readonly logger = new Logger(OurTeamService.name);

  constructor(
    @InjectRepository(OurTeam)
    private readonly ourTeamRepository: Repository<OurTeam>,
    private readonly emailService: EmailService,
  ) {}

  async create(createOurTeamDto: CreateOurTeamDto) {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(createOurTeamDto.password, 10);
    
    const { password, hireDate, dateOfBirth, ...rest } = createOurTeamDto;
    
    const employee = this.ourTeamRepository.create({
      ...rest,
      password: hashedPassword,
      hireDate: hireDate ? new Date(hireDate) : null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
    } as Partial<OurTeam>);
    
    const savedEmployee = await this.ourTeamRepository.save(employee);
    
    if (savedEmployee.email) {
      this.emailService
        .sendTeamMemberCredentials(
          savedEmployee.email,
          `${savedEmployee.firstName} ${savedEmployee.lastName}`,
          createOurTeamDto.password,
          savedEmployee.position || 'Team Member',
        )
        .catch((err) => {
          this.logger.error(
            `Team member created but credentials email failed for ${savedEmployee.email}`,
            err?.stack || String(err),
          );
        });
    }
    
    return savedEmployee;
  }

  findAll() {
    return this.ourTeamRepository.find({
      relations: ['department'],
    });
  }

  async findAllPublic() {
    const employees = await this.ourTeamRepository.find({
      where: { status: 'active' },
      select: ['id', 'firstName', 'lastName', 'profileImage', 'position'],
    });
    
    // Transform to return name, image, and designation
    return employees.map(employee => ({
      id: employee.id,
      name: `${employee.firstName} ${employee.lastName}`,
      image: employee.profileImage,
      designation: employee.position,
    }));
  }

  async findOne(id: number) {
    const employee = await this.ourTeamRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    
    return employee;
  }

  async findByEmail(email: string) {
    const employee = await this.ourTeamRepository.findOne({
      where: { email },
      relations: ['department'],
    });
    
    if (!employee) {
      throw new NotFoundException(`Employee with email ${email} not found`);
    }
    
    return employee;
  }

  async update(id: number, updateOurTeamDto: UpdateOurTeamDto) {
    const employee = await this.findOne(id);
    
    // Hash password if it's being updated
    if (updateOurTeamDto.password) {
      updateOurTeamDto.password = await bcrypt.hash(updateOurTeamDto.password, 10);
    }
    
    // Convert date strings to Date objects if provided
    if (updateOurTeamDto.hireDate) {
      (updateOurTeamDto as any).hireDate = new Date(updateOurTeamDto.hireDate);
    }
    if (updateOurTeamDto.dateOfBirth) {
      (updateOurTeamDto as any).dateOfBirth = new Date(updateOurTeamDto.dateOfBirth);
    }
    
    Object.assign(employee, updateOurTeamDto);
    return this.ourTeamRepository.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    return this.ourTeamRepository.remove(employee);
  }

  async activate(id: number) {
    const employee = await this.findOne(id);
    employee.status = 'active';
    return this.ourTeamRepository.save(employee);
  }

  async deactivate(id: number) {
    const employee = await this.findOne(id);
    employee.status = 'inactive';
    return this.ourTeamRepository.save(employee);
  }

  async suspend(id: number) {
    const employee = await this.findOne(id);
    employee.status = 'suspended';
    return this.ourTeamRepository.save(employee);
  }
}
