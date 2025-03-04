import { CTASettings } from '@/utils/types/CTASettings';
import { Media } from './Media';

export interface Tab {
    copy?: string;
    cta?: Array<CTASettings>;
    id: string;
    list?: Array<Record<string, any>>;
    list_title?: string;
    media?: Media;
    nav_label: string;
    title: string;
}