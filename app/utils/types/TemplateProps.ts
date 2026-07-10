import { Post } from '@/utils/types/Post';

export interface TemplateProps<TFields extends Record<string, unknown> = Record<string, unknown>> {
    post: Post<TFields>; 
    iframe: boolean;
    layoutClasses: ( ( classes: Array<string> ) => void ) | undefined;
}
