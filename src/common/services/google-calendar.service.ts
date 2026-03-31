import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';

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

  /**
   * The Google Workspace user that the service account impersonates
   * via Domain-Wide Delegation (DWD).
   *
   * Set GOOGLE_IMPERSONATE_EMAIL in your .env to a real @nexoviasoft.com
   * Google Workspace user email (e.g. admin@nexoviasoft.com).
   *
   * Steps to enable DWD:
   * 1. In Google Admin Console → Security → API Controls → Domain-wide Delegation
   * 2. Add the service account client_id (100760201286417588051) with scope:
   *    https://www.googleapis.com/auth/calendar
   */
  private readonly impersonateEmail =
    process.env.GOOGLE_IMPERSONATE_EMAIL ?? '';

  /**
   * Creates a Google Calendar event with an auto-generated Google Meet link.
   *
   * Uses the Google Calendar API v3 with conferenceData (conferenceDataVersion=1).
   * The service account impersonates `impersonateEmail` via Domain-Wide Delegation (DWD)
   * to create the event on behalf of a real Google Workspace user — this is required
   * because service accounts cannot generate Meet links on their own.
   *
   * Pre-requisites (one-time Google Admin setup):
   * 1. Google Admin Console → Security → API Controls → Domain-wide Delegation
   * 2. Add service account client_id: 100760201286417588051
   *    with OAuth scope: https://www.googleapis.com/auth/calendar
   * 3. Set GOOGLE_IMPERSONATE_EMAIL=admin@nexoviasoft.com in your .env
   */
  async createMeetEvent(data: {
    summary: string;
    description?: string;
    start: string;
    end: string;
    attendees?: { email: string }[];
  }): Promise<{ eventId?: string; meetLink?: string }> {
    if (!this.impersonateEmail) {
      throw new Error(
        'GOOGLE_IMPERSONATE_EMAIL is not set. Set it to a Google Workspace user email ' +
          'that the service account can impersonate via Domain-Wide Delegation.',
      );
    }

    // Build a JWT auth client that impersonates the Workspace user
    const auth = new google.auth.JWT({
      email: this.clientEmail,
      key: this.privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
      subject: this.impersonateEmail, // DWD impersonation
    });

    const calendar = google.calendar({ version: 'v3', auth });

    this.logger.log(
      `Creating Calendar event with Meet for: "${data.summary}" ` +
        `(impersonating ${this.impersonateEmail})`,
    );

    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1, // Tells Google to auto-generate a Meet link
      requestBody: {
        summary: data.summary,
        description: data.description ?? '',
        start: { dateTime: data.start, timeZone: 'UTC' },
        end: { dateTime: data.end, timeZone: 'UTC' },
        attendees: data.attendees ?? [],
        conferenceData: {
          createRequest: {
            requestId: `nexovia-${Date.now()}`, // Must be unique per request
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
      },
    });

    const event = response.data;
    const meetLink = event.conferenceData?.entryPoints?.find(
      (ep) => ep.entryPointType === 'video',
    )?.uri;

    if (!meetLink) {
      this.logger.error(
        `Calendar API did not return a Meet link. Event: ${JSON.stringify(event.conferenceData)}`,
      );
      throw new Error('Google Calendar API did not return a Google Meet link.');
    }

    this.logger.log(`Google Meet link created: ${meetLink} (event: ${event.id})`);

    return { eventId: event.id ?? undefined, meetLink };
  }
}
