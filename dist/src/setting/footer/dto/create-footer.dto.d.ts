export declare class CreateFooterDto {
    logo_url?: string;
    company_name: string;
    company_description: string;
    location: string;
    twitter_url?: string;
    instagram_url?: string;
    linkedin_url?: string;
    youtube_url?: string;
    company_links_title?: string;
    company_links?: {
        label: string;
        url: string;
    }[];
    services_links_title?: string;
    services_links?: {
        label: string;
        url: string;
    }[];
    legal_links_title?: string;
    legal_links?: {
        label: string;
        url: string;
    }[];
    newsletter_title?: string;
    newsletter_placeholder?: string;
    newsletter_enabled?: boolean;
}
