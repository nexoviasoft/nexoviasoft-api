import { Category } from '../../category/entities/category.entity';
export declare class OurService {
    id: number;
    logo: string;
    image: string;
    title: string;
    subtitle: string;
    description: string;
    keyFeature: string[];
    benefit: string[];
    otherservice: Array<{
        name: string;
        description: string;
        isfeature: boolean;
    }>;
    category: Category;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}
