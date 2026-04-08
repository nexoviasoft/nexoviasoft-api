import { ConfigService } from '@nestjs/config';
export declare class ImageBBService {
    private readonly configService;
    private readonly logger;
    private readonly apiKey;
    constructor(configService: ConfigService);
    upload(base64Data: string): Promise<string>;
}
