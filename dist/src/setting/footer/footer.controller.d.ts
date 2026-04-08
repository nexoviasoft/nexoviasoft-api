import { HttpStatus } from '@nestjs/common';
import { FooterService } from './footer.service';
import { UpdateFooterDto } from './dto/update-footer.dto';
export declare class FooterController {
    private readonly footerService;
    constructor(footerService: FooterService);
    getOne(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/footer.entity").Footer;
    }>;
    update(updateFooterDto: UpdateFooterDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/footer.entity").Footer;
    }>;
}
