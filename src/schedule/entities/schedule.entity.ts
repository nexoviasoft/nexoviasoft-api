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
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OurTeam, { nullable: false })
  @JoinColumn({ name: 'teamId' })
  team: OurTeam;

  @Column()
  teamId: number;

  @Column({ type: 'json' })
  shifts: Array<{
    day?: string; // Day of week: 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    startTime?: string; // Format: 'HH:mm' (e.g., '09:00')
    endTime?: string; // Format: 'HH:mm' (e.g., '17:00')
    time?: string; // Alternative: time range string (e.g., '09:00 - 17:00') for backward compatibility
    label?: string; // Department/task label (e.g., 'DESIGN', 'PRODUCT', 'DEV', 'MARKETING', 'CHECK-IN')
    type?: string; // Shift type or color code identifier
  } | null>;

  @Column({ type: 'date', nullable: true })
  weekStartDate: Date;

  @Column({ type: 'date', nullable: true })
  weekEndDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
