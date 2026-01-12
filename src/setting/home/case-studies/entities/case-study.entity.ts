import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/setting/category/entities/category.entity';

@Entity()
export class CaseStudy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: false })
    badge: boolean;

    @Column('simple-array')
    features: string[];

    @ManyToMany(() => Category, (category) => category.caseStudies)
    @JoinTable()
    categories: Category[];

    @Column()
    imageUrl: string;

    @Column({ nullable: true })
    caseStudyUrl: string;

    @Column({ nullable: true })
    liveUrl: string;

    @Column({ default: 'active' })
    status: string;
}
