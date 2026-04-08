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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const attendance_service_1 = require("./attendance.service");
const create_attendance_dto_1 = require("./dto/create-attendance.dto");
const update_attendance_dto_1 = require("./dto/update-attendance.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
let AttendanceController = class AttendanceController {
    constructor(attendanceService) {
        this.attendanceService = attendanceService;
    }
    async create(req, createAttendanceDto) {
        const teamId = req?.user?.id;
        const payload = {
            ...createAttendanceDto,
            teamId,
        };
        const data = await this.attendanceService.create(payload);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Attendance created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.attendanceService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Attendance retrieved successfully',
            data,
        };
    }
    async findMine(req) {
        const teamId = req?.user?.id;
        const data = await this.attendanceService.findMine(teamId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'My attendance retrieved successfully',
            data,
        };
    }
    async getStatusStats() {
        const data = await this.attendanceService.getStatusStats();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Attendance statistics retrieved successfully',
            data,
        };
    }
    async getMyStatusStats(req) {
        const teamId = req?.user?.id;
        const data = await this.attendanceService.getMyStatusStats(teamId);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'My attendance statistics retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.attendanceService.findOne(+id);
        if (!data) {
            return {
                statusCode: common_1.HttpStatus.NOT_FOUND,
                message: `Attendance with ID ${id} not found`,
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Attendance retrieved successfully',
            data,
        };
    }
    async update(id, updateAttendanceDto) {
        const data = await this.attendanceService.update(+id, updateAttendanceDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Attendance updated successfully',
            data,
        };
    }
    async approve(id) {
        const data = await this.attendanceService.update(+id, { approved: true });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Attendance approved successfully',
            data,
        };
    }
    async remove(id) {
        await this.attendanceService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Attendance deleted successfully',
        };
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_attendance_dto_1.CreateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findMine", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getStatusStats", null);
__decorate([
    (0, common_1.Get)('me/stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "getMyStatusStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attendance_dto_1.UpdateAttendanceDto]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "approve", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AttendanceController.prototype, "remove", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, common_1.Controller)('attendance'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map