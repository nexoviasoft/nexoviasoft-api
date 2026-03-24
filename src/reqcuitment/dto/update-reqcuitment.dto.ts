import { PartialType } from '@nestjs/mapped-types';
import { CreateReqcuitmentDto } from './create-reqcuitment.dto';

export class UpdateReqcuitmentDto extends PartialType(CreateReqcuitmentDto) {}
