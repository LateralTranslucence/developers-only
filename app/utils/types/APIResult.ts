import { Post } from '@/utils/types/Post';
import { Form } from '@/utils/types/Form';

export interface APIResult<TJson = Array<Post> | Post | Form | Record<string, unknown>> {
    totalPages: string | null;
    totalPosts: string | null;
    allHeaders: Headers;
    json: TJson;
}
