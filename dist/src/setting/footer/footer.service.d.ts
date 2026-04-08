import { Repository } from 'typeorm';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { Footer } from './entities/footer.entity';
export declare class FooterService {
    private readonly footerRepository;
    constructor(footerRepository: Repository<Footer>);
    getOne(): Promise<Footer>;
    update(updateFooterDto: UpdateFooterDto): Promise<Footer>;
}
