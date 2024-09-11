import { CTASettings } from 'src/utils/types/CTASettings';

export interface HeadingProps {
    align?: string;
    classes?: Array<string>;
    cta?: CTASettings;
    id?: string;
    pretitle?: string;
    publishDate?: string;
    subtitle?: string;
    tag?: string;
    title?: string;
    url?: string;
}