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
exports.Expense = exports.ExpenseType = exports.ExpenseStatus = void 0;
const typeorm_1 = require("typeorm");
const our_team_entity_1 = require("../../setting/home/our-team/entities/our-team.entity");
var ExpenseStatus;
(function (ExpenseStatus) {
    ExpenseStatus["PENDING"] = "pending";
    ExpenseStatus["APPROVED"] = "approved";
    ExpenseStatus["REJECTED"] = "rejected";
})(ExpenseStatus || (exports.ExpenseStatus = ExpenseStatus = {}));
var ExpenseType;
(function (ExpenseType) {
    ExpenseType["ADVANCE_SALARY"] = "advance salary";
    ExpenseType["COMPANY_ITEMS"] = "company items";
    ExpenseType["LOAN"] = "loan";
    ExpenseType["OTHER"] = "other";
})(ExpenseType || (exports.ExpenseType = ExpenseType = {}));
let Expense = class Expense {
};
exports.Expense = Expense;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Expense.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExpenseType,
        default: ExpenseType.OTHER,
    }),
    __metadata("design:type", String)
], Expense.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Expense.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Expense.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ExpenseStatus,
        default: ExpenseStatus.PENDING,
    }),
    __metadata("design:type", String)
], Expense.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => our_team_entity_1.OurTeam),
    (0, typeorm_1.JoinColumn)({ name: 'requesterId' }),
    __metadata("design:type", our_team_entity_1.OurTeam)
], Expense.prototype, "requester", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Expense.prototype, "requesterId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => our_team_entity_1.OurTeam, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'approverId' }),
    __metadata("design:type", our_team_entity_1.OurTeam)
], Expense.prototype, "approver", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Expense.prototype, "approverId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Expense.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Expense.prototype, "updatedAt", void 0);
exports.Expense = Expense = __decorate([
    (0, typeorm_1.Entity)()
], Expense);
//# sourceMappingURL=expense.entity.js.map