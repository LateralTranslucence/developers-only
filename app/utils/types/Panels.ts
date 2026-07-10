import { CTASettings } from '@/utils/types/CTASettings';
import { Media } from '@/utils/types/Media';

export interface SearchPanelConfig {
    heading: string;
    modal: boolean;
}

export interface BlockItem {
    copy: string;
    cta_modal?: boolean;
    cta_text?: string;
    cta_url?: string;
    hidden?: boolean;
    media?: Media;
    title: string;
}

export interface BlocksPanelConfig {
    blocks: Array<BlockItem>;
    ctas: Array<CTASettings>;
    perRow: number;
    color: string;
}

export interface TabListItem {
    icon?: string;
    title: string;
    url?: string;
}

export interface PanelTab {
    copy?: string;
    ctas?: Array<CTASettings>;
    id: string;
    media?: Media;
    nav_label: string;
    title: string;
}

export interface TabsPanelConfig {
    mediaSize: string;
    tabs: Array<PanelTab>;
}