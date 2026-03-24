import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('documents')
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'invoice' or 'letter'

  @Column({ nullable: true })
  template: string; // Template ID

  @Column({ type: 'json' })
  data: any; // Document data (invoice data or letter data)

  @Column({ nullable: true })
  clientName: string;

  @Column({ nullable: true })
  clientEmail: string;

  @Column({ nullable: true })
  clientAddress: string;

  @Column({ default: 'draft' })
  status: string; // 'draft', 'sent', 'archived'

  @Column({ nullable: true })
  documentNumber: string; // Invoice number or letter reference

  @Column({ nullable: true })
  pdfUrl: string; // URL to generated PDF

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
