import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    // User is attached to request by Passport after successful authentication
    const loginResult = await this.authService.login(req.user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: loginResult,
    };
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@Request() req) {
    if (!req.user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Not authenticated',
      };
    }

    // Get fresh user data
    const user = await this.authService.findById(req.user.id);
    if (!user) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'User not found',
      };
    }

    const { password: _, ...userWithoutPassword } = user;
    return {
      statusCode: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: {
        user: userWithoutPassword,
      },
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async logout(@Request() req) {
    // With JWT, logout is handled client-side by removing the token
    // Server-side, we could implement token blacklisting if needed
    return {
      statusCode: HttpStatus.OK,
      message: 'Logout successful',
    };
  }
}
