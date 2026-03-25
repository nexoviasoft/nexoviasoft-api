"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var OurTeamService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OurTeamService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const our_team_entity_1 = require("./entities/our-team.entity");
const bcrypt = __importStar(require("bcrypt"));
const email_service_1 = require("../../../common/services/email.service");
let OurTeamService = OurTeamService_1 = class OurTeamService {
    constructor(ourTeamRepository, emailService) {
        this.ourTeamRepository = ourTeamRepository;
        this.emailService = emailService;
        this.logger = new common_1.Logger(OurTeamService_1.name);
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
        const savedEmployee = await this.ourTeamRepository.save(employee);
        if (savedEmployee.email) {
            this.emailService
                .sendTeamMemberCredentials(savedEmployee.email, `${savedEmployee.firstName} ${savedEmployee.lastName}`, createOurTeamDto.password, savedEmployee.position || 'Team Member')
                .catch((err) => {
                this.logger.error(`Team member created but credentials email failed for ${savedEmployee.email}`, err?.stack || String(err));
            });
        }
        return savedEmployee;
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
exports.OurTeamService = OurTeamService = OurTeamService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(our_team_entity_1.OurTeam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], OurTeamService);
//# sourceMappingURL=our-team.service.js.map