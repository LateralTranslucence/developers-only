import { Post } from '@/utils/types/Post';
import { Form } from '@/utils/types/Form';

export interface APIResult {
    totalPages: string | null;
    totalPosts: string | null;
    allHeaders: Headers;
    json: Array<Post> | Post | Form | Record<string, any>;
}