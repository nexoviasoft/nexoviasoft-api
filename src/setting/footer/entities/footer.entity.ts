import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('footers')
export class Footer {
  @PrimaryGeneratedColumn()
  id: number;

  // Company Info Section
  @Column({ nullable: true })
  logo_url: string;

  @Column()
  company_name: string;

  @Column({ type: 'text' })
  company_description: string;

  @Column()
  location: string;

  // Social Media URLs
  @Column({ nullable: true })
  twitter_url: string;

  @Column({ nullable: true })
  instagram_url: string;

  @Column({ nullable: true })
  linkedin_url: string;

  @Column({ nullable: true })
  youtube_url: string;

  // Company Links Section
  @Column({ default: 'Company' })
  company_links_title: string;

  @Column('jsonb', { default: [] })
  company_links: { label: string; url: string }[];

  // Services Links Section
  @Column({ default: 'Services' })
  services_links_title: string;

  @Column('jsonb', { default: [] })
  services_links: { label: string; url: string }[];

  // Legal Links Section
  @Column({ default: 'Legal' })
  legal_links_title: string;

  @Column('jsonb', { default: [] })
  legal_links: { label: string; url: string }[];

  // Newsletter Section
  @Column({ default: 'Stay Updated' })
  newsletter_title: string;

  @Column({ default: 'Email address' })
  newsletter_placeholder: string;

  @Column({ default: true })
  newsletter_enabled: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
