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
var MeetingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const meeting_entity_1 = require("./entities/meeting.entity");
const our_team_entity_1 = require("../setting/home/our-team/entities/our-team.entity");
const email_service_1 = require("../common/services/email.service");
const google_calendar_service_1 = require("../common/services/google-calendar.service");
let MeetingService = MeetingService_1 = class MeetingService {
    constructor(meetingRepository, ourTeamRepository, emailService, googleCalendarService) {
        this.meetingRepository = meetingRepository;
        this.ourTeamRepository = ourTeamRepository;
        this.emailService = emailService;
        this.googleCalendarService = googleCalendarService;
        this.logger = new common_1.Logger(MeetingService_1.name);
    }
    formatDateIdPart(d) {
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }
    async generateUniqueMeetingId(dateTime) {
        const datePart = this.formatDateIdPart(dateTime);
        for (let i = 0; i < 10; i++) {
            const suffix = String(Math.floor(1 + Math.random() * 999)).padStart(3, '0');
            const meetingId = `m-${datePart}-${suffix}`;
            const exists = await this.meetingRepository.exist({ where: { meetingId } });
            if (!exists)
                return meetingId;
        }
        return `m-${datePart}-${Date.now().toString().slice(-6)}`;
    }
    async create(createMeetingDto) {
        const dt = new Date(createMeetingDto.dateTime);
        this.logger.log(`Parsed dateTime: ${dt.toISOString()} from ${createMeetingDto.dateTime}`);
        if (Number.isNaN(dt.getTime())) {
            throw new common_1.BadRequestException('Invalid dateTime');
        }
        const meetingId = await this.generateUniqueMeetingId(dt);
        const attendees = await this.ourTeamRepository.find({
            where: { id: (0, typeorm_2.In)(createMeetingDto.attendeeIds) },
            select: ['id', 'firstName', 'lastName', 'email'],
        });
        const emailAttendees = attendees
            .filter((a) => !!a.email)
            .map((a) => ({
            email: a.email,
            name: `${a.firstName} ${a.lastName}`.trim(),
        }));
        const end = new Date(dt.getTime() + createMeetingDto.durationMinutes * 60000);
        const meet = await this.googleCalendarService.createMeetEvent({
            summary: createMeetingDto.topic,
            description: createMeetingDto.description,
            start: dt.toISOString(),
            end: end.toISOString(),
            attendees: emailAttendees.map((a) => ({ email: a.email })),
        });
        if (!meet.meetLink) {
            this.logger.error(`Google Meet link not returned for ${meetingId}`);
            throw new common_1.BadRequestException('Google Meet link generation failed. Please try again.');
        }
        const meetingLink = meet.meetLink;
        const meeting = this.meetingRepository.create({
            meetingId,
            meetingLink,
            topic: createMeetingDto.topic,
            description: createMeetingDto.description ?? null,
            dateTime: dt,
            durationMinutes: createMeetingDto.durationMinutes,
            attendeeIds: createMeetingDto.attendeeIds,
            organizerName: createMeetingDto.organizerName ?? null,
            status: 'upcoming',
        });
        const saved = await this.meetingRepository.save(meeting);
        try {
            if (emailAttendees.length) {
                await this.emailService.sendMeetingInvitations({
                    to: emailAttendees.map((a) => a.email),
                    attendees: emailAttendees,
                    topic: saved.topic,
                    description: saved.description ?? null,
                    dateTimeIso: saved.dateTime.toISOString(),
                    durationMinutes: saved.durationMinutes,
                    meetingLink: saved.meetingLink,
                    organizerName: saved.organizerName ?? null,
                });
            }
            else {
                this.logger.warn(`No attendee emails found for meeting ${saved.id}`);
            }
        }
        catch (err) {
            this.logger.error(`Failed to send meeting invitations for meeting ${saved.id}`, err);
        }
        return saved;
    }
    async findAll() {
        return this.meetingRepository.find({ order: { id: 'DESC' } });
    }
    async findOne(id) {
        const meeting = await this.meetingRepository.findOne({ where: { id } });
        if (!meeting)
            throw new common_1.NotFoundException(`Meeting with ID ${id} not found`);
        return meeting;
    }
    async update(id, updateMeetingDto) {
        const meeting = await this.findOne(id);
        Object.assign(meeting, updateMeetingDto);
        return this.meetingRepository.save(meeting);
    }
    async remove(id) {
        const meeting = await this.findOne(id);
        return this.meetingRepository.remove(meeting);
    }
};
exports.MeetingService = MeetingService;
exports.MeetingService = MeetingService = MeetingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(meeting_entity_1.Meeting)),
    __param(1, (0, typeorm_1.InjectRepository)(our_team_entity_1.OurTeam)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        email_service_1.EmailService,
        google_calendar_service_1.GoogleCalendarService])
], MeetingService);
//# sourceMappingURL=meeting.service.js.map