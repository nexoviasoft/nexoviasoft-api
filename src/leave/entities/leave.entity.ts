import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OurTeam, { nullable: false })
  @JoinColumn({ name: 'teamId' })
  team: OurTeam;

  @Column()
  teamId: number;

  @Column()
  type: string; // e.g., "Sick Leave", "Vacation", "Personal", "Casual Leave", "Earned Leave"

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'int' })
  days: number;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ default: 'pending' })
  status: string; // pending, approved, rejected

  @Column({ type: 'date', nullable: true })
  appliedOn: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
