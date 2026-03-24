import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReqcuitmentService } from './reqcuitment.service';
import { ReqcuitmentController } from './reqcuitment.controller';
import { JobPosting } from './entities/job-posting.entity';
import { Candidate } from './entities/candidate.entity';
import { Interview } from './entities/interview.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobPosting, Candidate, Interview]),
  ],
  controllers: [ReqcuitmentController],
  providers: [ReqcuitmentService],
  exports: [ReqcuitmentService],
})
export class ReqcuitmentModule {}
