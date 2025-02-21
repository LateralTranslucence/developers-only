import { PanelProps } from '@/utils/types/PanelProps';
import { Post } from '@/utils/types/Post';

export interface GatedProps extends PanelProps {
    post: Post;
    iframe?: boolean;
}