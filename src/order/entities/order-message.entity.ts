import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

export enum MessageSenderType {
  CLIENT = 'client',
  TEAM = 'team',
}

@Entity('order_messages')
export class OrderMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  orderId: number;

  @Column({
    type: 'enum',
    enum: MessageSenderType,
  })
  senderType: MessageSenderType; // 'client' or 'team'

  @Column({ nullable: true })
  senderId: number; // User ID if team, Client ID if client

  @Column({ nullable: true })
  senderName: string; // Name of sender

  @Column({ nullable: true })
  senderAvatar: string; // Avatar URL

  @Column({ type: 'text' })
  message: string;

  @Column('simple-array', { nullable: true })
  attachments: string[]; // Array of attachment URLs

  @CreateDateColumn()
  createdAt: Date;
}
