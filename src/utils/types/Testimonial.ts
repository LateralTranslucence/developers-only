import { Media } from 'src/utils/types/Media';

export interface Testimonial {
    author: string;
    author_company_title: string;
    cta_class: string;
    cta_text: string;
    cta_url: string;
    logo: Media;
    quote: string;
    stat: string;
    stat_description: string;
    url: string;
}