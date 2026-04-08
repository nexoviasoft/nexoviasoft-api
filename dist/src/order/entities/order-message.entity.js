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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMessage = exports.MessageSenderType = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
var MessageSenderType;
(function (MessageSenderType) {
    MessageSenderType["CLIENT"] = "client";
    MessageSenderType["TEAM"] = "team";
})(MessageSenderType || (exports.MessageSenderType = MessageSenderType = {}));
let OrderMessage = class OrderMessage {
};
exports.OrderMessage = OrderMessage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderMessage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, { nullable: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'orderId' }),
    __metadata("design:type", order_entity_1.Order)
], OrderMessage.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], OrderMessage.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MessageSenderType,
    }),
    __metadata("design:type", String)
], OrderMessage.prototype, "senderType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], OrderMessage.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrderMessage.prototype, "senderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrderMessage.prototype, "senderAvatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], OrderMessage.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], OrderMessage.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderMessage.prototype, "createdAt", void 0);
exports.OrderMessage = OrderMessage = __decorate([
    (0, typeorm_1.Entity)('order_messages')
], OrderMessage);
//# sourceMappingURL=order-message.entity.js.map