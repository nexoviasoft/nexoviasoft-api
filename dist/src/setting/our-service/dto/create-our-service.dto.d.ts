export declare class OtherServiceItemDto {
    name: string;
    description: string;
    isfeature: boolean;
}
export declare class CreateOurServiceDto {
    logo?: string;
    image?: string;
    title: string;
    subtitle?: string;
    description?: string;
    keyFeature?: string[];
    benefit?: string[];
    otherservice?: OtherServiceItemDto[];
    categoryId?: number;
}
