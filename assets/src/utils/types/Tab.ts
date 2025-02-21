import { Post } from '@/utils/types/Post';
import { Media } from './Media';

export interface Tab {
    copy?: string;
    cta_modal?: boolean;
    cta_text?: string;
    cta_url?: string;
    id: string;
    list?: Array<Record<string, any>>;
    media?: Media;
    nav_label: string;
    title: string;
}