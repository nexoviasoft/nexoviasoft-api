import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Department } from '../../setting/department/entities/department.entity';
import { OurTeam } from '../../setting/home/our-team/entities/our-team.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'Planning' })
  status: string; // Planning, In Progress, Completed

  @Column({ type: 'int', default: 0 })
  progress: number; // 0-100

  @Column({ nullable: true })
  applicationType: string; // Web Application, Mobile Application, Backend Service, Database Layer

  @Column({ nullable: true })
  platform: string; // Marketing Site, iOS & Android, REST API, MongoDB Cluster

  @ManyToOne(() => Department, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => OurTeam, { nullable: true })
  @JoinColumn({ name: 'projectLeadId' })
  projectLead: OurTeam;

  @Column({ nullable: true })
  projectLeadId: number;

  @ManyToMany(() => OurTeam, { nullable: true })
  @JoinTable({
    name: 'project_team_members',
    joinColumn: { name: 'projectId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'teamMemberId', referencedColumnName: 'id' },
  })
  teamMembers: OurTeam[];

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'int', default: 0 })
  tasksCompleted: number;

  @Column({ type: 'int', default: 0 })
  totalTasks: number;

  @Column({ nullable: true })
  template: string; // Template ID from projectTemplates

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
