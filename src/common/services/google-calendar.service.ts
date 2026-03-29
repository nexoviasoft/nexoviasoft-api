import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { randomUUID } from 'crypto';

@Injectable()
export class GoogleCalendarService {
  private readonly logger = new Logger(GoogleCalendarService.name);

  private readonly clientEmail = 'nexoviasoft@nexoviasoft.iam.gserviceaccount.com';
  private readonly privateKey = [
    '-----BEGIN PRIVATE KEY-----',
    'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCf2dC9ic0SREd9',
    'rUYIQK36svk5JYj6Y8IW9CjUh1AGPVLvXUQdhMLAuCvyc97quCUF7bTxFB2Pa5Zo',
    'DczRLtSGB66rPL1sfZwxaH+wRR+b9LEHWVzQg0UvhmgR8M90Gz+IO9DEkqrwYE5v',
    'lLhBXwaiYZJeQ87xETga9rAGHEtUMNkC1OWcwDI/kgSv9E2QEvZwUOVwRFLbV5cu',
    'dzgMAjlLzCCIQKVnvt6NWHoFA3+q5DNsRpJ4PATd9rei6srNKwW6vjE6uwA4VCYy',
    'kuyfXFKUlMQByaNxHbpITHDvHep+T2wdSFH81HeQOHJ0YOLTjwC7UgsU3Vmwibwq',
    'emghJ3dvAgMBAAECggEAIZNJLn6Sxer0jzfFdXdMc9OC2JeDOYCZpGOdbeKMEvtv',
    'f5p5869OjtdAV9kxseCC2kdvEZIVkWnaOjnn0upAtnRHom0MJo0NsS0PYPFr7cCM',
    'LIx/G8bu0cgr9NS9ZlhQ1Gcn9xoNcJbx8qrstsJkbNgMu+MHRQhGXheBqo7n3aNd',
    '+onN4t4uSJsUJQulH7ek6w009z1TUpZ+uWn0ySVpL577BaAwYlwXyZn7KWRWstVU',
    'zal1wBAlbbKnOCCFx0Js5qeF9+Vu2JhYxS9fVo5gaYLTchWYg5OqczRnI1WksCVW',
    'Sf2oPNpW0cLGrbbuGBYcOMoIFZcW9h/nB6oghf3RKQKBgQDOP6DcC1yH3KxT7iZm',
    'aedaDrf/8HRE2ealkGo5Qb1Me7klANjiCnu8SKt0VsixcoNXlesY1eeEeqMsPCOv',
    'AfTFiwkrSDmQDtFDfcOcGF/Nn7I6aEUUVEVIJqs8kaumNMoDfkWSqrGJ1yhFHXI/',
    'ESO2f3jU1ZiyZj32EzwC4wOiFwKBgQDGaQLD9JEpLUPyH7vEeiaA30/m7qfweZBi',
    'yt3gIXVpPwWlSqmzC1npp5uqhPZk3SFrzGvoS+ICBdYsRYC6qiIKt8ZrLGaNJTiV',
    'OGtwEcrDWjK4X5PQ8/Jl0onZcFX9P+8NJ2daoqRyGvdqgYlQ+T/Lbjbergxu4YDR',
    'yYXl9g9kaQKBgCUU7ZACfu1ycI1aiQ7qxYy8jrp2egETCFQGJgMLXcSNjhkoENZ7',
    'Ogn9Ks5s+AJna1PpAW7irpB0GDhQy72gZWjK+agNgUP0Vg2DZBMBkt/+cWXs71ab',
    'XCV/xlPKgQkN/rAoGMwo4mi9BWF/zNWn+DrMqmXhzWVt2oAOr0B5nmKbAoGAFHsQ',
    'gwPC3DpE8kBeVIi7YsAqck8eXM9fnSMNxi4N/aA4x/guDkJUtK7Nfcud14mQAp2m',
    'YeM7YDQUCJvgDuSzAOI5hCSgLV+zOIwLYxUjFglAhRGwo3gbBHG4Mw7KgYrQ9U2k',
    '+JEjYnfwJDlc4FPqRuiIl3Hl7KgwcPdZcAR3UEkCgYBcHc03BYFDu9waUEXx4XYH',
    'BoHZoEbOXgrjb+AAzTRu4zDmh4zoWO1hSbUKj7ccv3XpGTDu3zqFiDNMeMOfXzlr',
    'ssFM9/myabFjg1ShMmkHNNlii2aW3g2u4iV5ucgJee4qAw5Fzsm5JpQW8mFatqf/',
    '3WMPAMjSQet68iFpW3DHLQ==',
    '-----END PRIVATE KEY-----',
  ].join('\n');

  private getAuth(scopes: string[]) {
    return new google.auth.GoogleAuth({
      credentials: {
        client_email: this.clientEmail,
        private_key: this.privateKey,
      },
      scopes,
    });
  }

  /**
   * Creates a Google Calendar event with a Google Meet conference attached.
   * The Meet link is extracted from the Calendar API response's conferenceData.
   * This approach works with Service Accounts (unlike the Meet REST API v2).
   *
   * Returns the real Google Meet link (e.g. https://meet.google.com/xxx-yyyy-zzz).
   */
  async createMeetEvent(data: {
    summary: string;
    description?: string;
    start: string;
    end: string;
    attendees?: { email: string }[];
  }): Promise<{ eventId?: string; meetLink?: string }> {
    const auth = this.getAuth(['https://www.googleapis.com/auth/calendar']);
    const calendar = google.calendar({ version: 'v3', auth });

    const requestId = randomUUID();

    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      sendUpdates: 'all', // sends calendar invites to all attendees
      requestBody: {
        summary: data.summary,
        description: data.description ?? '',
        start: { dateTime: data.start, timeZone: 'UTC' },
        end: { dateTime: data.end, timeZone: 'UTC' },
        attendees: data.attendees ?? [],
        conferenceData: {
          createRequest: {
            requestId,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 15 },
          ],
        },
      },
    });

    const event = response.data;
    this.logger.log(`Calendar event created: ${event.id}`);

    // Extract the Google Meet link from the conferenceData returned by the API
    const meetLink =
      event.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === 'video')?.uri ??
      event.hangoutLink ??
      undefined;

    if (meetLink) {
      this.logger.log(`Google Meet link: ${meetLink}`);
    } else {
      this.logger.warn('Calendar event created but no Meet link was returned');
    }

    return { eventId: event.id ?? undefined, meetLink };
  }
}
