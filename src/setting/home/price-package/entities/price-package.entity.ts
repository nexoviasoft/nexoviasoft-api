import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PricePackage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    projectLimit: string;

    @Column()
    revisionLimit: string;

    @Column('simple-array')
    features: string[];

    @Column({ nullable: true })
    badge: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    iconUrl: string;

    @Column({ default: 'active' })
    status: string;
}
