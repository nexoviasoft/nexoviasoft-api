import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CdnUploadService {
  private readonly uploadDir: string;
  private readonly baseUrl: string;
  private readonly uploadPath: string;

  constructor(private configService: ConfigService) {
    // Get upload directory from config or use default
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR') || 'uploads';
    this.uploadPath = path.join(process.cwd(), this.uploadDir);
    
    // Get base URL from config or use default
    this.baseUrl = this.configService.get<string>('BASE_URL') || 'http://localhost:5001';
    
    // Ensure upload directory exists
    this.ensureUploadDirectoryExists();
  }

  private ensureUploadDirectoryExists(): void {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  private generateFileName(originalName: string): string {
    // Get file extension
    const ext = path.extname(originalName);
    // Get filename without extension
    const nameWithoutExt = path.basename(originalName, ext);
    // Sanitize filename (remove special characters, keep only alphanumeric, dash, underscore)
    const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '_');
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${sanitizedName}_${timestamp}_${random}${ext}`;
  }

  async uploadImage(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<string> {
    try {
      // Generate unique filename
      const fileName = this.generateFileName(file.originalname);
      
      // Create folder path if provided
      let filePath: string;
      let urlPath: string;
      
      if (folder) {
        const folderPath = path.join(this.uploadPath, folder);
        // Ensure folder exists
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        filePath = path.join(folderPath, fileName);
        urlPath = `${this.baseUrl}/upload/${folder}/${fileName}`;
      } else {
        filePath = path.join(this.uploadPath, fileName);
        urlPath = `${this.baseUrl}/upload/${fileName}`;
      }

      // Write file to disk
      fs.writeFileSync(filePath, file.buffer);

      return urlPath;
    } catch (error) {
      throw new HttpException(
        `Failed to upload image: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async uploadMultipleImages(
    files: Express.Multer.File[],
    folder?: string,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, folder));
    return Promise.all(uploadPromises);
  }

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract filename from URL
      const urlParts = imageUrl.split('/upload/');
      if (urlParts.length < 2) {
        throw new HttpException(
          'Invalid image URL format',
          HttpStatus.BAD_REQUEST,
        );
      }

      const filePath = path.join(this.uploadPath, urlParts[1]);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        throw new HttpException(
          'Image file not found',
          HttpStatus.NOT_FOUND,
        );
      }

      // Delete file
      fs.unlinkSync(filePath);

      // Optionally remove empty folder if it exists
      const folderPath = path.dirname(filePath);
      if (folderPath !== this.uploadPath) {
        try {
          const files = fs.readdirSync(folderPath);
          if (files.length === 0) {
            fs.rmdirSync(folderPath);
          }
        } catch {
          // Ignore errors when trying to remove folder
        }
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to delete image: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
