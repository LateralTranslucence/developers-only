import { Post } from 'src/utils/types/Post';

export interface TemplateLoaderProps {
    iframe?: boolean;
    layoutClassesFunction?: ( classes: Array<string> ) => void;
    post?: Post;
    postType: string;
    queryString?: string;
    slug: string;
}