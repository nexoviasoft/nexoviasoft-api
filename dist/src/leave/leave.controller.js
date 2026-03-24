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
exports.LeaveController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const leave_service_1 = require("./leave.service");
const create_leave_dto_1 = require("./dto/create-leave.dto");
const update_leave_dto_1 = require("./dto/update-leave.dto");
let LeaveController = class LeaveController {
    constructor(leaveService) {
        this.leaveService = leaveService;
    }
    create(createLeaveDto, req) {
        const userId = req.user?.id;
        if (req.user?.role?.toLowerCase() !== 'admin' && createLeaveDto.teamId !== userId) {
            createLeaveDto.teamId = userId;
        }
        return this.leaveService.create(createLeaveDto);
    }
    findAll(req) {
        const userId = req.user?.id;
        const userRole = req.user?.role?.toLowerCase();
        if (userRole === 'admin') {
            return this.leaveService.findAll();
        }
        else {
            return this.leaveService.findByTeamId(userId);
        }
    }
    getStatistics(req) {
        const userId = req.user?.id;
        const userRole = req.user?.role?.toLowerCase();
        if (userRole === 'admin') {
            return this.leaveService.getStatistics(undefined);
        }
        else {
            return this.leaveService.getStatistics(userId);
        }
    }
    getStatisticsByTeam(teamId, req) {
        const userId = req.user?.id;
        const userRole = req.user?.role?.toLowerCase();
        if (userRole === 'admin') {
            return this.leaveService.getStatistics(+teamId);
        }
        else {
            return this.leaveService.getStatistics(userId);
        }
    }
    findOne(id, req) {
        const userId = req.user?.id;
        const userRole = req.user?.role?.toLowerCase();
        if (userRole !== 'admin') {
            return this.leaveService.findOneByTeamId(+id, userId);
        }
        return this.leaveService.findOne(+id);
    }
    update(id, updateLeaveDto, req) {
        const userId = req.user?.id;
        const userRole = req.user?.role?.toLowerCase();
        if (userRole !== 'admin') {
            return this.leaveService.updateByTeamId(+id, userId, updateLeaveDto);
        }
        return this.leaveService.update(+id, updateLeaveDto);
    }
    approve(id, req) {
        const userRole = req.user?.role?.toLowerCase();
        if (userRole !== 'admin') {
            throw new common_1.HttpException('Only admins can approve leave requests', common_1.HttpStatus.FORBIDDEN);
        }
        return this.leaveService.approve(+id);
    }
    reject(id, body, req) {
        const userRole = req?.user?.role?.toLowerCase();
        if (userRole !== 'admin') {
            throw new common_1.HttpException('Only admins can reject leave requests', common_1.HttpStatus.FORBIDDEN);
        }
        return this.leaveService.reject(+id, body?.rejectionReason);
    }
    remove(id, req) {
        const userId = req.user?.id;
        const userRole = req.user?.role?.toLowerCase();
        if (userRole !== 'admin') {
            return this.leaveService.removeByTeamId(+id, userId);
        }
        return this.leaveService.remove(+id);
    }
};
exports.LeaveController = LeaveController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_dto_1.CreateLeaveDto, Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('statistics/:teamId'),
    __param(0, (0, common_1.Param)('teamId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "getStatisticsByTeam", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_leave_dto_1.UpdateLeaveDto, Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "reject", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LeaveController.prototype, "remove", null);
exports.LeaveController = LeaveController = __decorate([
    (0, common_1.Controller)('leave'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [leave_service_1.LeaveService])
], LeaveController);
//# sourceMappingURL=leave.controller.js.map