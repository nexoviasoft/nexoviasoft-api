import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';

export type PayrollStatus = 'Pending' | 'Processing' | 'Paid';

@Entity()
@Index(['teamId', 'periodYear', 'periodMonth'], { unique: true })
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OurTeam, { nullable: false })
  @JoinColumn({ name: 'teamId' })
  team: OurTeam;

  @Column()
  teamId: number;

  // Period this payroll belongs to (e.g. Jan 2026)
  @Column({ type: 'int' })
  periodYear: number;

  @Column({ type: 'int' })
  periodMonth: number; // 1-12

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  baseSalary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  bonus: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  deductions: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  netPay: number;

  @Column({ default: 'Pending' })
  status: PayrollStatus;

  @Column({ type: 'timestamptz', nullable: true })
  paymentDate: Date | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
