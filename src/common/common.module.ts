import { Module, Global } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { GoogleCalendarService } from './services/google-calendar.service';

@Global()
@Module({
  providers: [EmailService, GoogleCalendarService],
  exports: [EmailService, GoogleCalendarService],
})
export class CommonModule {}
