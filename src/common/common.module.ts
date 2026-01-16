import { Module, Global } from '@nestjs/common';
import { CdnUploadService } from './services/cdn-upload.service';
import { EmailService } from './services/email.service';
import { FileUploadInterceptor } from './interceptors/file-upload.interceptor';

@Global()
@Module({
  providers: [CdnUploadService, EmailService, FileUploadInterceptor],
  exports: [CdnUploadService, EmailService, FileUploadInterceptor],
})
export class CommonModule {}
