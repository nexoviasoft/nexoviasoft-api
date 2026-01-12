import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePricePackageDto } from './dto/create-price-package.dto';
import { UpdatePricePackageDto } from './dto/update-price-package.dto';
import { PricePackage } from './entities/price-package.entity';

@Injectable()
export class PricePackageService {
  constructor(
    @InjectRepository(PricePackage)
    private pricePackageRepository: Repository<PricePackage>,
  ) { }

  async create(createPricePackageDto: CreatePricePackageDto) {
    return this.pricePackageRepository.save(createPricePackageDto);
  }

  findAll() {
    return this.pricePackageRepository.find();
  }

  findOne(id: number) {
    return this.pricePackageRepository.findOneBy({ id });
  }

  async update(id: number, updatePricePackageDto: UpdatePricePackageDto) {
    await this.pricePackageRepository.update(id, updatePricePackageDto);
    return this.pricePackageRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.pricePackageRepository.delete(id);
  }
}
