import { CTASettings } from '@/utils/types/CTASettings';
import { Media } from '@/utils/types/Media';

export interface HeadingProps {
    align?: string;
    classes?: Array<string>;
    ctas?: Array<CTASettings>;
    id?: string;
    // Media = per-heading logo image; true = use the site-wide Logo option
    logo?: Media | boolean;
    pretitle?: string;
    publishDate?: string;
    subtitle?: string;
    tag?: string;
    title?: string;
    url?: string;
}