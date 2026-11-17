import { Post } from '@/utils/types/Post';

/*
 * Read a post's identity fields with a fallback from the theme's WP_Post-style
 * names to core REST's own (see utils/types/Post.ts for why both exist).
 */
type PostLike = Partial<Post>;

export const getPostID = ( post: PostLike ): number => post.ID ?? post.id ?? 0;

export const getPostTitle = ( post: PostLike ): string => post.post_title ?? post.title?.rendered ?? '';

export const getPostSlug = ( post: PostLike ): string => post.post_name ?? post.slug ?? '';

export const getPostType = ( post: PostLike ): string => post.post_type ?? post.type ?? '';

export const getPostExcerpt = ( post: PostLike ): string => post.post_excerpt ?? post.excerpt?.rendered ?? '';

export const getPostContent = ( post: PostLike ): string => post.post_content ?? post.content?.rendered ?? '';
