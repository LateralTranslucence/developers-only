import { CTASettings } from '@/utils/types/CTASettings';
import { Media } from '@/utils/types/Media';

export interface HeadingProps {
    align?: string;
    classes?: Array<string>;
    ctas?: Array<CTASettings>;
    id?: string;
    logo?: Media;
    pretitle?: string;
    publishDate?: string;
    subtitle?: string;
    tag?: string;
    title?: string;
    url?: string;
}