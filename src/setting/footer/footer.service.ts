import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { Footer } from './entities/footer.entity';

@Injectable()
export class FooterService {
  constructor(
    @InjectRepository(Footer)
    private readonly footerRepository: Repository<Footer>,
  ) { }

  async getOne() {
    // Get the first footer record (there should only be one)
    const footer = await this.footerRepository.findOne({
      where: {},
      order: { id: 'ASC' },
    });

    if (!footer) {
      // If no footer exists, create a default one
      const defaultFooter = this.footerRepository.create({
        company_name: 'NexoviaSoft.',
        company_description:
          'Crafting digital experiences with precision and passion. Based remotely, working globally.',
        location: 'New York, NY',
        company_links_title: 'Company',
        company_links: [
          { label: 'About', url: '#' },
          { label: 'Work', url: '#' },
          { label: 'Agency', url: '#' },
          { label: 'Contact', url: '#' },
        ],
        services_links_title: 'Services',
        services_links: [
          { label: 'Web Dev', url: '#' },
          { label: 'Mobile', url: '#' },
          { label: 'SaaS', url: '#' },
          { label: 'Design', url: '#' },
        ],
        legal_links_title: 'Legal',
        legal_links: [
          { label: 'Privacy Policy', url: '#' },
          { label: 'Terms & Conditions', url: '#' },
          { label: 'Refund Policy', url: '#' },
        ],
        newsletter_title: 'Stay Updated',
        newsletter_placeholder: 'Email address',
        newsletter_enabled: true,
      });

      return this.footerRepository.save(defaultFooter);
    }

    return footer;
  }

  async update(updateFooterDto: UpdateFooterDto) {
    // Get the first footer record (there should only be one)
    const footer = await this.footerRepository.findOne({
      where: {},
      order: { id: 'ASC' },
    });

    if (!footer) {
      throw new NotFoundException('Footer not found');
    }

    Object.assign(footer, updateFooterDto);

    return this.footerRepository.save(footer);
  }
}
