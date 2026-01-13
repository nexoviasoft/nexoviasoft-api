import { PartialType } from '@nestjs/mapped-types';
import { CreateOurClientDto } from './create-our-client.dto';

export class UpdateOurClientDto extends PartialType(CreateOurClientDto) {}
