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
exports.FooterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const footer_entity_1 = require("./entities/footer.entity");
let FooterService = class FooterService {
    constructor(footerRepository) {
        this.footerRepository = footerRepository;
    }
    async getOne() {
        const footer = await this.footerRepository.findOne({
            where: {},
            order: { id: 'ASC' },
        });
        if (!footer) {
            const defaultFooter = this.footerRepository.create({
                company_name: 'NexoviaSoft.',
                company_description: 'Crafting digital experiences with precision and passion. Based remotely, working globally.',
                location: 'New York, NY',
                company_links_title: 'Company',
                company_links: [
                    { label: 'About', url: '#' },
                    { label: 'Work', url: '#' },
                    { label: 'Agency', url: '#' },
                    { label: 'Contact', url: '#' },
                ],
                services_links_title: 'Services',
                services_links: [
                    { label: 'Web Dev', url: '#' },
                    { label: 'Mobile', url: '#' },
                    { label: 'SaaS', url: '#' },
                    { label: 'Design', url: '#' },
                ],
                legal_links_title: 'Legal',
                legal_links: [
                    { label: 'Privacy Policy', url: '#' },
                    { label: 'Terms & Conditions', url: '#' },
                    { label: 'Refund Policy', url: '#' },
                ],
                newsletter_title: 'Stay Updated',
                newsletter_placeholder: 'Email address',
                newsletter_enabled: true,
            });
            return this.footerRepository.save(defaultFooter);
        }
        return footer;
    }
    async update(updateFooterDto) {
        const footer = await this.footerRepository.findOne({
            where: {},
            order: { id: 'ASC' },
        });
        if (!footer) {
            throw new common_1.NotFoundException('Footer not found');
        }
        Object.assign(footer, updateFooterDto);
        return this.footerRepository.save(footer);
    }
};
exports.FooterService = FooterService;
exports.FooterService = FooterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(footer_entity_1.Footer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FooterService);
//# sourceMappingURL=footer.service.js.map