import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { Post } from '@/utils/types/Post';

export interface PanelProps<TFields extends Record<string, unknown> = Record<string, unknown>> {
    index?: number;
    name?: string;
    pageID?: string;
    panelID?: string;
    panelNumber?: number;
    panelPrefix?: string;
    panelSuffix?: string;
    parallaxMediaEffect?: CustomAttributes;
    post: Post<TFields>;
}
