import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { Post } from '@/utils/types/Post';

export interface PanelProps {
    index?: number;
    name?: string;
    pageCSS?: string;
    pageID?: string;
    panelID?: string;
    panelNumber?: number;
    panelPrefix?: string;
    panelSuffix?: string;
    parallaxMediaEffect?: CustomAttributes;
    post: Post;
}