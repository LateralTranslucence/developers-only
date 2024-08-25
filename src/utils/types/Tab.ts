import { Post } from 'src/utils/types/Post';
import { Media } from './Media';

export interface Tab {
    copy?: string;
    cta_modal?: boolean;
    cta_text?: string;
    cta_url?: string;
    id: string;
    list?: Array<string>;
    media?: Media;
    nav_label: string;
    related?: Array<Post>;
    related_title?: string;
    title: string;
}