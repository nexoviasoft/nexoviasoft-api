import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity('our_services')
export class OurService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('simple-array', { nullable: true })
  keyFeature: string[];

  @Column('simple-array', { nullable: true })
  benefit: string[];

  @Column('json', { nullable: true })
  otherservice: Array<{
    name: string;
    description: string;
    isfeature: boolean;
  }>;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
