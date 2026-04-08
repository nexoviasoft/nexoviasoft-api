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
exports.OurTeamController = void 0;
const common_1 = require("@nestjs/common");
const our_team_service_1 = require("./our-team.service");
const create_our_team_dto_1 = require("./dto/create-our-team.dto");
const update_our_team_dto_1 = require("./dto/update-our-team.dto");
let OurTeamController = class OurTeamController {
    constructor(ourTeamService) {
        this.ourTeamService = ourTeamService;
    }
    async create(createOurTeamDto) {
        const data = await this.ourTeamService.create(createOurTeamDto);
        return {
            statusCode: common_1.HttpStatus.CREATED,
            message: 'Team member created successfully',
            data,
        };
    }
    async findAll() {
        const data = await this.ourTeamService.findAll();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Team members retrieved successfully',
            data,
        };
    }
    async findAllPublic() {
        const data = await this.ourTeamService.findAllPublic();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Public team members retrieved successfully',
            data,
        };
    }
    async findByEmail(email) {
        const data = await this.ourTeamService.findByEmail(email);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Team member retrieved successfully',
            data,
        };
    }
    async findOne(id) {
        const data = await this.ourTeamService.findOne(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Team member retrieved successfully',
            data,
        };
    }
    async update(id, updateOurTeamDto) {
        const data = await this.ourTeamService.update(+id, updateOurTeamDto);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Team member updated successfully',
            data,
        };
    }
    async remove(id) {
        await this.ourTeamService.remove(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Team member deleted successfully',
        };
    }
    async activate(id) {
        const data = await this.ourTeamService.activate(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Employee activated successfully',
            data,
        };
    }
    async deactivate(id) {
        const data = await this.ourTeamService.deactivate(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Employee deactivated successfully',
            data,
        };
    }
    async suspend(id) {
        const data = await this.ourTeamService.suspend(+id);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: 'Employee suspended successfully',
            data,
        };
    }
};
exports.OurTeamController = OurTeamController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_our_team_dto_1.CreateOurTeamDto]),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('public'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "findAllPublic", null);
__decorate([
    (0, common_1.Get)('email/:email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_our_team_dto_1.UpdateOurTeamDto]),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "activate", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)(':id/suspend'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OurTeamController.prototype, "suspend", null);
exports.OurTeamController = OurTeamController = __decorate([
    (0, common_1.Controller)('our-team'),
    __metadata("design:paramtypes", [our_team_service_1.OurTeamService])
], OurTeamController);
//# sourceMappingURL=our-team.controller.js.map