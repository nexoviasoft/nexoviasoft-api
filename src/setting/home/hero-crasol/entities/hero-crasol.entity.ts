import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HeroCrasol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    logoUrl: string;

    @Column({ default: 'active' })
    status: string;
}
