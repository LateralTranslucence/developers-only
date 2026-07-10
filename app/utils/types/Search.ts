import { Post } from '@/utils/types/Post';
import { SearchFormField } from '@/utils/types/Form';

export interface SearchCriteria {
    label: string;
    name: string;
    value?: string;
    value_string: string;
}

export interface SearchResultsStatement {
    criteria: Array<SearchCriteria>;
    text: string;
}

export interface SearchSort {
    current_value: string;
    options: Record<string, string>;
}

export interface SearchResponse<TPost extends Post = Post> {
    current_page: number;
    pages: number;
    posts: Array<TPost>;
    results_statement: SearchResultsStatement;
    sort: SearchSort;
    ui: Record<string, SearchFormField>;
}

export const emptySearchResponse: SearchResponse = {
    current_page: 1,
    pages: 1,
    posts: [],
    results_statement: {
        criteria: [],
        text: '',
    },
    sort: {
        current_value: '',
        options: {},
    },
    ui: {},
};

export const normalizeSearchResponse = ( input: unknown ): SearchResponse => {
    const data = ( input && typeof input === 'object' ? input : {} ) as Partial<SearchResponse>;

    return {
        current_page: typeof data.current_page === 'number' ? data.current_page : 1,
        pages: typeof data.pages === 'number' ? data.pages : 1,
        posts: Array.isArray( data.posts ) ? data.posts : [],
        results_statement: {
            text: typeof data.results_statement?.text === 'string' ? data.results_statement.text : '',
            criteria: Array.isArray( data.results_statement?.criteria ) ? data.results_statement.criteria : [],
        },
        sort: {
            current_value: typeof data.sort?.current_value === 'string' ? data.sort.current_value : '',
            options: data.sort?.options && typeof data.sort.options === 'object' ? data.sort.options : {},
        },
        ui: data.ui && typeof data.ui === 'object' ? data.ui as Record<string, SearchFormField> : {},
    };
};
