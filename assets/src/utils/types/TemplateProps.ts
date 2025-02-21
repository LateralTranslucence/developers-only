import { Post } from '@/utils/types/Post';

export interface TemplateProps {
    post: Post; 
    iframe: boolean;
    layoutClasses: ( ( classes: Array<string> ) => void ) | undefined;
}