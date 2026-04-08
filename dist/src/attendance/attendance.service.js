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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
let AttendanceService = class AttendanceService {
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async create(createAttendanceDto) {
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
    async findMine(teamId) {
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
    async findOne(id) {
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
    async update(id, updateAttendanceDto) {
        const attendance = await this.attendanceRepository.findOne({
            where: { id },
        });
        if (!attendance) {
            throw new Error(`Attendance with ID ${id} not found`);
        }
        Object.assign(attendance, updateAttendanceDto);
        return this.attendanceRepository.save(attendance);
    }
    async remove(id) {
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
            }
            else if (status === 'late') {
                stats.late++;
            }
            else if (status === 'absent') {
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
    async getMyStatusStats(teamId) {
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
            }
            else if (status === 'late') {
                stats.late++;
            }
            else if (status === 'absent') {
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
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map