import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../setting/category/entities/category.entity';
import { OurClient } from '../../setting/our-client/entities/our-client.entity';

export enum OrderStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  COMPLETED = 'Completed',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ unique: true, nullable: true })
  orderId: string;

  @ManyToOne(() => OurClient, { nullable: true })
  @JoinColumn({ name: 'clientId' })
  client: OurClient;

  @Column({ nullable: true })
  clientId: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @Column()
  service: string; // Service name

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'int', default: 0 })
  progress: number; // 0-100

  @Column('simple-array', { nullable: true })
  assignedTo: string[]; // Array of team member initials/IDs

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  paidAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
