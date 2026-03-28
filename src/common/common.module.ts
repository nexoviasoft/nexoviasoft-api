import { Module, Global } from '@nestjs/common';
import { EmailService } from './services/email.service';
import { GoogleCalendarService } from './services/google-calendar.service';
import { ImageBBService } from './services/imagebb.service';

@Global()
@Module({
  providers: [EmailService, GoogleCalendarService, ImageBBService],
  exports: [EmailService, GoogleCalendarService, ImageBBService],
})
export class CommonModule {}
