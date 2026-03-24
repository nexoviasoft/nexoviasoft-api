import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { OurTeam } from '../setting/home/our-team/entities/our-team.entity';
import { EmailService } from '../common/services/email.service';
import { GoogleCalendarService } from '../common/services/google-calendar.service';
export declare class MeetingService {
    private readonly meetingRepository;
    private readonly ourTeamRepository;
    private readonly emailService;
    private readonly googleCalendarService;
    private readonly logger;
    constructor(meetingRepository: Repository<Meeting>, ourTeamRepository: Repository<OurTeam>, emailService: EmailService, googleCalendarService: GoogleCalendarService);
    private formatDateIdPart;
    private generateUniqueMeetingId;
    create(createMeetingDto: CreateMeetingDto): Promise<Meeting>;
    findAll(): Promise<Meeting[]>;
    findOne(id: number): Promise<Meeting>;
    update(id: number, updateMeetingDto: UpdateMeetingDto): Promise<Meeting>;
    remove(id: number): Promise<Meeting>;
}
