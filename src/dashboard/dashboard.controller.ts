import { Controller, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @HttpCode(HttpStatus.OK)
  async summary(@Req() req: any) {
    const data = await this.dashboardService.getSummary(req?.user);
    return {
      statusCode: HttpStatus.OK,
      message: 'Dashboard summary retrieved successfully',
      data,
    };
  }

  @Get('attendance-trend')
  @HttpCode(HttpStatus.OK)
  async attendanceTrend(@Query('period') period?: string) {
    const data = await this.dashboardService.getAttendanceTrend(period);
    return {
      statusCode: HttpStatus.OK,
      message: 'Attendance trend retrieved successfully',
      data,
    };
  }

  @Get('finance-trend')
  @HttpCode(HttpStatus.OK)
  async financeTrend(@Query('period') period?: string) {
    const data = await this.dashboardService.getFinanceTrend(period);
    return {
      statusCode: HttpStatus.OK,
      message: 'Finance trend retrieved successfully',
      data,
    };
  }

  @Get('activity')
  @HttpCode(HttpStatus.OK)
  async activity(@Query('tab') tab?: string) {
    const data = await this.dashboardService.getActivity(tab);
    return {
      statusCode: HttpStatus.OK,
      message: 'Dashboard activity retrieved successfully',
      data,
    };
  }
}

