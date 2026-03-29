import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { randomUUID } from 'crypto';

@Injectable()
export class GoogleCalendarService {
  private readonly logger = new Logger(GoogleCalendarService.name);

  private readonly clientEmail = 'nexoviasoft@nexoviasoft.iam.gserviceaccount.com';
  private readonly privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCf2dC9ic0SREd9\nrUYIQK36svk5JYj6Y8IW9CjUh1AGPVLvXUQdhMLAuCvyc97quCUF7bTxFB2Pa5Zo\nDczRLtSGB66rPL1sfZwxaH+wRR+b9LEHWVzQg0UvhmgR8M90Gz+IO9DEkqrwYE5v\nlLhBXwaiYZJeQ87xETga9rAGHEtUMNkC1OWcwDI/kgSv9E2QEvZwUOVwRFLbV5cu\ndzgMAjlLzCCIQKVnvt6NWHoFA3+q5DNsRpJ4PATd9rei6srNKwW6vjE6uwA4VCYy\nkuyfXFKUlMQByaNxHbpITHDvHep+T2wdSFH81HeQOHJ0YOLTjwC7UgsU3Vmwibwq\nemghJ3dvAgMBAAECggEAIZNJLn6Sxer0jzfFdXdMc9OC2JeDOYCZpGOdbeKMEvtv\nf5p5869OjtdAV9kxseCC2kdvEZIVkWnaOjnn0upAtnRHom0MJo0NsS0PYPFr7cCM\nLIx/G8bu0cgr9NS9ZlhQ1Gcn9xoNcJbx8qrstsJkbNgMu+MHRQhGXheBqo7n3aNd\n+onN4t4uSJsUJQulH7ek6w009z1TUpZ+uWn0ySVpL577BaAwYlwXyZn7KWRWstVU\nzal1wBAlbbKnOCCFx0Js5qeF9+Vu2JhYxS9fVo5gaYLTchWYg5OqczRnI1WksCVW\nSf2oPNpW0cLGrbbuGBYcOMoIFZcW9h/nB6oghf3RKQKBgQDOP6DcC1yH3KxT7iZm\naedaDrf/8HRE2ealkGo5Qb1Me7klANjiCnu8SKt0VsixcoNXlesY1eeEeqMsPCOv\nAfTFiwkrSDmQDtFDfcOcGF/Nn7I6aEUUVEVIJqs8kaumNMoDfkWSqrGJ1yhFHXI/\nESO2f3jU1ZiyZj32EzwC4wOiFwKBgQDGaQLD9JEpLUPyH7vEeiaA30/m7qfweZBi\nyt3gIXVpPwWlSqmzC1npp5uqhPZk3SFrzGvoS+ICBdYsRYC6qiIKt8ZrLGaNJTiV\nOGtwEcrDWjK4X5PQ8/Jl0onZcFX9P+8NJ2daoqRyGvdqgYlQ+T/Lbjbergxu4YDR\nyYXl9g9kaQKBgCUU7ZACfu1ycI1aiQ7qxYy8jrp2egETCFQGJgMLXcSNjhkoENZ7\nOgn9Ks5s+AJna1PpAW7irpB0GDhQy72gZWjK+agNgUP0Vg2DZBMBkt/+cWXs71ab\nXCV/xlPKgQkN/rAoGMwo4mi9BWF/zNWn+DrMqmXhzWVt2oAOr0B5nmKbAoGAFHsQ\ngwPC3DpE8kBeVIi7YsAqck8eXM9fnSMNxi4N/aA4x/guDkJUtK7Nfcud14mQAp2m\nYeM7YDQUCJvgDuSzAOI5hCSgLV+zOIwLYxUjFglAhRGwo3gbBHG4Mw7KgYrQ9U2k\n+JEjYnfwJDlc4FPqRuiIl3Hl7KgwcPdZcAR3UEkCgYBcHc03BYFDu9waUEXx4XYH\nBoHZoEbOXgrjb+AAzTRu4zDmh4zoWO1hSbUKj7ccv3XpGTDu3zqFiDNMeMOfXzlr\nssFM9/myabFjg1ShMmkHNNlii2aW3g2u4iV5ucgJee4qAw5Fzsm5JpQW8mFatqf/\n3WMPAMjSQet68iFpW3DHLQ==\n-----END PRIVATE KEY-----\n";

  /**
   * Creates a Google Meet Space using the Meet API v2.
   * Returns a real meet.google.com URL.
   * Does NOT require domain-wide delegation.
   */
  async createMeetSpace(): Promise<string> {
    const meetSpaceScope = 'https://www.googleapis.com/auth/meetings.space.created';

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: this.clientEmail,
        private_key: this.privateKey.replace(/\\n/g, '\n'),
      },
      scopes: [meetSpaceScope],
    });

    const accessToken = await auth.getAccessToken();
    this.logger.log('Creating Google Meet space...');

    // Use the Meet REST API directly (googleapis package may not expose meet v2 yet)
    const response = await fetch('https://meet.googleapis.com/v2/spaces', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const err = await response.text();
      this.logger.error(`Meet API error: ${response.status} - ${err}`);
      throw new Error(`Meet API returned ${response.status}: ${err}`);
    }

    const space = await response.json() as { meetingUri?: string; name?: string };
    this.logger.log(`Meet space created: ${space.meetingUri}`);

    if (!space.meetingUri) {
      throw new Error('Meet API did not return a meetingUri');
    }

    return space.meetingUri;
  }

  /**
   * @deprecated Use createMeetSpace() instead.
   * Kept for compatibility — tries to create a Calendar event with Meet,
   * but this requires domain-wide delegation and usually fails for service accounts.
   */
  async createMeetEvent(data: {
    summary: string;
    description?: string;
    start: string;
    end: string;
    attendees?: { email: string }[];
  }): Promise<{ eventId?: string; meetLink?: string }> {
    // Forward to Meet API — real meet.google.com link
    try {
      const meetLink = await this.createMeetSpace();
      return { meetLink };
    } catch (err: any) {
      this.logger.error('createMeetSpace failed:', err.message);
      return {};
    }
  }
}
