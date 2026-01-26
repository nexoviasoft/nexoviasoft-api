import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';
import { TaskComment } from './task-comment.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'medium' })
  priority: string; // high, medium, low

  @Column({ default: 'todo' })
  status: string; // todo, in-progress, review, complete, etc.

  @Column({ nullable: true })
  columnId: string; // Kanban column ID

  @Column({ type: 'int', default: 0 })
  order: number; // Order within column

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ nullable: true })
  team: string;

  @Column({ type: 'json', nullable: true })
  assignees: string[]; // Array of assignee IDs or initials

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TaskComment, (comment) => comment.task, { cascade: true })
  comments: TaskComment[];
}
