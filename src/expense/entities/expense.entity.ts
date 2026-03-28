import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';

export enum ExpenseStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum ExpenseType {
  ADVANCE_SALARY = 'advance salary',
  COMPANY_ITEMS = 'company items',
  LOAN = 'loan',
  OTHER = 'other',
}

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ExpenseType,
    default: ExpenseType.OTHER,
  })
  type: ExpenseType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ExpenseStatus,
    default: ExpenseStatus.PENDING,
  })
  status: ExpenseStatus;

  @ManyToOne(() => OurTeam)
  @JoinColumn({ name: 'requesterId' })
  requester: OurTeam;

  @Column()
  requesterId: number;

  @ManyToOne(() => OurTeam, { nullable: true })
  @JoinColumn({ name: 'approverId' })
  approver: OurTeam;

  @Column({ nullable: true })
  approverId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
