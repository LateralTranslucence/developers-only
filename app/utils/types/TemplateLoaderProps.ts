import { Post } from '@/utils/types/Post';

export interface TemplateLoaderProps {
    iframe?: boolean;
    layoutClassesFunction?: ( classes: Array<string> ) => void;
    onLoad?: () => void;
    post?: Post;
    postType: string;
    queryString?: string;
    slug: string;
}