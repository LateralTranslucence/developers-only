import { Post } from 'src/utils/types/Post';

export interface TemplateProps {
    post: Post; 
    iframe: boolean;
    layoutClasses: ( ( classes: Array<string> ) => void ) | undefined;
}