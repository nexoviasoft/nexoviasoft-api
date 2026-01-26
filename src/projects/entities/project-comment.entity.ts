import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('project_comments')
export class ProjectComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @Column()
  author: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'json', nullable: true })
  mentions: string[]; // Array of mentioned usernames

  @CreateDateColumn()
  createdAt: Date;
}
