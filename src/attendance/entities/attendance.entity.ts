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
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  checkIn: string;

  @Column({ nullable: true })
  checkOut: string;

  @Column({ nullable: true })
  workHours: string;

  @Column()
  status: string; // "On Time", "Late", "Absent"

  @ManyToOne(() => OurTeam, { nullable: true })
  @JoinColumn({ name: 'teamId' })
  team: OurTeam;

  @Column({ nullable: true })
  teamId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
