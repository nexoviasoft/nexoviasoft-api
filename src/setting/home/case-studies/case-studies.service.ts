import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/setting/category/entities/category.entity';
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
  ) { }

  async create(createCaseStudyDto: CreateCaseStudyDto) {
    const { categories: categoryIds, ...rest } = createCaseStudyDto;

    let categories: Category[] = [];
    if (categoryIds && categoryIds.length > 0) {
      categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
    }

    const caseStudy = this.caseStudyRepository.create({
      ...rest,
      categories,
    });
    return this.caseStudyRepository.save(caseStudy);
  }

  findAll() {
    return this.caseStudyRepository.find({
      relations: ['categories'],
      select: {
        categories: {
          name: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.caseStudyRepository.findOne({
      where: { id },
      relations: ['categories'],
      select: {
        categories: {
          name: true,
        },
      },
    });
  }

  async update(id: number, updateCaseStudyDto: UpdateCaseStudyDto) {
    const caseStudy = await this.caseStudyRepository.findOne({
      where: { id },
      relations: ['categories']
    });

    if (!caseStudy) {
      throw new NotFoundException(`CaseStudy with ID ${id} not found`);
    }

    const { categories: categoryIds, ...rest } = updateCaseStudyDto;

    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({ id: In(categoryIds) });
      caseStudy.categories = categories;
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
