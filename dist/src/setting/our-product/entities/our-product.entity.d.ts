import { Category } from '../../category/entities/category.entity';
export declare class OurProduct {
    id: number;
    category: Category;
    categoryId: number;
    name: string;
    logo: string;
    feature: string[];
    url: string;
    description: string;
    totalUser: number;
    createdAt: Date;
    updatedAt: Date;
}
