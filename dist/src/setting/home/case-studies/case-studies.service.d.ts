import { Category } from 'src/setting/category/entities/category.entity';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
import { Repository } from 'typeorm';
import { CreateCaseStudyDto } from './dto/create-case-study.dto';
import { UpdateCaseStudyDto } from './dto/update-case-study.dto';
import { CaseStudy } from './entities/case-study.entity';
export declare class CaseStudiesService {
    private caseStudyRepository;
    private categoryRepository;
    private ourClientRepository;
    constructor(caseStudyRepository: Repository<CaseStudy>, categoryRepository: Repository<Category>, ourClientRepository: Repository<OurClient>);
    create(createCaseStudyDto: CreateCaseStudyDto): Promise<CaseStudy>;
    findAll(): Promise<CaseStudy[]>;
    findOne(id: number): Promise<CaseStudy>;
    update(id: number, updateCaseStudyDto: UpdateCaseStudyDto): Promise<CaseStudy>;
    remove(id: number): Promise<CaseStudy>;
}
