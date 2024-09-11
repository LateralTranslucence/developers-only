import { Post } from 'src/utils/types/Post';
import { Form } from 'src/utils/types/Form';

export interface APIResult {
    totalPages: string | null;
    totalPosts: string | null;
    allHeaders: Headers;
    json: Array<Post> | Post | Form | Record<string, any>;
}