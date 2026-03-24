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
var LeaveService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const leave_entity_1 = require("./entities/leave.entity");
const our_team_entity_1 = require("../setting/home/our-team/entities/our-team.entity");
const email_service_1 = require("../common/services/email.service");
let LeaveService = LeaveService_1 = class LeaveService {
    constructor(leaveRepository, ourTeamRepository, emailService) {
        this.leaveRepository = leaveRepository;
        this.ourTeamRepository = ourTeamRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(LeaveService_1.name);
    }
    async create(createLeaveDto) {
        const team = await this.ourTeamRepository.findOne({
            where: { id: createLeaveDto.teamId },
        });
        if (!team) {
            throw new common_1.NotFoundException(`Team member with ID ${createLeaveDto.teamId} not found`);
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
    async findByTeamId(teamId) {
        return await this.leaveRepository.find({
            where: { teamId },
            relations: ['team'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const leave = await this.leaveRepository.findOne({
            where: { id },
            relations: ['team'],
        });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave with ID ${id} not found`);
        }
        return leave;
    }
    async findOneByTeamId(id, teamId) {
        const leave = await this.leaveRepository.findOne({
            where: { id, teamId },
            relations: ['team'],
        });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave with ID ${id} not found or you don't have permission to view it`);
        }
        return leave;
    }
    async update(id, updateLeaveDto) {
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
    async updateByTeamId(id, teamId, updateLeaveDto) {
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
    async remove(id) {
        const leave = await this.findOne(id);
        await this.leaveRepository.remove(leave);
        return { message: 'Leave deleted successfully' };
    }
    async removeByTeamId(id, teamId) {
        const leave = await this.findOneByTeamId(id, teamId);
        await this.leaveRepository.remove(leave);
        return { message: 'Leave deleted successfully' };
    }
    async approve(id) {
        const leave = await this.leaveRepository.findOne({
            where: { id },
            relations: ['team'],
        });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave with ID ${id} not found`);
        }
        if (leave.status === 'approved') {
            return leave;
        }
        leave.status = 'approved';
        const updatedLeave = await this.leaveRepository.save(leave);
        try {
            const employeeName = `${leave.team.firstName} ${leave.team.lastName}`;
            const startDate = leave.startDate instanceof Date
                ? leave.startDate
                : new Date(leave.startDate);
            const endDate = leave.endDate instanceof Date
                ? leave.endDate
                : new Date(leave.endDate);
            await this.emailService.sendLeaveApproval(leave.team.email, employeeName, leave.type, startDate.toISOString(), endDate.toISOString(), leave.days, leave.reason);
            this.logger.log(`Approval email sent to ${leave.team.email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send approval email:`, error);
        }
        return updatedLeave;
    }
    async reject(id, rejectionReason) {
        const leave = await this.leaveRepository.findOne({
            where: { id },
            relations: ['team'],
        });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave with ID ${id} not found`);
        }
        if (leave.status === 'rejected') {
            return leave;
        }
        leave.status = 'rejected';
        const updatedLeave = await this.leaveRepository.save(leave);
        try {
            const employeeName = `${leave.team.firstName} ${leave.team.lastName}`;
            const startDate = leave.startDate instanceof Date
                ? leave.startDate
                : new Date(leave.startDate);
            const endDate = leave.endDate instanceof Date
                ? leave.endDate
                : new Date(leave.endDate);
            await this.emailService.sendLeaveRejection(leave.team.email, employeeName, leave.type, startDate.toISOString(), endDate.toISOString(), leave.days, leave.reason, rejectionReason);
            this.logger.log(`Rejection email sent to ${leave.team.email}`);
        }
        catch (error) {
            this.logger.error(`Failed to send rejection email:`, error);
        }
        return updatedLeave;
    }
    async getStatistics(teamId) {
        const queryBuilder = this.leaveRepository.createQueryBuilder('leave');
        if (teamId) {
            queryBuilder.where('leave.teamId = :teamId', { teamId });
        }
        const allLeaves = await queryBuilder
            .leftJoinAndSelect('leave.team', 'team')
            .getMany();
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentYearLeaves = allLeaves.filter((leave) => new Date(leave.startDate).getFullYear() === currentYear);
        const typeStats = {};
        const statusCounts = {
            pending: allLeaves.filter((l) => l.status === 'pending').length,
            approved: allLeaves.filter((l) => l.status === 'approved').length,
            rejected: allLeaves.filter((l) => l.status === 'rejected').length,
            total: allLeaves.length,
        };
        currentYearLeaves.forEach((leave) => {
            if (!typeStats[leave.type]) {
                typeStats[leave.type] = { used: 0, pending: 0, rejected: 0 };
            }
            if (leave.status === 'approved') {
                typeStats[leave.type].used += leave.days;
            }
            else if (leave.status === 'pending') {
                typeStats[leave.type].pending += leave.days;
            }
            else if (leave.status === 'rejected') {
                typeStats[leave.type].rejected += leave.days;
            }
        });
        const defaultTotals = {
            'Casual Leave': 12,
            'Sick Leave': 10,
            'Earned Leave': 15,
            'Unpaid Leave': 0,
            'Personal': 5,
            'Vacation': 10,
        };
        const formattedStats = Object.keys(typeStats).map((type) => {
            const stats = typeStats[type];
            const total = defaultTotals[type] || 0;
            const used = stats.used;
            const remaining = total > 0 ? Math.max(0, total - used) : 0;
            const thisMonthLeaves = currentYearLeaves.filter((leave) => leave.type === type &&
                new Date(leave.startDate).getMonth() === currentMonth &&
                leave.status === 'approved');
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
};
exports.LeaveService = LeaveService;
exports.LeaveService = LeaveService = LeaveService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_entity_1.Leave)),
    __param(1, (0, typeorm_1.InjectRepository)(our_team_entity_1.OurTeam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], LeaveService);
//# sourceMappingURL=leave.service.js.map