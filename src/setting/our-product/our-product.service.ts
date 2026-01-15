import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOurProductDto } from './dto/create-our-product.dto';
import { UpdateOurProductDto } from './dto/update-our-product.dto';
import { OurProduct } from './entities/our-product.entity';

@Injectable()
export class OurProductService {
  constructor(
    @InjectRepository(OurProduct)
    private readonly ourProductRepository: Repository<OurProduct>,
  ) {}

  async create(createOurProductDto: CreateOurProductDto) {
    const product = this.ourProductRepository.create(createOurProductDto);
    return this.ourProductRepository.save(product);
  }

  async findAll() {
    return this.ourProductRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    const product = await this.ourProductRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }

  async update(id: number, updateOurProductDto: UpdateOurProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateOurProductDto);
    return this.ourProductRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.ourProductRepository.remove(product);
  }
}
