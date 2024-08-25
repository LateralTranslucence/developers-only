import { Post } from 'src/utils/types/Post';

export interface APIResult {
    totalPages: string | null;
    totalPosts: string | null;
    allHeaders: Headers;
    json: Array<Post> | Post | Record<string, any>;
}