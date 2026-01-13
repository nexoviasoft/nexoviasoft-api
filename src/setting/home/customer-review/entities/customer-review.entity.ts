import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OurClient } from 'src/setting/our-client/entities/our-client.entity';
import { CaseStudy } from 'src/setting/home/case-studies/entities/case-study.entity';

@Entity('customer_reviews')
export class CustomerReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OurClient, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client: OurClient;

  @Column({ nullable: true })
  client_id: number;

  @ManyToOne(() => CaseStudy, { nullable: true })
  @JoinColumn({ name: 'case_study_id' })
  caseStudy: CaseStudy;

  @Column({ nullable: true })
  case_study_id: number;

  @Column({ type: 'int', default: 1 })
  rating: number; // 1 to 5

  @Column()
  review_title: string;

  @Column({ type: 'text' })
  review_message: string;

  @Column({ default: 'project' })
  review_type: string; // 'project' | 'service' | 'case-study'

  @Column({ default: false })
  is_featured: boolean;

  @Column({ default: 'pending' })
  status: string; // 'pending' | 'approved' | 'rejected'

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
