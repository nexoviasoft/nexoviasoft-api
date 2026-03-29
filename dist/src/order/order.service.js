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
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const email_service_1 = require("../common/services/email.service");
let OrderService = OrderService_1 = class OrderService {
    constructor(orderRepository, emailService) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(OrderService_1.name);
    }
    async create(createOrderDto) {
        let orderId = createOrderDto.orderId;
        if (!orderId) {
            orderId = await this.generateUniqueOrderId();
        }
        else {
            const existingOrder = await this.orderRepository.findOne({
                where: { orderId },
            });
            if (existingOrder) {
                throw new common_1.ConflictException({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: `Order with ID ${orderId} already exists`,
                });
            }
        }
        const order = this.orderRepository.create({
            ...createOrderDto,
            orderId,
            date: createOrderDto.date ? new Date(createOrderDto.date) : new Date(),
        });
        const savedOrder = await this.orderRepository.save(order);
        const orderWithClient = await this.orderRepository.findOne({
            where: { id: savedOrder.id },
            relations: ['client'],
        });
        if (orderWithClient?.client?.email) {
            try {
                let orderDate;
                if (orderWithClient.date) {
                    const dateObj = orderWithClient.date instanceof Date
                        ? orderWithClient.date
                        : new Date(orderWithClient.date);
                    if (!isNaN(dateObj.getTime())) {
                        orderDate = dateObj.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                    }
                    else {
                        orderDate = new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                    }
                }
                else {
                    orderDate = new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                }
                const frontendUrl = process.env.FRONTEND_URL || 'https://admin.nexoviasoft.com';
                const orderUrl = `${frontendUrl}/admin/orders/${savedOrder.id}`;
                await this.emailService.sendOrderConfirmation(orderWithClient.client.email, orderWithClient.client.name || 'Valued Client', orderId, orderWithClient.service, Number(orderWithClient.amount), orderDate, orderUrl);
                this.logger.log(`Order confirmation email sent to ${orderWithClient.client.email} for order ${orderId}`);
            }
            catch (error) {
                this.logger.error(`Failed to send order confirmation email for order ${orderId}:`, error);
            }
        }
        else {
            this.logger.warn(`No client email found for order ${orderId}, skipping email notification`);
        }
        return savedOrder;
    }
    async generateUniqueOrderId() {
        let orderId;
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 10;
        while (!isUnique && attempts < maxAttempts) {
            const randomNum = Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, '0');
            orderId = `ORD-${randomNum}`;
            const existingOrder = await this.orderRepository.findOne({
                where: { orderId },
            });
            if (!existingOrder) {
                isUnique = true;
            }
            attempts++;
        }
        if (!isUnique) {
            const timestamp = Date.now().toString().slice(-6);
            orderId = `ORD-${timestamp}`;
        }
        return orderId;
    }
    async findAll() {
        return this.orderRepository.find({
            relations: ['client', 'category'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['client', 'category'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async findByOrderId(orderId) {
        const order = await this.orderRepository.findOne({
            where: { orderId },
            relations: ['client', 'category'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with orderId ${orderId} not found`);
        }
        return order;
    }
    async getStats() {
        const [total, inProgress, completed, allOrders] = await Promise.all([
            this.orderRepository.count(),
            this.orderRepository.count({ where: { status: order_entity_1.OrderStatus.IN_PROGRESS } }),
            this.orderRepository.count({ where: { status: order_entity_1.OrderStatus.COMPLETED } }),
            this.orderRepository.find({ select: ['amount'] }),
        ]);
        const totalRevenue = allOrders.reduce((sum, order) => sum + Number(order.amount || 0), 0);
        return {
            total,
            inProgress,
            completed,
            totalRevenue,
        };
    }
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        if (updateOrderDto.orderId && updateOrderDto.orderId !== order.orderId) {
            const existingOrder = await this.orderRepository.findOne({
                where: { orderId: updateOrderDto.orderId },
            });
            if (existingOrder) {
                throw new common_1.ConflictException({
                    statusCode: common_1.HttpStatus.CONFLICT,
                    message: `Order with ID ${updateOrderDto.orderId} already exists`,
                });
            }
        }
        const updateData = { ...updateOrderDto };
        if (updateOrderDto.date) {
            updateData.date = new Date(updateOrderDto.date);
        }
        Object.assign(order, updateData);
        return this.orderRepository.save(order);
    }
    async remove(id) {
        const order = await this.findOne(id);
        return this.orderRepository.remove(order);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
    email_service_1.EmailService])
], OrderService);
//# sourceMappingURL=order.service.js.map