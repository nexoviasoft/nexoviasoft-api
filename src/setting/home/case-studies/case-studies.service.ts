import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/setting/category/entities/category.entity';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
import { In, Repository } from 'typeorm';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import { CaseStudy } from './entities/case-study.entity';

@Injectable()
export class CaseStudiesService {
  constructor(
    @InjectRepository(CaseStudy)
    private caseStudyRepository: Repository<CaseStudy>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(OurClient)
    private ourClientRepository: Repository<OurClient>,
  ) { }

  async create(createCaseStudyDto: CreateCaseStudyDto) {
    const { categories: categoryIds, clientId, ...rest } = createCaseStudyDto;

    let categories: Category[] = [];
    if (categoryIds && categoryIds.length > 0) {
      categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
    }

    let client: OurClient | null = null;
    if (clientId) {
      client = await this.ourClientRepository.findOne({ where: { id: clientId } });
      if (!client) {
        throw new NotFoundException(`Client with ID ${clientId} not found`);
      }
    }

    const caseStudy = this.caseStudyRepository.create({
      ...rest,
      ...(clientId && { clientId }),
    });
    
    caseStudy.categories = categories;
    if (client) {
      caseStudy.client = client;
    } else {
      (caseStudy as any).client = null;
    }
    
    return this.caseStudyRepository.save(caseStudy);
  }

  findAll() {
    return this.caseStudyRepository.find({
      relations: ['categories', 'client'],
      select: {
        categories: {
          name: true,
        },
        client: {
          id: true,
          name: true,
          email: true,
          companyName: true,
          designation: true,
          country: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.caseStudyRepository.findOne({
      where: { id },
      relations: ['categories', 'client'],
      select: {
        categories: {
          name: true,
        },
        client: {
          id: true,
          name: true,
          email: true,
          companyName: true,
          designation: true,
          country: true,
        },
      },
    });
  }

  async update(id: number, updateCaseStudyDto: UpdateCaseStudyDto) {
    const caseStudy = await this.caseStudyRepository.findOne({
      where: { id },
      relations: ['categories', 'client']
    });

    if (!caseStudy) {
      throw new NotFoundException(`CaseStudy with ID ${id} not found`);
    }

    const { categories: categoryIds, clientId, ...rest } = updateCaseStudyDto;

    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
      caseStudy.categories = categories;
    }

    if (clientId !== undefined) {
      if (clientId) {
        const client = await this.ourClientRepository.findOne({ where: { id: clientId } });
        if (!client) {
          throw new NotFoundException(`Client with ID ${clientId} not found`);
        }
        caseStudy.client = client;
        caseStudy.clientId = clientId;
      } else {
        (caseStudy as any).client = null;
        (caseStudy as any).clientId = null;
      }
    }

    Object.assign(caseStudy, rest);

    return this.caseStudyRepository.save(caseStudy);
  }

  async remove(id: number) {
    const caseStudy = await this.findOne(id);
    if (caseStudy) {
      return this.caseStudyRepository.remove(caseStudy);
    }
  }
}
