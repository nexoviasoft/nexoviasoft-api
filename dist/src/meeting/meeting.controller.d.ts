import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
export declare class MeetingController {
    private readonly meetingService;
    constructor(meetingService: MeetingService);
    create(createMeetingDto: CreateMeetingDto): Promise<import("./entities/meeting.entity").Meeting>;
    findAll(): Promise<import("./entities/meeting.entity").Meeting[]>;
    findOne(id: string): Promise<import("./entities/meeting.entity").Meeting>;
    update(id: string, updateMeetingDto: UpdateMeetingDto): Promise<import("./entities/meeting.entity").Meeting>;
    remove(id: string): Promise<import("./entities/meeting.entity").Meeting>;
}
