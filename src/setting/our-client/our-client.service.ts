import { Injectable, NotFoundException, ConflictException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOurClientDto } from './dto/create-our-client.dto';
import { UpdateOurClientDto } from './dto/update-our-client.dto';
import { OurClient } from './entities/our-client.entity';

@Injectable()
export class OurClientService {
  constructor(
    @InjectRepository(OurClient)
    private readonly ourClientRepository: Repository<OurClient>,
  ) {}

  async create(createOurClientDto: CreateOurClientDto) {
    // Check if client with this email already exists
    const existingClient = await this.ourClientRepository.findOne({
      where: { email: createOurClientDto.email },
    });

    if (existingClient) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: `Client with email ${createOurClientDto.email} already exists`,
      });
    }

    const client = this.ourClientRepository.create(createOurClientDto);
    return this.ourClientRepository.save(client);
  }

  async findAll() {
    return this.ourClientRepository.find();
  }

  async findOne(id: number) {
    const client = await this.ourClientRepository.findOne({
      where: { id },
    });
    
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    
    return client;
  }

  async update(id: number, updateOurClientDto: UpdateOurClientDto) {
    const client = await this.findOne(id);
    Object.assign(client, updateOurClientDto);
    return this.ourClientRepository.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    return this.ourClientRepository.remove(client);
  }
}
