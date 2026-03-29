import { Injectable, Logger } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
import { randomUUID } from 'crypto';

@Injectable()
export class GoogleCalendarService {
  private readonly logger = new Logger(GoogleCalendarService.name);
  private readonly calendar: calendar_v3.Calendar;
  private readonly calendarId = 'primary';
  private lastRequestTime = 0;
  private requestQueue: Promise<any> = Promise.resolve();

  constructor() {




    const clientEmail = 'nexoviasoft@nexoviasoft.iam.gserviceaccount.com"';
    const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCf2dC9ic0SREd9\nrUYIQK36svk5JYj6Y8IW9CjUh1AGPVLvXUQdhMLAuCvyc97quCUF7bTxFB2Pa5Zo\nDczRLtSGB66rPL1sfZwxaH+wRR+b9LEHWVzQg0UvhmgR8M90Gz+IO9DEkqrwYE5v\nlLhBXwaiYZJeQ87xETga9rAGHEtUMNkC1OWcwDI/kgSv9E2QEvZwUOVwRFLbV5cu\ndzgMAjlLzCCIQKVnvt6NWHoFA3+q5DNsRpJ4PATd9rei6srNKwW6vjE6uwA4VCYy\nkuyfXFKUlMQByaNxHbpITHDvHep+T2wdSFH81HeQOHJ0YOLTjwC7UgsU3Vmwibwq\nemghJ3dvAgMBAAECggEAIZNJLn6Sxer0jzfFdXdMc9OC2JeDOYCZpGOdbeKMEvtv\nf5p5869OjtdAV9kxseCC2kdvEZIVkWnaOjnn0upAtnRHom0MJo0NsS0PYPFr7cCM\nLIx/G8bu0cgr9NS9ZlhQ1Gcn9xoNcJbx8qrstsJkbNgMu+MHRQhGXheBqo7n3aNd\n+onN4t4uSJsUJQulH7ek6w009z1TUpZ+uWn0ySVpL577BaAwYlwXyZn7KWRWstVU\nzal1wBAlbbKnOCCFx0Js5qeF9+Vu2JhYxS9fVo5gaYLTchWYg5OqczRnI1WksCVW\nSf2oPNpW0cLGrbbuGBYcOMoIFZcW9h/nB6oghf3RKQKBgQDOP6DcC1yH3KxT7iZm\naedaDrf/8HRE2ealkGo5Qb1Me7klANjiCnu8SKt0VsixcoNXlesY1eeEeqMsPCOv\nAfTFiwkrSDmQDtFDfcOcGF/Nn7I6aEUUVEVIJqs8kaumNMoDfkWSqrGJ1yhFHXI/\nESO2f3jU1ZiyZj32EzwC4wOiFwKBgQDGaQLD9JEpLUPyH7vEeiaA30/m7qfweZBi\nyt3gIXVpPwWlSqmzC1npp5uqhPZk3SFrzGvoS+ICBdYsRYC6qiIKt8ZrLGaNJTiV\nOGtwEcrDWjK4X5PQ8/Jl0onZcFX9P+8NJ2daoqRyGvdqgYlQ+T/Lbjbergxu4YDR\nyYXl9g9kaQKBgCUU7ZACfu1ycI1aiQ7qxYy8jrp2egETCFQGJgMLXcSNjhkoENZ7\nOgn9Ks5s+AJna1PpAW7irpB0GDhQy72gZWjK+agNgUP0Vg2DZBMBkt/+cWXs71ab\nXCV/xlPKgQkN/rAoGMwo4mi9BWF/zNWn+DrMqmXhzWVt2oAOr0B5nmKbAoGAFHsQ\ngwPC3DpE8kBeVIi7YsAqck8eXM9fnSMNxi4N/aA4x/guDkJUtK7Nfcud14mQAp2m\nYeM7YDQUCJvgDuSzAOI5hCSgLV+zOIwLYxUjFglAhRGwo3gbBHG4Mw7KgYrQ9U2k\n+JEjYnfwJDlc4FPqRuiIl3Hl7KgwcPdZcAR3UEkCgYBcHc03BYFDu9waUEXx4XYH\nBoHZoEbOXgrjb+AAzTRu4zDmh4zoWO1hSbUKj7ccv3XpGTDu3zqFiDNMeMOfXzlr\nssFM9/myabFjg1ShMmkHNNlii2aW3g2u4iV5ucgJee4qAw5Fzsm5JpQW8mFatqf/\n3WMPAMjSQet68iFpW3DHLQ==\n-----END PRIVATE KEY-----\n";
    this.calendarId = 'primary';

    const auth = new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    this.calendar = google.calendar({
      version: 'v3',
      auth,
      retryConfig: {
        retry: 0, // Disable default unsafe automatic retries
      },
    });
  }

  async createMeetEvent(data: {
    summary: string;
    description?: string;
    start: string;
    end: string;
    attendees?: { email: string }[];
  }): Promise<{ eventId?: string; meetLink?: string }> {
    return this.scheduleRequest(async () => {
      const requestId = randomUUID();

      const res = await this.executeWithBackoff(() =>
        this.calendar.events.insert({
          calendarId: this.calendarId,
          conferenceDataVersion: 1,
          requestBody: {
            summary: data.summary,
            description: data.description,
            start: { dateTime: data.start },
            end: { dateTime: data.end },
            attendees: data.attendees,
            conferenceData: {
              createRequest: {
                requestId,
                conferenceSolutionKey: { type: 'hangoutsMeet' },
              },
            },
          },
        }),
      );

      return {
        eventId: res.data.id ?? undefined,
        meetLink: res.data.hangoutLink ?? undefined,
      };
    });
  }

  private async scheduleRequest<T>(fn: () => Promise<T>): Promise<T> {
    const queueItem = async () => {
      const now = Date.now();
      const wait = Math.max(0, 1000 - (now - this.lastRequestTime));
      if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));

      try {
        return await fn();
      } finally {
        this.lastRequestTime = Date.now();
      }
    };

    // Chain to the end of the queue, handling previous errors gracefully
    const next = this.requestQueue.then(queueItem, queueItem);
    this.requestQueue = next;
    return next;
  }

  private async executeWithBackoff<T>(
    fn: () => Promise<T>,
    attempt = 1,
  ): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      const status = error.response?.status || error.code;
      // Retry only on 429 and 5xx errors
      const isRetryable =
        (status === 429 || (status >= 500 && status < 600)) && attempt <= 5;

      if (!isRetryable) {
        throw error;
      }

      const delay = Math.pow(2, attempt) * 1000;
      this.logger.warn(`Request failed (${status}). Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));

      return this.executeWithBackoff(fn, attempt + 1);
    }
  }
}
