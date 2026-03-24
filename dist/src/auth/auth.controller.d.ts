import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            access_token: string;
            user: {
                id: any;
                email: any;
                firstName: any;
                lastName: any;
                role: any;
                position: any;
                department: any;
                profileImage: any;
            };
        };
    }>;
    getCurrentUser(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: {
            user: any;
        };
    }>;
    logout(req: any): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
