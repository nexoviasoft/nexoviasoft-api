"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ScheduleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_entity_1 = require("./entities/schedule.entity");
const email_service_1 = require("../common/services/email.service");
let ScheduleService = ScheduleService_1 = class ScheduleService {
    constructor(scheduleRepository, emailService) {
        this.scheduleRepository = scheduleRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(ScheduleService_1.name);
    }
    async create(createScheduleDto) {
        const scheduleData = {
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
        const scheduleWithTeam = await this.scheduleRepository.findOne({
            where: { id: savedSchedule.id },
            relations: ['team'],
        });
        if (scheduleWithTeam?.team?.email) {
            try {
                const teamMemberName = `${scheduleWithTeam.team.firstName} ${scheduleWithTeam.team.lastName}`;
                await this.emailService.sendScheduleAssignment(scheduleWithTeam.team.email, teamMemberName, createScheduleDto.shifts, createScheduleDto.weekStartDate, createScheduleDto.weekEndDate);
                this.logger.log(`Schedule assignment email sent to ${scheduleWithTeam.team.email} for schedule ${savedSchedule.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to send schedule assignment email for schedule ${savedSchedule.id}:`, error);
            }
        }
        else {
            this.logger.warn(`No team member email found for schedule ${savedSchedule.id}, skipping email notification`);
        }
        return savedSchedule;
    }
    mapSchedule(schedule) {
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
    async findAll(user, opts) {
        const role = (user?.role || '').toLowerCase();
        const isPrivileged = role === 'admin' || role === 'manager';
        const weekStart = opts?.weekStartDate ? new Date(opts.weekStartDate) : undefined;
        const weekEnd = opts?.weekEndDate ? new Date(opts.weekEndDate) : undefined;
        const qb = this.scheduleRepository
            .createQueryBuilder('schedule')
            .leftJoinAndSelect('schedule.team', 'team')
            .orderBy('schedule.id', 'DESC');
        if (weekStart && !Number.isNaN(weekStart.getTime())) {
            qb.andWhere('schedule.weekStartDate = :weekStart', { weekStart: opts.weekStartDate });
        }
        if (weekEnd && !Number.isNaN(weekEnd.getTime())) {
            qb.andWhere('schedule.weekEndDate = :weekEnd', { weekEnd: opts.weekEndDate });
        }
        if (!isPrivileged) {
            qb.leftJoin('team.department', 'department');
            const userId = user?.id;
            const deptId = user?.departmentId;
            if (userId && deptId) {
                qb.andWhere('(schedule.teamId = :userId OR team.departmentId = :deptId)', {
                    userId,
                    deptId,
                });
            }
            else if (userId) {
                qb.andWhere('schedule.teamId = :userId', { userId });
            }
            else if (deptId) {
                qb.andWhere('team.departmentId = :deptId', { deptId });
            }
            else {
                qb.andWhere('1=0');
            }
        }
        const schedules = await qb.getMany();
        return schedules.map((s) => this.mapSchedule(s));
    }
    async findOne(id) {
        const schedule = await this.scheduleRepository.findOne({
            where: { id },
            relations: ['team'],
        });
        if (!schedule) {
            throw new common_1.NotFoundException(`Schedule with ID ${id} not found`);
        }
        return this.mapSchedule(schedule);
    }
    async update(id, updateScheduleDto) {
        const schedule = await this.scheduleRepository.findOne({
            where: { id },
            relations: ['team'],
        });
        if (!schedule) {
            throw new common_1.NotFoundException(`Schedule with ID ${id} not found`);
        }
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
        const scheduleWithTeam = await this.scheduleRepository.findOne({
            where: { id: updatedSchedule.id },
            relations: ['team'],
        });
        if (scheduleWithTeam?.team?.email) {
            try {
                const teamMemberName = `${scheduleWithTeam.team.firstName} ${scheduleWithTeam.team.lastName}`;
                await this.emailService.sendScheduleAssignment(scheduleWithTeam.team.email, teamMemberName, scheduleWithTeam.shifts, scheduleWithTeam.weekStartDate?.toISOString(), scheduleWithTeam.weekEndDate?.toISOString());
                this.logger.log(`Schedule update email sent to ${scheduleWithTeam.team.email} for schedule ${updatedSchedule.id}`);
            }
            catch (error) {
                this.logger.error(`Failed to send schedule update email for schedule ${updatedSchedule.id}:`, error);
            }
        }
        return updatedSchedule;
    }
    async remove(id) {
        const schedule = await this.scheduleRepository.findOne({
            where: { id },
        });
        if (!schedule) {
            throw new common_1.NotFoundException(`Schedule with ID ${id} not found`);
        }
        return this.scheduleRepository.remove(schedule);
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = ScheduleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(schedule_entity_1.Schedule)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], ScheduleService);
//# sourceMappingURL=schedule.service.js.map