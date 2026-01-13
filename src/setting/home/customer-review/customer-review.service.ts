import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerReviewDto } from './dto/create-customer-review.dto';
import { UpdateCustomerReviewDto } from './dto/update-customer-review.dto';
import { CustomerReview } from './entities/customer-review.entity';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
import { CaseStudy } from 'src/setting/home/case-studies/entities/case-study.entity';

@Injectable()
export class CustomerReviewService {
  constructor(
    @InjectRepository(CustomerReview)
    private readonly customerReviewRepository: Repository<CustomerReview>,
    @InjectRepository(OurClient)
    private readonly ourClientRepository: Repository<OurClient>,
    @InjectRepository(CaseStudy)
    private readonly caseStudyRepository: Repository<CaseStudy>,
  ) {}

  async create(createCustomerReviewDto: CreateCustomerReviewDto) {
    const { client_id, case_study_id, ...rest } = createCustomerReviewDto;

    let client: OurClient | null = null;
    if (client_id) {
      client = await this.ourClientRepository.findOne({
        where: { id: client_id },
      });
      if (!client) {
        throw new NotFoundException(`Client with ID ${client_id} not found`);
      }
    }

    let caseStudy: CaseStudy | null = null;
    if (case_study_id) {
      caseStudy = await this.caseStudyRepository.findOne({
        where: { id: case_study_id },
      });
      if (!caseStudy) {
        throw new NotFoundException(
          `Case Study with ID ${case_study_id} not found`,
        );
      }
    }

    const customerReview = this.customerReviewRepository.create({
      ...rest,
      ...(client_id && { client_id }),
      ...(case_study_id && { case_study_id }),
    });

    // If status is approved, automatically set is_featured to true
    if (customerReview.status === 'approved') {
      customerReview.is_featured = true;
    }

    if (client) {
      customerReview.client = client;
    }
    if (caseStudy) {
      customerReview.caseStudy = caseStudy;
    }

    return this.customerReviewRepository.save(customerReview);
  }

  async findAll() {
    return this.customerReviewRepository.find({
      relations: ['client', 'caseStudy'],
      select: {
        client: {
          id: true,
          name: true,
          email: true,
          companyName: true,
          designation: true,
          photo: true,
        },
        caseStudy: {
          id: true,
          title: true,
          imageUrl: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const customerReview = await this.customerReviewRepository.findOne({
      where: { id },
      relations: ['client', 'caseStudy'],
      select: {
        client: {
          id: true,
          name: true,
          email: true,
          companyName: true,
          designation: true,
          photo: true,
        },
        caseStudy: {
          id: true,
          title: true,
          imageUrl: true,
        },
      },
    });

    if (!customerReview) {
      throw new NotFoundException(
        `Customer Review with ID ${id} not found`,
      );
    }

    return customerReview;
  }

  async update(id: number, updateCustomerReviewDto: UpdateCustomerReviewDto) {
    const customerReview = await this.customerReviewRepository.findOne({
      where: { id },
      relations: ['client', 'caseStudy'],
    });

    if (!customerReview) {
      throw new NotFoundException(
        `Customer Review with ID ${id} not found`,
      );
    }

    const { client_id, case_study_id, ...rest } = updateCustomerReviewDto;

    if (client_id !== undefined) {
      if (client_id) {
        const client = await this.ourClientRepository.findOne({
          where: { id: client_id },
        });
        if (!client) {
          throw new NotFoundException(`Client with ID ${client_id} not found`);
        }
        customerReview.client = client;
        customerReview.client_id = client_id;
      } else {
        (customerReview as any).client = null;
        (customerReview as any).client_id = null;
      }
    }

    if (case_study_id !== undefined) {
      if (case_study_id) {
        const caseStudy = await this.caseStudyRepository.findOne({
          where: { id: case_study_id },
        });
        if (!caseStudy) {
          throw new NotFoundException(
            `Case Study with ID ${case_study_id} not found`,
          );
        }
        customerReview.caseStudy = caseStudy;
        customerReview.case_study_id = case_study_id;
      } else {
        (customerReview as any).caseStudy = null;
        (customerReview as any).case_study_id = null;
      }
    }

    Object.assign(customerReview, rest);

    // If status is approved, automatically set is_featured to true
    if (customerReview.status === 'approved') {
      customerReview.is_featured = true;
    }

    return this.customerReviewRepository.save(customerReview);
  }

  async approve(id: number) {
    const customerReview = await this.customerReviewRepository.findOne({
      where: { id },
      relations: ['client', 'caseStudy'],
    });

    if (!customerReview) {
      throw new NotFoundException(
        `Customer Review with ID ${id} not found`,
      );
    }

    customerReview.status = 'approved';
    customerReview.is_featured = true;

    return this.customerReviewRepository.save(customerReview);
  }

  async remove(id: number) {
    const customerReview = await this.findOne(id);
    return this.customerReviewRepository.remove(customerReview);
  }
}
