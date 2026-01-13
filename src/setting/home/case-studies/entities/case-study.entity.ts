import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/setting/category/entities/category.entity';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';

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

    @ManyToOne(() => OurClient, { nullable: true })
    @JoinColumn({ name: 'clientId' })
    client: OurClient;

    @Column({ nullable: true })
    clientId: number;

    @Column({ nullable: true })
    industry: string;

    @Column({ type: 'text', nullable: true })
    problem_statement: string;

    @Column({ type: 'text', nullable: true })
    solution_overview: string;

    @Column({ type: 'text', nullable: true })
    results: string;

    @Column({ nullable: true })
    duration: string;

    @Column('simple-array', { nullable: true })
    projectimage: string[];
}
