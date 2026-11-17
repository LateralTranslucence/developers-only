import { Breadcrumbs } from '@/utils/types/Breadcrumbs';
import { DateTime } from '@/utils/types/DateTime';
import { Media } from '@/utils/types/Media';

/*
 * A post as the REST API returns it: core's /wp/v2/{type} response with the
 * theme's fields added on top (devo_rest_theme_fields() in
 * api/functions.helpers.php).
 *
 * The WP_Post-style properties (post_title, post_name, ...) are optional:
 * a post nested more than a couple of levels deep in a post_browser field,
 * or a post type the theme didn't register, may carry only some of them. Read
 * them through the getPost* helpers in @/utils/helpers, which fall back to
 * core's equivalents (title.rendered, slug, ...).
 */
export interface Post<TFields extends Record<string, unknown> = Record<string, unknown>> {
    // Core REST fields
    id?: number;
    slug?: string;
    type?: string;
    link?: string;
    status?: string;
    title?: { rendered: string };
    content?: { rendered: string; protected?: boolean };
    excerpt?: { rendered: string; protected?: boolean };
    _links?: {
        [ key: string ]: Array<{ href: string; embeddable?: boolean; count?: number }>;
    };
    // Theme fields
    ID?: number;
    post_title?: string;
    post_name?: string;
    post_type?: string;
    post_parent?: number;
    menu_order?: number;
    post_date?: DateTime;
    raw_post_date?: string;
    post_modified?: string;
    post_content?: string;
    post_excerpt?: string;
    content_protected?: boolean;
    fields: TFields;
    is_featured?: boolean;
    noindex?: string;
    permalink: string;
    post_thumbnail: Media;
    post_type_details: {
        bonus_fields?: Record<string, unknown>;
        breadcrumbs: Array<Breadcrumbs>;
        is_landing_page: boolean;
        meta_fields: Record<string, unknown>;
        meta_prefix: string;
        meta_suffix?: string;
        post_thumbnail: string | null;
        post_type: string;
        post_type_display_name: string;
        post_type_slug: string;
        schema: Record<string, unknown>;
    };
    schema?: Record<string, unknown>;
    seo_description?: string;
    seo_image?: string;
    seo_locale?: string;
    seo_site_name?: string;
    seo_title?: string;
    seo_url?: string;
}
