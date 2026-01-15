import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOurServiceDto } from './dto/create-our-service.dto';
import { UpdateOurServiceDto } from './dto/update-our-service.dto';
import { OurService } from './entities/our-service.entity';

@Injectable()
export class OurServiceService {
  constructor(
    @InjectRepository(OurService)
    private readonly ourServiceRepository: Repository<OurService>,
  ) {}

  async create(createOurServiceDto: CreateOurServiceDto) {
    const service = this.ourServiceRepository.create(createOurServiceDto);
    return this.ourServiceRepository.save(service);
  }

  async findAll() {
    return this.ourServiceRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    const service = await this.ourServiceRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    
    return service;
  }

  async update(id: number, updateOurServiceDto: UpdateOurServiceDto) {
    const service = await this.findOne(id);
    Object.assign(service, updateOurServiceDto);
    return this.ourServiceRepository.save(service);
  }

  async remove(id: number) {
    const service = await this.findOne(id);
    return this.ourServiceRepository.remove(service);
  }
}
