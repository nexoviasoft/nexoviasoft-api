import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileUploadInterceptor } from '../interceptors/file-upload.interceptor';
import { memoryStorage } from 'multer';

const multerOptions = {
  storage: memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
};

export function UploadImage(fieldName: string = 'image') {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor([{ name: fieldName, maxCount: 1 }], multerOptions),
      FileUploadInterceptor,
    ),
  );
}

export function UploadImages(fieldName: string = 'images', maxCount: number = 10) {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor([{ name: fieldName, maxCount }], multerOptions),
      FileUploadInterceptor,
    ),
  );
}

export function UploadMultipleFields(fields: Array<{ name: string; maxCount?: number }>) {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(fields, multerOptions),
      FileUploadInterceptor,
    ),
  );
}
