import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';
import { GoogleCalendarService } from '../common/services/google-calendar.service';

@Injectable()
export class MeetingService {
  private readonly logger = new Logger(MeetingService.name);

  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(OurTeam)
    private readonly ourTeamRepository: Repository<OurTeam>,
    private readonly emailService: EmailService,
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  private formatDateIdPart(d: Date) {
    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private async generateUniqueMeetingId(dateTime: Date): Promise<string> {
    const datePart = this.formatDateIdPart(dateTime);
    for (let i = 0; i < 10; i++) {
      const suffix = String(Math.floor(1 + Math.random() * 999)).padStart(3, '0');
      const meetingId = `m-${datePart}-${suffix}`;
      const exists = await this.meetingRepository.exist({ where: { meetingId } });
      if (!exists) return meetingId;
    }
    // fallback: timestamp-based
    return `m-${datePart}-${Date.now().toString().slice(-6)}`;
  }

  async create(createMeetingDto: CreateMeetingDto) {
    const dt = new Date(createMeetingDto.dateTime);
    this.logger.log(`Parsed dateTime: ${dt.toISOString()} from ${createMeetingDto.dateTime}`);
    if (Number.isNaN(dt.getTime())) {
      throw new BadRequestException('Invalid dateTime');
    }

    const meetingId = await this.generateUniqueMeetingId(dt);

    // Resolve attendee emails up-front (used for calendar invite + email).
    const attendees = await this.ourTeamRepository.find({
      where: { id: In(createMeetingDto.attendeeIds) },
      select: ['id', 'firstName', 'lastName', 'email'],
    });

    const emailAttendees = attendees
      .filter((a) => !!a.email)
      .map((a) => ({
        email: a.email,
        name: `${a.firstName} ${a.lastName}`.trim(),
      }));

    // Try Google Meet API first; fall back to Jitsi Meet (real, working video call)
    let meetingLink: string;
    const fallbackLink = `https://meet.jit.si/nexoviasoft-${meetingId}`;
    try {
      const end = new Date(dt.getTime() + createMeetingDto.durationMinutes * 60000);
      const meet = await this.googleCalendarService.createMeetEvent({
        summary: createMeetingDto.topic,
        description: createMeetingDto.description,
        start: dt.toISOString(),
        end: end.toISOString(),
        attendees: emailAttendees.map((a) => ({ email: a.email })),
      });

      meetingLink = meet.meetLink ?? fallbackLink;
    } catch (err: any) {
      this.logger.error(`Google Meet creation failed for ${meetingId}: ${err.message}`, err.response?.data || err);
      meetingLink = fallbackLink;
    }

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

    // Email selected attendees
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
      } else {
        this.logger.warn(`No attendee emails found for meeting ${saved.id}`);
      }
    } catch (err) {
      this.logger.error(`Failed to send meeting invitations for meeting ${saved.id}`, err as any);
    }

    return saved;
  }

  async findAll() {
    return this.meetingRepository.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const meeting = await this.meetingRepository.findOne({ where: { id } });
    if (!meeting) throw new NotFoundException(`Meeting with ID ${id} not found`);
    return meeting;
  }

  async update(id: number, updateMeetingDto: UpdateMeetingDto) {
    const meeting = await this.findOne(id);
    Object.assign(meeting, updateMeetingDto as any);
    return this.meetingRepository.save(meeting);
  }

  async remove(id: number) {
    const meeting = await this.findOne(id);
    return this.meetingRepository.remove(meeting);
  }
}
