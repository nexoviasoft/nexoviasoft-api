import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAlertService } from './email-alert.service';
import { EmailAlertController } from './email-alert.controller';
import { EmailAlert } from './entities/email-alert.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailAlert]),
    CommonModule,
  ],
  controllers: [EmailAlertController],
  providers: [EmailAlertService],
  exports: [EmailAlertService],
})
export class EmailAlertModule {}
