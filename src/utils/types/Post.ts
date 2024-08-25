import { Media } from 'src/utils/types/Media';

export interface Post {
    comment_count: string;
    comment_status: string;
    filter: string;
    guid: string;
    ID: number;
    menu_order: number;
    pinged: string;
    ping_status: string;
    post_author: number;
    post_content: string;
    post_content_filtered: string;
    post_date: {
        stamp: string;
        iso8601: string;
        formatted: string;
        month: string;
        day: string;
        year: string;
    };
    post_date_gmt: string;
    post_excerpt: string;
    post_mime_type: string;
    post_modified: string;
    post_modified_gmt: string;
    post_name: string;
    post_parent: string;
    post_password: string;
    post_status: string;
    post_title:  string;
    post_type:  string;
    to_ping: string;
    _links: {
        [ key: string ]: Array<{ href: string; embeddable?: boolean; count?: number }>;
    };
    // Added by DO
    fields: Record<string, any>;
    noindex: string;
    permalink: string;
    post_thumbnail: Media;
    post_type_details: {
        bonus_fields: Record<string, any>;
        is_landing_page: boolean;
        meta_fields: Record<string, any>;
        meta_prefix: string;
        post_name: Array<string>;
        post_title: Array<string>;
        post_type: string;
        post_type_display_name: string;
        post_type_slug: string;
        schema: Record<string, any>;
        seo_description: string;
        seo_image: string;
        seo_title: string;
    };
    raw_post_date: string;
    schema: Record<string, any>;
    seo_description: string;
    seo_image: string;
    seo_locale: string;
    seo_site_name: string;
    seo_title: string;
    seo_url: string;
  }