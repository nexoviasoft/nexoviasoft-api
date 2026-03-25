import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  meetingId: string; // e.g. m-2026-01-29-002

  @Column()
  meetingLink: string; // https://NexoviaSoft.com/meetings/<meetingId>

  @Column()
  topic: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @Column({ type: 'int' })
  durationMinutes: number;

  @Column({ type: 'json', default: [] })
  attendeeIds: number[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  organizerName: string | null;

  @Column({ default: 'upcoming' })
  status: 'upcoming' | 'completed' | 'cancelled';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
