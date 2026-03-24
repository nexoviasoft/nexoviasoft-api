import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './entities/leave.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class LeaveService {
  private readonly logger = new Logger(LeaveService.name);

  constructor(
    @InjectRepository(Leave)
    private readonly leaveRepository: Repository<Leave>,
    @InjectRepository(OurTeam)
    private readonly ourTeamRepository: Repository<OurTeam>,
    private readonly emailService: EmailService,
  ) {}

  async create(createLeaveDto: CreateLeaveDto) {
    const team = await this.ourTeamRepository.findOne({
      where: { id: createLeaveDto.teamId },
    });

    if (!team) {
      throw new NotFoundException(`Team member with ID ${createLeaveDto.teamId} not found`);
    }

    const leave = this.leaveRepository.create({
      ...createLeaveDto,
      startDate: new Date(createLeaveDto.startDate),
      endDate: new Date(createLeaveDto.endDate),
      appliedOn: new Date(),
    });

    return await this.leaveRepository.save(leave);
  }

  async findAll() {
    return await this.leaveRepository.find({
      relations: ['team'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByTeamId(teamId: number) {
    return await this.leaveRepository.find({
      where: { teamId },
      relations: ['team'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const leave = await this.leaveRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }

    return leave;
  }

  async findOneByTeamId(id: number, teamId: number) {
    const leave = await this.leaveRepository.findOne({
      where: { id, teamId },
      relations: ['team'],
    });

    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found or you don't have permission to view it`);
    }

    return leave;
  }

  async update(id: number, updateLeaveDto: UpdateLeaveDto) {
    const leave = await this.findOne(id);

    if (updateLeaveDto.startDate) {
      leave.startDate = new Date(updateLeaveDto.startDate);
    }
    if (updateLeaveDto.endDate) {
      leave.endDate = new Date(updateLeaveDto.endDate);
    }

    Object.assign(leave, updateLeaveDto);
    return await this.leaveRepository.save(leave);
  }

  async updateByTeamId(id: number, teamId: number, updateLeaveDto: UpdateLeaveDto) {
    const leave = await this.findOneByTeamId(id, teamId);

    if (updateLeaveDto.startDate) {
      leave.startDate = new Date(updateLeaveDto.startDate);
    }
    if (updateLeaveDto.endDate) {
      leave.endDate = new Date(updateLeaveDto.endDate);
    }

    Object.assign(leave, updateLeaveDto);
    return await this.leaveRepository.save(leave);
  }

  async remove(id: number) {
    const leave = await this.findOne(id);
    await this.leaveRepository.remove(leave);
    return { message: 'Leave deleted successfully' };
  }

  async removeByTeamId(id: number, teamId: number) {
    const leave = await this.findOneByTeamId(id, teamId);
    await this.leaveRepository.remove(leave);
    return { message: 'Leave deleted successfully' };
  }

  async approve(id: number) {
    const leave = await this.leaveRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }

    if (leave.status === 'approved') {
      return leave;
    }

    leave.status = 'approved';
    const updatedLeave = await this.leaveRepository.save(leave);

    // Send approval email
    try {
      const employeeName = `${leave.team.firstName} ${leave.team.lastName}`;
      // Convert date strings to Date objects if needed
      const startDate = leave.startDate instanceof Date 
        ? leave.startDate 
        : new Date(leave.startDate);
      const endDate = leave.endDate instanceof Date 
        ? leave.endDate 
        : new Date(leave.endDate);
      
      await this.emailService.sendLeaveApproval(
        leave.team.email,
        employeeName,
        leave.type,
        startDate.toISOString(),
        endDate.toISOString(),
        leave.days,
        leave.reason,
      );
      this.logger.log(`Approval email sent to ${leave.team.email}`);
    } catch (error) {
      this.logger.error(`Failed to send approval email:`, error);
      // Don't throw error, just log it
    }

    return updatedLeave;
  }

  async reject(id: number, rejectionReason?: string) {
    const leave = await this.leaveRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }

    if (leave.status === 'rejected') {
      return leave;
    }

    leave.status = 'rejected';
    const updatedLeave = await this.leaveRepository.save(leave);

    // Send rejection email
    try {
      const employeeName = `${leave.team.firstName} ${leave.team.lastName}`;
      // Convert date strings to Date objects if needed
      const startDate = leave.startDate instanceof Date 
        ? leave.startDate 
        : new Date(leave.startDate);
      const endDate = leave.endDate instanceof Date 
        ? leave.endDate 
        : new Date(leave.endDate);
      
      await this.emailService.sendLeaveRejection(
        leave.team.email,
        employeeName,
        leave.type,
        startDate.toISOString(),
        endDate.toISOString(),
        leave.days,
        leave.reason,
        rejectionReason,
      );
      this.logger.log(`Rejection email sent to ${leave.team.email}`);
    } catch (error) {
      this.logger.error(`Failed to send rejection email:`, error);
      // Don't throw error, just log it
    }

    return updatedLeave;
  }

  async getStatistics(teamId?: number) {
    const queryBuilder = this.leaveRepository.createQueryBuilder('leave');

    if (teamId) {
      queryBuilder.where('leave.teamId = :teamId', { teamId });
    }

    const allLeaves = await queryBuilder
      .leftJoinAndSelect('leave.team', 'team')
      .getMany();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    // Filter leaves for current year
    const currentYearLeaves = allLeaves.filter(
      (leave) => new Date(leave.startDate).getFullYear() === currentYear,
    );

    // Statistics by type
    const typeStats: { [key: string]: { used: number; pending: number; rejected: number } } = {};

    // Overall status counts
    const statusCounts = {
      pending: allLeaves.filter((l) => l.status === 'pending').length,
      approved: allLeaves.filter((l) => l.status === 'approved').length,
      rejected: allLeaves.filter((l) => l.status === 'rejected').length,
      total: allLeaves.length,
    };

    // Calculate statistics by type
    currentYearLeaves.forEach((leave) => {
      if (!typeStats[leave.type]) {
        typeStats[leave.type] = { used: 0, pending: 0, rejected: 0 };
      }

      if (leave.status === 'approved') {
        typeStats[leave.type].used += leave.days;
      } else if (leave.status === 'pending') {
        typeStats[leave.type].pending += leave.days;
      } else if (leave.status === 'rejected') {
        typeStats[leave.type].rejected += leave.days;
      }
    });

    // Default totals (can be configured per organization)
    const defaultTotals: { [key: string]: number } = {
      'Casual Leave': 12,
      'Sick Leave': 10,
      'Earned Leave': 15,
      'Unpaid Leave': 0, // Unlimited
      'Personal': 5,
      'Vacation': 10,
    };

    // Format statistics for frontend
    const formattedStats = Object.keys(typeStats).map((type) => {
      const stats = typeStats[type];
      const total = defaultTotals[type] || 0;
      const used = stats.used;
      const remaining = total > 0 ? Math.max(0, total - used) : 0;

      // Calculate trend (leaves this month)
      const thisMonthLeaves = currentYearLeaves.filter(
        (leave) =>
          leave.type === type &&
          new Date(leave.startDate).getMonth() === currentMonth &&
          leave.status === 'approved',
      );
      const thisMonthDays = thisMonthLeaves.reduce((sum, leave) => sum + leave.days, 0);

      return {
        type,
        used,
        pending: stats.pending,
        rejected: stats.rejected,
        total,
        remaining,
        trend: thisMonthDays > 0 ? `+${thisMonthDays} this month` : 'No usage this month',
      };
    });

    // If no leaves exist, return default structure
    if (formattedStats.length === 0) {
      return {
        byType: Object.keys(defaultTotals).map((type) => ({
          type,
          used: 0,
          pending: 0,
          rejected: 0,
          total: defaultTotals[type],
          remaining: defaultTotals[type],
          trend: 'No usage',
        })),
        statusCounts,
      };
    }

    return {
      byType: formattedStats,
      statusCounts,
    };
  }
}
