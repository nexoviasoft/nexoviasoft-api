import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Candidate } from './candidate.entity';
import { Department } from '../../setting/department/entities/department.entity';

@Entity('job_postings')
export class JobPosting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  department: string;

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  departmentEntity?: Department;

  @Column({ nullable: true })
  departmentId?: number;

  @Column()
  type: string; // Full-time, Part-time, Contract, Internship

  @Column()
  location: string; // Remote, On-site, Hybrid, or specific location

  @Column({ default: 'Active' })
  status: string; // Active, Inactive, Draft

  @Column({ default: 0 })
  applicants: number;

  @Column({ type: 'date', nullable: true })
  postedDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @OneToMany(() => Candidate, (candidate) => candidate.jobPosting)
  candidates: Candidate[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
