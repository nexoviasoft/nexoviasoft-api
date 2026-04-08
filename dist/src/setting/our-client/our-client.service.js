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
exports.OurClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const our_client_entity_1 = require("./entities/our-client.entity");
let OurClientService = class OurClientService {
    constructor(ourClientRepository) {
        this.ourClientRepository = ourClientRepository;
    }
    async create(createOurClientDto) {
        const existingClient = await this.ourClientRepository.findOne({
            where: { email: createOurClientDto.email },
        });
        if (existingClient) {
            throw new common_1.ConflictException({
                statusCode: common_1.HttpStatus.CONFLICT,
                message: `Client with email ${createOurClientDto.email} already exists`,
            });
        }
        const client = this.ourClientRepository.create(createOurClientDto);
        return this.ourClientRepository.save(client);
    }
    async findAll() {
        return this.ourClientRepository.find();
    }
    async findOne(id) {
        const client = await this.ourClientRepository.findOne({
            where: { id },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }
    async update(id, updateOurClientDto) {
        const client = await this.findOne(id);
        Object.assign(client, updateOurClientDto);
        return this.ourClientRepository.save(client);
    }
    async remove(id) {
        const client = await this.findOne(id);
        return this.ourClientRepository.remove(client);
    }
};
exports.OurClientService = OurClientService;
exports.OurClientService = OurClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(our_client_entity_1.OurClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OurClientService);
//# sourceMappingURL=our-client.service.js.map