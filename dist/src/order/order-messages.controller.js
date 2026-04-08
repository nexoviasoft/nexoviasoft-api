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
exports.OrderMessagesController = void 0;
const common_1 = require("@nestjs/common");
const order_messages_service_1 = require("./order-messages.service");
const create_order_message_dto_1 = require("./dto/create-order-message.dto");
let OrderMessagesController = class OrderMessagesController {
    constructor(orderMessagesService) {
        this.orderMessagesService = orderMessagesService;
    }
    create(createOrderMessageDto) {
        return this.orderMessagesService.create(createOrderMessageDto);
    }
    findAllByOrder(orderId) {
        return this.orderMessagesService.findAll(+orderId);
    }
    findOne(id) {
        return this.orderMessagesService.findOne(+id);
    }
    remove(id) {
        return this.orderMessagesService.remove(+id);
    }
};
exports.OrderMessagesController = OrderMessagesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_message_dto_1.CreateOrderMessageDto]),
    __metadata("design:returntype", void 0)
], OrderMessagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('order/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderMessagesController.prototype, "findAllByOrder", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderMessagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderMessagesController.prototype, "remove", null);
exports.OrderMessagesController = OrderMessagesController = __decorate([
    (0, common_1.Controller)('order-messages'),
    __metadata("design:paramtypes", [order_messages_service_1.OrderMessagesService])
], OrderMessagesController);
//# sourceMappingURL=order-messages.controller.js.map