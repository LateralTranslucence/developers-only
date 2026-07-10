import { CTASettings } from '@/utils/types/CTASettings';
import { TabListItem } from '@/utils/types/Panels';
import { Media } from './Media';

export interface Tab {
    copy?: string;
    ctas?: Array<CTASettings>;
    id: string;
    list?: Array<TabListItem>;
    list_title?: string;
    media?: Media;
    nav_label: string;
    title: string;
}
