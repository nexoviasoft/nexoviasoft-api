import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Controller('payroll')
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  @Post()
  create(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollService.create(createPayrollDto);
  }

  @Get()
  findAll() {
    return this.payrollService.findAll();
  }

  @Get('stats')
  stats(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    const periodYear = year ? Number(year) : undefined;
    const periodMonth = month ? Number(month) : undefined;
    return this.payrollService.getStats(periodYear, periodMonth);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return this.payrollService.update(+id, updatePayrollDto);
  }

  // Mark payroll as Paid + send email to team member
  @Patch(':id/pay')
  markPaid(@Param('id') id: string) {
    return this.payrollService.markPaid(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollService.remove(+id);
  }
}
