import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdnUploadService } from '../services/cdn-upload.service';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  constructor(private cdnUploadService: CdnUploadService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const files = request.files || {};
    const file = request.file;

    // Process single file upload (from FileInterceptor)
    if (file) {
      const folder = this.getFolderFromRoute(request.url);
      const imageUrl = await this.cdnUploadService.uploadImage(file, folder);
      
      // Replace file object with URL in body
      if (request.body) {
        const fieldName = file.fieldname;
        request.body[fieldName] = imageUrl;
      }
    }

    // Process file fields (from FileFieldsInterceptor)
    // FileFieldsInterceptor returns files as an object: { fieldName: [File[]] }
    if (files && Object.keys(files).length > 0) {
      for (const fieldName in files) {
        const fieldFiles = files[fieldName];
        const folder = this.getFolderFromRoute(request.url);
        
        if (Array.isArray(fieldFiles) && fieldFiles.length > 0) {
          if (fieldFiles.length === 1) {
            // Single file for this field
            const imageUrl = await this.cdnUploadService.uploadImage(
              fieldFiles[0],
              folder,
            );
            if (request.body) {
              request.body[fieldName] = imageUrl;
            }
          } else {
            // Multiple files for same field
            const urls = await this.cdnUploadService.uploadMultipleImages(
              fieldFiles,
              folder,
            );
            if (request.body) {
              request.body[fieldName] = urls;
            }
          }
        }
      }
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }

  private getFolderFromRoute(url: string): string {
    // Extract folder name from route (e.g., /case-studies -> case-studies)
    const segments = url.split('/').filter(Boolean);
    return segments[0] || 'uploads';
  }
}
