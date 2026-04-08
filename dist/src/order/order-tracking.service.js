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
exports.OrderTrackingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_tracking_entity_1 = require("./entities/order-tracking.entity");
const order_entity_1 = require("./entities/order.entity");
let OrderTrackingService = class OrderTrackingService {
    constructor(trackingRepository, orderRepository) {
        this.trackingRepository = trackingRepository;
        this.orderRepository = orderRepository;
    }
    async create(createOrderTrackingDto) {
        const order = await this.orderRepository.findOne({
            where: { id: createOrderTrackingDto.orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${createOrderTrackingDto.orderId} not found`);
        }
        if (createOrderTrackingDto.status !== undefined) {
            order.status = createOrderTrackingDto.status;
        }
        if (createOrderTrackingDto.progress !== undefined) {
            order.progress = createOrderTrackingDto.progress;
        }
        await this.orderRepository.save(order);
        const tracking = this.trackingRepository.create(createOrderTrackingDto);
        const savedTracking = await this.trackingRepository.save(tracking);
        return this.formatTrackingResponse(savedTracking);
    }
    async findAll(orderId) {
        const trackingRecords = await this.trackingRepository.find({
            where: { orderId },
            order: { createdAt: 'DESC' },
        });
        return trackingRecords.map((tracking) => this.formatTrackingResponse(tracking));
    }
    async findOne(id) {
        const tracking = await this.trackingRepository.findOne({
            where: { id },
        });
        if (!tracking) {
            throw new common_1.NotFoundException(`Tracking record with ID ${id} not found`);
        }
        return this.formatTrackingResponse(tracking);
    }
    async remove(id) {
        const tracking = await this.trackingRepository.findOne({
            where: { id },
        });
        if (!tracking) {
            throw new common_1.NotFoundException(`Tracking record with ID ${id} not found`);
        }
        await this.trackingRepository.remove(tracking);
        return { message: `Tracking record with ID ${id} has been deleted` };
    }
    formatTrackingResponse(tracking) {
        return {
            id: tracking.id,
            orderId: tracking.orderId,
            status: tracking.status,
            progress: tracking.progress,
            note: tracking.note,
            createdBy: tracking.createdBy,
            createdByName: tracking.createdByName,
            createdAt: tracking.createdAt,
        };
    }
};
exports.OrderTrackingService = OrderTrackingService;
exports.OrderTrackingService = OrderTrackingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_tracking_entity_1.OrderTracking)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OrderTrackingService);
//# sourceMappingURL=order-tracking.service.js.map