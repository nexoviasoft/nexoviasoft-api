import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Task } from './task.entity';

@Entity('task_comments')
export class TaskComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column()
  taskId: number;

  @Column()
  author: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'json', nullable: true })
  mentions: string[]; // Array of mentioned usernames

  @Column({ nullable: true })
  parentId: number;

  @CreateDateColumn()
  createdAt: Date;
}
