export interface SearchArgs {
    postID: number 
    metaPrefix: string;
    metaSuffix: string;
    query: Record<string, string>;
}