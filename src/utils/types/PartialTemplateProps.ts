import { Post } from 'src/utils/types/Post';

export interface PartialTemplateProps {
    index: number;
    panelSlider?: boolean;
    perRow?: number;
    post: Post;
    type: string;
}