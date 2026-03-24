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
exports.Footer = void 0;
const typeorm_1 = require("typeorm");
let Footer = class Footer {
};
exports.Footer = Footer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Footer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Footer.prototype, "logo_url", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Footer.prototype, "company_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Footer.prototype, "company_description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Footer.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Footer.prototype, "twitter_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Footer.prototype, "instagram_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Footer.prototype, "linkedin_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Footer.prototype, "youtube_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Company' }),
    __metadata("design:type", String)
], Footer.prototype, "company_links_title", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], Footer.prototype, "company_links", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Services' }),
    __metadata("design:type", String)
], Footer.prototype, "services_links_title", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], Footer.prototype, "services_links", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Legal' }),
    __metadata("design:type", String)
], Footer.prototype, "legal_links_title", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], Footer.prototype, "legal_links", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Stay Updated' }),
    __metadata("design:type", String)
], Footer.prototype, "newsletter_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Email address' }),
    __metadata("design:type", String)
], Footer.prototype, "newsletter_placeholder", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Footer.prototype, "newsletter_enabled", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Footer.prototype, "updated_at", void 0);
exports.Footer = Footer = __decorate([
    (0, typeorm_1.Entity)('footers')
], Footer);
//# sourceMappingURL=footer.entity.js.map