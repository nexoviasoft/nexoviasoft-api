import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Candidate } from './candidate.entity';

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  candidate: string; // Candidate name

  @Column()
  position: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string; // Format: HH:mm

  @Column()
  interviewer: string;

  @Column()
  type: string; // Technical, Behavioral, Portfolio Review, Final Round

  @Column({ default: 'Scheduled' })
  status: string; // Scheduled, Completed, Cancelled, Rescheduled

  @ManyToOne(() => Candidate, (candidate) => candidate.interviews, { nullable: true })
  @JoinColumn({ name: 'candidateId' })
  candidateEntity: Candidate;

  @Column({ nullable: true })
  candidateId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
