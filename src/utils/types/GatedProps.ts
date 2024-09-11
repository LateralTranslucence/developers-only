import { PanelProps } from 'src/utils/types/PanelProps';
import { Post } from 'src/utils/types/Post';

export interface GatedProps extends PanelProps {
    post: Post;
    iframe?: boolean;
}