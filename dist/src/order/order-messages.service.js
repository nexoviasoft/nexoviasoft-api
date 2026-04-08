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
exports.OrderMessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_message_entity_1 = require("./entities/order-message.entity");
const order_entity_1 = require("./entities/order.entity");
let OrderMessagesService = class OrderMessagesService {
    constructor(messageRepository, orderRepository) {
        this.messageRepository = messageRepository;
        this.orderRepository = orderRepository;
    }
    async create(createOrderMessageDto) {
        const order = await this.orderRepository.findOne({
            where: { id: createOrderMessageDto.orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${createOrderMessageDto.orderId} not found`);
        }
        const message = this.messageRepository.create(createOrderMessageDto);
        const savedMessage = await this.messageRepository.save(message);
        return this.formatMessageResponse(savedMessage);
    }
    async findAll(orderId) {
        const messages = await this.messageRepository.find({
            where: { orderId },
            order: { createdAt: 'ASC' },
        });
        return messages.map((message) => this.formatMessageResponse(message));
    }
    async findOne(id) {
        const message = await this.messageRepository.findOne({
            where: { id },
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        return this.formatMessageResponse(message);
    }
    async remove(id) {
        const message = await this.messageRepository.findOne({
            where: { id },
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        await this.messageRepository.remove(message);
        return { message: `Message with ID ${id} has been deleted` };
    }
    formatMessageResponse(message) {
        return {
            id: message.id,
            orderId: message.orderId,
            senderType: message.senderType,
            senderId: message.senderId,
            senderName: message.senderName,
            senderAvatar: message.senderAvatar,
            message: message.message,
            attachments: message.attachments || [],
            createdAt: message.createdAt,
        };
    }
};
exports.OrderMessagesService = OrderMessagesService;
exports.OrderMessagesService = OrderMessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_message_entity_1.OrderMessage)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderMessagesService);
//# sourceMappingURL=order-messages.service.js.map