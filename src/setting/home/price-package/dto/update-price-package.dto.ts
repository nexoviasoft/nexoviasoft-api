import { PartialType } from '@nestjs/mapped-types';
import { CreatePricePackageDto } from './create-price-package.dto';

export class UpdatePricePackageDto extends PartialType(CreatePricePackageDto) { }
