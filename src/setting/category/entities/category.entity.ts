import { CaseStudy } from 'src/setting/home/case-studies/entities/case-study.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => CaseStudy, (caseStudy) => caseStudy.categories)
    caseStudies: CaseStudy[];

    @Column({ default: 'active' })
    status: string;
}
