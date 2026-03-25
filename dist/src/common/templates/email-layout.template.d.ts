export type EmailLayoutParams = {
    preheader?: string;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    accent?: string;
    contentHtml: string;
    contactEmail?: string;
    footerNote?: string;
};
export declare const defaultAccent = "#1f7ae0";
export declare const escapeHtml: (value: string) => string;
export declare const nl2br: (value: string) => string;
export declare function renderEmailLayout(params: EmailLayoutParams): string;
