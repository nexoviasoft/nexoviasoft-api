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
var IncomeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const income_entity_1 = require("./entities/income.entity");
const order_entity_1 = require("../order/entities/order.entity");
const email_service_1 = require("../common/services/email.service");
const our_client_entity_1 = require("../setting/our-client/entities/our-client.entity");
let IncomeService = IncomeService_1 = class IncomeService {
    constructor(incomeRepository, orderRepository, clientRepository, emailService) {
        this.incomeRepository = incomeRepository;
        this.orderRepository = orderRepository;
        this.clientRepository = clientRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(IncomeService_1.name);
    }
    isMissingOrdersClientIdColumnError(error) {
        const message = error?.message || '';
        return (message.includes('clientId') &&
            message.includes('orders') &&
            (message.includes('does not exist') || message.includes('column')));
    }
    async create(createIncomeDto) {
        const income = this.incomeRepository.create(createIncomeDto);
        const savedIncome = await this.incomeRepository.save(income);
        if (createIncomeDto.orderId) {
            let order = null;
            try {
                order = await this.orderRepository.findOne({
                    where: { id: createIncomeDto.orderId },
                    relations: ['client'],
                });
            }
            catch (error) {
                if (!this.isMissingOrdersClientIdColumnError(error)) {
                    throw error;
                }
                this.logger.warn('orders.clientId column is missing; loading order without client relation as temporary fallback.');
                order = await this.orderRepository.findOne({
                    where: { id: createIncomeDto.orderId },
                });
            }
            if (order) {
                order.paidAmount = Number(order.paidAmount || 0) + Number(createIncomeDto.amount);
                if (order.paidAmount >= order.amount) {
                    order.status = order_entity_1.OrderStatus.COMPLETED;
                    order.progress = 100;
                }
                await this.orderRepository.save(order);
                if (order.client && order.client.email) {
                    try {
                        await this.emailService.sendIncomeInvoice(order.client.email, order.client.name, createIncomeDto.amount, order.orderId, new Date().toLocaleDateString(), order.amount - order.paidAmount, order.paidAmount);
                    }
                    catch (error) {
                        console.error('Failed to send income invoice email:', error);
                    }
                }
            }
        }
        return savedIncome;
    }
    async findAll() {
        try {
            return await this.incomeRepository.find({
                relations: ['order', 'client'],
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            if (!this.isMissingOrdersClientIdColumnError(error)) {
                throw error;
            }
            this.logger.warn('orders.clientId column is missing; returning incomes without order relation as temporary fallback.');
            return this.incomeRepository.find({
                relations: ['client'],
                order: { createdAt: 'DESC' },
            });
        }
    }
    async findOne(id) {
        let income = null;
        try {
            income = await this.incomeRepository.findOne({
                where: { id },
                relations: ['order', 'client'],
            });
        }
        catch (error) {
            if (!this.isMissingOrdersClientIdColumnError(error)) {
                throw error;
            }
            this.logger.warn('orders.clientId column is missing; loading income without order relation as temporary fallback.');
            income = await this.incomeRepository.findOne({
                where: { id },
                relations: ['client'],
            });
        }
        if (!income)
            throw new common_1.NotFoundException(`Income with ID ${id} not found`);
        return income;
    }
    async update(id, updateIncomeDto) {
        const income = await this.findOne(id);
        const oldAmount = Number(income.amount);
        const oldOrderId = income.orderId;
        Object.assign(income, updateIncomeDto);
        const updatedIncome = await this.incomeRepository.save(income);
        if (oldOrderId) {
            const oldOrder = await this.orderRepository.findOne({ where: { id: oldOrderId } });
            if (oldOrder) {
                oldOrder.paidAmount = Number(oldOrder.paidAmount) - oldAmount;
                await this.orderRepository.save(oldOrder);
            }
        }
        if (updatedIncome.orderId) {
            const newOrder = await this.orderRepository.findOne({ where: { id: updatedIncome.orderId } });
            if (newOrder) {
                newOrder.paidAmount = Number(newOrder.paidAmount) + Number(updatedIncome.amount);
                if (newOrder.paidAmount >= newOrder.amount) {
                    newOrder.status = order_entity_1.OrderStatus.COMPLETED;
                    newOrder.progress = 100;
                }
                await this.orderRepository.save(newOrder);
            }
        }
        return updatedIncome;
    }
    async remove(id) {
        const income = await this.findOne(id);
        if (income.orderId) {
            const order = await this.orderRepository.findOne({ where: { id: income.orderId } });
            if (order) {
                order.paidAmount = Number(order.paidAmount) - Number(income.amount);
                if (order.paidAmount < order.amount && order.status === order_entity_1.OrderStatus.COMPLETED) {
                    order.status = order_entity_1.OrderStatus.IN_PROGRESS;
                }
                await this.orderRepository.save(order);
            }
        }
        return this.incomeRepository.remove(income);
    }
};
exports.IncomeService = IncomeService;
exports.IncomeService = IncomeService = IncomeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(income_entity_1.Income)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(our_client_entity_1.OurClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService])
], IncomeService);
//# sourceMappingURL=income.service.js.map