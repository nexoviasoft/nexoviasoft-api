import { Injectable, Logger } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
 
@Injectable()
export class GoogleCalendarService {
  private readonly logger = new Logger(GoogleCalendarService.name);
  private readonly calendar: calendar_v3.Calendar;
  private readonly calendarId: string;
 
  constructor() {
    // Client secret: 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
    // client id: 10550296395-epdlp4di1h38ko01okq4gc3c3c9svgeq.apps.googleusercontent.com
    // project id: squadlog-452317
    const clientEmail = 'mdsamsuddohasojib@gmail.com';
    const privateKey = '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';
    this.calendarId = 'primary';
 
    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
 
    this.calendar = google.calendar({ version: 'v3', auth });
  }
 
  async createMeetEvent({
    summary,
    description,
    start,
    end,
    attendees,
  }: {
    summary: string;
    description?: string;
    start: string;
    end: string;
    attendees?: { email: string }[];
  }): Promise<{ eventId?: string; meetLink?: string }> {
    const res = await this.calendar.events.insert({
      calendarId: this.calendarId,
      conferenceDataVersion: 1,
      requestBody: {
        summary,
        description,
        start: { dateTime: start },
        end: { dateTime: end },
        attendees,
        conferenceData: {
          createRequest: {
            requestId: `meet-${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });
 
    return {
      eventId: res.data.id ?? undefined,
      meetLink: res.data.hangoutLink ?? undefined,
    };
  }
}
