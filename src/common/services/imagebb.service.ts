import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageBBService {
  private readonly logger = new Logger(ImageBBService.name);
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('IMAGEBB_API_KEY');
  }

  /**
   * Uploads base64 image data to ImageBB
   * @param base64Data The base64 encoded image data (with or without data URL prefix)
   * @returns The URL of the uploaded image
   */
  async upload(base64Data: string): Promise<string> {
    if (!this.apiKey) {
      this.logger.error('IMAGEBB_API_KEY is not defined in environment variables');
      throw new Error('ImageBB configuration error');
    }

    try {
      // Remove data URL prefix if present (e.g., "data:image/png;base64,")
      const base64Content = base64Data.includes('base64,')
        ? base64Data.split('base64,')[1]
        : base64Data;

      const formData = new URLSearchParams();
      formData.append('image', base64Content);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${this.apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        this.logger.error(`ImageBB upload failed: ${JSON.stringify(result)}`);
        throw new Error(result.error?.message || 'Failed to upload image to ImageBB');
      }

      return result.data.url;
    } catch (error) {
      this.logger.error(`Error uploading to ImageBB: ${error.message}`);
      throw error;
    }
  }
}
