import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    const attendance = this.attendanceRepository.create(createAttendanceDto);
    return this.attendanceRepository.save(attendance);
  }

  async findAll() {
    const attendances = await this.attendanceRepository.find({
      relations: ['team'],
      order: { id: 'ASC' },
    });

    return attendances.map((attendance) => ({
      id: attendance.id,
      checkIn: attendance.checkIn || '-',
      checkOut: attendance.checkOut || '-',
      workHours: attendance.workHours || '-',
      status: attendance.status,
      approved: attendance.approved,
      teamId: attendance.teamId,
      team: attendance.team
        ? {
            id: attendance.team.id,
            name: `${attendance.team.firstName} ${attendance.team.lastName}`,
            role: attendance.team.role,
            avatar: attendance.team.profileImage,
          }
        : null,
    }));
  }

  async findMine(teamId: number) {
    const attendances = await this.attendanceRepository.find({
      where: { teamId },
      relations: ['team'],
      order: { id: 'ASC' },
    });

    return attendances.map((attendance) => ({
      id: attendance.id,
      checkIn: attendance.checkIn || '-',
      checkOut: attendance.checkOut || '-',
      workHours: attendance.workHours || '-',
      status: attendance.status,
      approved: attendance.approved,
      teamId: attendance.teamId,
      team: attendance.team
        ? {
            id: attendance.team.id,
            name: `${attendance.team.firstName} ${attendance.team.lastName}`,
            role: attendance.team.role,
            avatar: attendance.team.profileImage,
          }
        : null,
    }));
  }

  async findOne(id: number) {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
      relations: ['team'],
    });

    if (!attendance) {
      return null;
    }

    return {
      id: attendance.id,
      checkIn: attendance.checkIn || '-',
      checkOut: attendance.checkOut || '-',
      workHours: attendance.workHours || '-',
      status: attendance.status,
      approved: attendance.approved,
      teamId: attendance.teamId,
      team: attendance.team
        ? {
            id: attendance.team.id,
            name: `${attendance.team.firstName} ${attendance.team.lastName}`,
            role: attendance.team.role,
            avatar: attendance.team.profileImage,
          }
        : null,
    };
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
    });

    if (!attendance) {
      throw new Error(`Attendance with ID ${id} not found`);
    }

    Object.assign(attendance, updateAttendanceDto);
    return this.attendanceRepository.save(attendance);
  }

  async remove(id: number) {
    const attendance = await this.attendanceRepository.findOne({
      where: { id },
    });

    if (!attendance) {
      throw new Error(`Attendance with ID ${id} not found`);
    }

    return this.attendanceRepository.remove(attendance);
  }

  async getStatusStats() {
    const allAttendances = await this.attendanceRepository.find();

    const stats = {
      total: allAttendances.length,
      onTime: 0,
      late: 0,
      absent: 0,
    };

    allAttendances.forEach((attendance) => {
      const status = attendance.status?.toLowerCase();
      if (status === 'on time') {
        stats.onTime++;
      } else if (status === 'late') {
        stats.late++;
      } else if (status === 'absent') {
        stats.absent++;
      }
    });

    return {
      total: stats.total,
      onTime: stats.onTime,
      late: stats.late,
      absent: stats.absent,
      onTimePercentage: stats.total > 0 ? ((stats.onTime / stats.total) * 100).toFixed(2) : '0.00',
      latePercentage: stats.total > 0 ? ((stats.late / stats.total) * 100).toFixed(2) : '0.00',
      absentPercentage: stats.total > 0 ? ((stats.absent / stats.total) * 100).toFixed(2) : '0.00',
    };
  }

  async getMyStatusStats(teamId: number) {
    const myAttendances = await this.attendanceRepository.find({ where: { teamId } });

    const stats = {
      total: myAttendances.length,
      onTime: 0,
      late: 0,
      absent: 0,
    };

    myAttendances.forEach((attendance) => {
      const status = attendance.status?.toLowerCase();
      if (status === 'on time') {
        stats.onTime++;
      } else if (status === 'late') {
        stats.late++;
      } else if (status === 'absent') {
        stats.absent++;
      }
    });

    return {
      total: stats.total,
      onTime: stats.onTime,
      late: stats.late,
      absent: stats.absent,
      onTimePercentage: stats.total > 0 ? ((stats.onTime / stats.total) * 100).toFixed(2) : '0.00',
      latePercentage: stats.total > 0 ? ((stats.late / stats.total) * 100).toFixed(2) : '0.00',
      absentPercentage: stats.total > 0 ? ((stats.absent / stats.total) * 100).toFixed(2) : '0.00',
    };
  }
}
