import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Order, OrderStatus } from './order.entity';

@Entity('order_tracking')
export class OrderTracking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  orderId: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    nullable: true,
  })
  status: OrderStatus; // Status change

  @Column({ type: 'int', nullable: true })
  progress: number; // Progress percentage (0-100)

  @Column({ type: 'text', nullable: true })
  note: string; // Note about the update

  @Column({ nullable: true })
  createdBy: number; // User ID who made the change

  @Column({ nullable: true })
  createdByName: string; // Name of user who made the change

  @CreateDateColumn()
  createdAt: Date;
}
