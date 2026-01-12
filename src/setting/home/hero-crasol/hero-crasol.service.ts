import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHeroCrasolDto } from './dto/create-hero-crasol.dto';
import { UpdateHeroCrasolDto } from './dto/update-hero-crasol.dto';
import { HeroCrasol } from './entities/hero-crasol.entity';

@Injectable()
export class HeroCrasolService {
  constructor(
    @InjectRepository(HeroCrasol)
    private heroCrasolRepository: Repository<HeroCrasol>,
  ) { }

  async create(createHeroCrasolDto: CreateHeroCrasolDto) {
    return this.heroCrasolRepository.save(createHeroCrasolDto);
  }

  findAll() {
    return this.heroCrasolRepository.find();
  }

  findOne(id: number) {
    return this.heroCrasolRepository.findOneBy({ id });
  }

  async update(id: number, updateHeroCrasolDto: UpdateHeroCrasolDto) {
    await this.heroCrasolRepository.update(id, updateHeroCrasolDto);
    return this.heroCrasolRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.heroCrasolRepository.delete(id);
  }
}
