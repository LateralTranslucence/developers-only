export interface SearchQueryArgs {
    nopaging?: boolean;
    orderby?: string;
    post__not_in?: Array<number>;
    posts_per_page?: number;
    post_type?: string;
}