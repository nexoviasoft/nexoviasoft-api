import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobPosting } from './job-posting.entity';
import { Interview } from './interview.entity';

@Entity('candidates')
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // URL/path to candidate photo (for UI avatar)
  @Column({ nullable: true })
  photo?: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  position: string;

  @Column({ default: 'applied' })
  stage: string; // applied, screening, interview, offer, hired

  @Column({ type: 'date', nullable: true })
  appliedDate: Date;

  @Column({ nullable: true })
  experience: string;

  @Column('simple-array', { nullable: true })
  skills: string[];

  @ManyToOne(() => JobPosting, (jobPosting) => jobPosting.candidates, { nullable: true })
  @JoinColumn({ name: 'jobPostingId' })
  jobPosting: JobPosting;

  @Column({ nullable: true })
  jobPostingId: number;

  @OneToMany(() => Interview, (interview) => interview.candidate)
  interviews: Interview[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
