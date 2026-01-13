import { Module, Global } from '@nestjs/common';
import { CdnUploadService } from './services/cdn-upload.service';
import { FileUploadInterceptor } from './interceptors/file-upload.interceptor';

@Global()
@Module({
  providers: [CdnUploadService, FileUploadInterceptor],
  exports: [CdnUploadService, FileUploadInterceptor],
})
export class CommonModule {}
