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
exports.BroadcastController = void 0;
const common_1 = require("@nestjs/common");
const broadcast_service_1 = require("./broadcast.service");
const create_broadcast_dto_1 = require("./dto/create-broadcast.dto");
const update_broadcast_dto_1 = require("./dto/update-broadcast.dto");
let BroadcastController = class BroadcastController {
    constructor(broadcastService) {
        this.broadcastService = broadcastService;
    }
    stats() {
        return this.broadcastService.getStats();
    }
    dashboard() {
        return this.broadcastService.getDashboard();
    }
    create(createBroadcastDto) {
        return this.broadcastService.create(createBroadcastDto);
    }
    findAll() {
        return this.broadcastService.findAll();
    }
    findOne(id) {
        return this.broadcastService.findOne(+id);
    }
    update(id, updateBroadcastDto) {
        return this.broadcastService.update(+id, updateBroadcastDto);
    }
    remove(id) {
        return this.broadcastService.remove(+id);
    }
};
exports.BroadcastController = BroadcastController;
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BroadcastController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BroadcastController.prototype, "dashboard", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_broadcast_dto_1.CreateBroadcastDto]),
    __metadata("design:returntype", void 0)
], BroadcastController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BroadcastController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BroadcastController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_broadcast_dto_1.UpdateBroadcastDto]),
    __metadata("design:returntype", void 0)
], BroadcastController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BroadcastController.prototype, "remove", null);
exports.BroadcastController = BroadcastController = __decorate([
    (0, common_1.Controller)('broadcast'),
    __metadata("design:paramtypes", [broadcast_service_1.BroadcastService])
], BroadcastController);
//# sourceMappingURL=broadcast.controller.js.map