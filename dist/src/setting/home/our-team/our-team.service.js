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
exports.OurTeamService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const our_team_entity_1 = require("./entities/our-team.entity");
const bcrypt = require("bcrypt");
let OurTeamService = class OurTeamService {
    constructor(ourTeamRepository) {
        this.ourTeamRepository = ourTeamRepository;
    }
    async create(createOurTeamDto) {
        const hashedPassword = await bcrypt.hash(createOurTeamDto.password, 10);
        const { password, hireDate, dateOfBirth, ...rest } = createOurTeamDto;
        const employee = this.ourTeamRepository.create({
            ...rest,
            password: hashedPassword,
            hireDate: hireDate ? new Date(hireDate) : null,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        });
        return this.ourTeamRepository.save(employee);
    }
    findAll() {
        return this.ourTeamRepository.find({
            relations: ['department'],
        });
    }
    async findAllPublic() {
        const employees = await this.ourTeamRepository.find({
            where: { status: 'active' },
            select: ['id', 'firstName', 'lastName', 'profileImage', 'position'],
        });
        return employees.map(employee => ({
            id: employee.id,
            name: `${employee.firstName} ${employee.lastName}`,
            image: employee.profileImage,
            designation: employee.position,
        }));
    }
    async findOne(id) {
        const employee = await this.ourTeamRepository.findOne({
            where: { id },
            relations: ['department'],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }
    async findByEmail(email) {
        const employee = await this.ourTeamRepository.findOne({
            where: { email },
            relations: ['department'],
        });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with email ${email} not found`);
        }
        return employee;
    }
    async update(id, updateOurTeamDto) {
        const employee = await this.findOne(id);
        if (updateOurTeamDto.password) {
            updateOurTeamDto.password = await bcrypt.hash(updateOurTeamDto.password, 10);
        }
        if (updateOurTeamDto.hireDate) {
            updateOurTeamDto.hireDate = new Date(updateOurTeamDto.hireDate);
        }
        if (updateOurTeamDto.dateOfBirth) {
            updateOurTeamDto.dateOfBirth = new Date(updateOurTeamDto.dateOfBirth);
        }
        Object.assign(employee, updateOurTeamDto);
        return this.ourTeamRepository.save(employee);
    }
    async remove(id) {
        const employee = await this.findOne(id);
        return this.ourTeamRepository.remove(employee);
    }
    async activate(id) {
        const employee = await this.findOne(id);
        employee.status = 'active';
        return this.ourTeamRepository.save(employee);
    }
    async deactivate(id) {
        const employee = await this.findOne(id);
        employee.status = 'inactive';
        return this.ourTeamRepository.save(employee);
    }
    async suspend(id) {
        const employee = await this.findOne(id);
        employee.status = 'suspended';
        return this.ourTeamRepository.save(employee);
    }
};
exports.OurTeamService = OurTeamService;
exports.OurTeamService = OurTeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(our_team_entity_1.OurTeam)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OurTeamService);
//# sourceMappingURL=our-team.service.js.map