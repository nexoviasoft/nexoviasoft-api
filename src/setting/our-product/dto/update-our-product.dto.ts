import { PartialType } from '@nestjs/mapped-types';
import { CreateOurProductDto } from './create-our-product.dto';

export class UpdateOurProductDto extends PartialType(CreateOurProductDto) {}
