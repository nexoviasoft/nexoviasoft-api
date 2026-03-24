import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { EmailService } from '../common/services/email.service';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly emailService: EmailService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const scheduleData: Partial<Schedule> = {
      teamId: createScheduleDto.teamId,
      shifts: createScheduleDto.shifts,
      weekStartDate: createScheduleDto.weekStartDate
        ? new Date(createScheduleDto.weekStartDate)
        : undefined,
      weekEndDate: createScheduleDto.weekEndDate
        ? new Date(createScheduleDto.weekEndDate)
        : undefined,
    };

    const schedule = this.scheduleRepository.create(scheduleData);
    const savedSchedule = await this.scheduleRepository.save(schedule);

    // Load team member relation to get email
    const scheduleWithTeam = await this.scheduleRepository.findOne({
      where: { id: savedSchedule.id },
      relations: ['team'],
    });

    // Send email notification to team member if email exists
    if (scheduleWithTeam?.team?.email) {
      try {
        const teamMemberName = `${scheduleWithTeam.team.firstName} ${scheduleWithTeam.team.lastName}`;
        await this.emailService.sendScheduleAssignment(
          scheduleWithTeam.team.email,
          teamMemberName,
          createScheduleDto.shifts,
          createScheduleDto.weekStartDate,
          createScheduleDto.weekEndDate,
        );
        this.logger.log(
          `Schedule assignment email sent to ${scheduleWithTeam.team.email} for schedule ${savedSchedule.id}`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to send schedule assignment email for schedule ${savedSchedule.id}:`,
          error,
        );
        // Don't throw error - schedule is already created
      }
    } else {
      this.logger.warn(
        `No team member email found for schedule ${savedSchedule.id}, skipping email notification`,
      );
    }

    return savedSchedule;
  }

  private mapSchedule(schedule: Schedule) {
    return {
      id: schedule.id,
      teamId: schedule.teamId,
      team: schedule.team
        ? {
            id: schedule.team.id,
            name: `${schedule.team.firstName} ${schedule.team.lastName}`,
            role: schedule.team.role,
            avatar: schedule.team.profileImage,
            email: schedule.team.email,
            departmentId: schedule.team.departmentId,
          }
        : null,
      shifts: schedule.shifts,
      weekStartDate: schedule.weekStartDate,
      weekEndDate: schedule.weekEndDate,
      createdAt: schedule.createdAt,
      updatedAt: schedule.updatedAt,
    };
  }

  async findAll(
    user: { id?: number; role?: string; departmentId?: number },
    opts?: { weekStartDate?: string; weekEndDate?: string },
  ) {
    const role = (user?.role || '').toLowerCase();
    const isPrivileged = role === 'admin' || role === 'manager';

    // Optional week filter (stored as DATE in DB)
    const weekStart = opts?.weekStartDate ? new Date(opts.weekStartDate) : undefined;
    const weekEnd = opts?.weekEndDate ? new Date(opts.weekEndDate) : undefined;

    const qb = this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.team', 'team')
      .orderBy('schedule.id', 'DESC');

    if (weekStart && !Number.isNaN(weekStart.getTime())) {
      qb.andWhere('schedule.weekStartDate = :weekStart', { weekStart: opts!.weekStartDate });
    }
    if (weekEnd && !Number.isNaN(weekEnd.getTime())) {
      qb.andWhere('schedule.weekEndDate = :weekEnd', { weekEnd: opts!.weekEndDate });
    }

    // Employees: only their own + their department schedules
    if (!isPrivileged) {
      qb.leftJoin('team.department', 'department');

      const userId = user?.id;
      const deptId = user?.departmentId;

      if (userId && deptId) {
        qb.andWhere('(schedule.teamId = :userId OR team.departmentId = :deptId)', {
          userId,
          deptId,
        });
      } else if (userId) {
        qb.andWhere('schedule.teamId = :userId', { userId });
      } else if (deptId) {
        qb.andWhere('team.departmentId = :deptId', { deptId });
      } else {
        // No identifying info → return nothing
        qb.andWhere('1=0');
      }
    }

    const schedules = await qb.getMany();
    return schedules.map((s) => this.mapSchedule(s));
  }

  async findOne(id: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return this.mapSchedule(schedule);
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    // Update schedule data
    if (updateScheduleDto.weekStartDate) {
      schedule.weekStartDate = new Date(updateScheduleDto.weekStartDate);
    }
    if (updateScheduleDto.weekEndDate) {
      schedule.weekEndDate = new Date(updateScheduleDto.weekEndDate);
    }
    if (updateScheduleDto.shifts) {
      schedule.shifts = updateScheduleDto.shifts;
    }
    if (updateScheduleDto.teamId) {
      schedule.teamId = updateScheduleDto.teamId;
    }

    const updatedSchedule = await this.scheduleRepository.save(schedule);

    // Reload with team relation
    const scheduleWithTeam = await this.scheduleRepository.findOne({
      where: { id: updatedSchedule.id },
      relations: ['team'],
    });

    // Send email notification if schedule was updated and team member has email
    if (scheduleWithTeam?.team?.email) {
      try {
        const teamMemberName = `${scheduleWithTeam.team.firstName} ${scheduleWithTeam.team.lastName}`;
        await this.emailService.sendScheduleAssignment(
          scheduleWithTeam.team.email,
          teamMemberName,
          scheduleWithTeam.shifts,
          scheduleWithTeam.weekStartDate?.toISOString(),
          scheduleWithTeam.weekEndDate?.toISOString(),
        );
        this.logger.log(
          `Schedule update email sent to ${scheduleWithTeam.team.email} for schedule ${updatedSchedule.id}`,
        );
      } catch (error) {
        this.logger.error(
          `Failed to send schedule update email for schedule ${updatedSchedule.id}:`,
          error,
        );
        // Don't throw error - schedule is already updated
      }
    }

    return updatedSchedule;
  }

  async remove(id: number) {
    const schedule = await this.scheduleRepository.findOne({
      where: { id },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return this.scheduleRepository.remove(schedule);
  }
}
