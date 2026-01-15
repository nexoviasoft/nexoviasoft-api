import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OurClient } from '../../our-client/entities/our-client.entity';
import { PricePackage } from '../../home/price-package/entities/price-package.entity';
import { OurService } from '../../our-service/entities/our-service.entity';

@Entity('service_requests')
export class ServiceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OurClient, { nullable: true })
  @JoinColumn({ name: 'clientId' })
  client: OurClient;

  @Column({ nullable: true })
  clientId: number;

  @ManyToOne(() => PricePackage, { nullable: true })
  @JoinColumn({ name: 'pricePackageId' })
  pricePackage: PricePackage;

  @Column({ nullable: true })
  pricePackageId: number;

  @ManyToOne(() => OurService, { nullable: true })
  @JoinColumn({ name: 'serviceId' })
  service: OurService;

  @Column({ nullable: true })
  serviceId: number;

  @Column()
  serviceType: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
