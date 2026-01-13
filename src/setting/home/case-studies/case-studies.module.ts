import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/setting/category/entities/category.entity';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
import { CaseStudiesController } from './case-studies.controller';
import { CaseStudiesService } from './case-studies.service';
import { CaseStudy } from './entities/case-study.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseStudy, Category, OurClient])],
  controllers: [CaseStudiesController],
  providers: [CaseStudiesService],
})
export class CaseStudiesModule { }
