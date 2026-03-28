"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ImageBBService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageBBService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ImageBBService = ImageBBService_1 = class ImageBBService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ImageBBService_1.name);
        this.apiKey = this.configService.get('IMAGEBB_API_KEY');
    }
    async upload(base64Data) {
        if (!this.apiKey) {
            this.logger.error('IMAGEBB_API_KEY is not defined in environment variables');
            throw new Error('ImageBB configuration error');
        }
        try {
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
        }
        catch (error) {
            this.logger.error(`Error uploading to ImageBB: ${error.message}`);
            throw error;
        }
    }
};
exports.ImageBBService = ImageBBService;
exports.ImageBBService = ImageBBService = ImageBBService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ImageBBService);
//# sourceMappingURL=imagebb.service.js.map