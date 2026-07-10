import { Post } from '@/utils/types/Post';

export interface PartialTemplateProps {
    index: number;
    panelSlider?: boolean;
    perRow?: number;
    post: Post;
    showFeatured?: boolean;
    type?: string;
}