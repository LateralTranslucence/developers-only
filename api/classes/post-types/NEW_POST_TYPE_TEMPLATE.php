<?php
/*
 * TEMPLATE for a new custom post type.
 *
 * There is no ACF in this theme - every custom post type is a subclass of
 * DO_Custom_Post_Type (api/classes/class-custom-post-type.php), an abstract
 * singleton base class. Content is NOT stored in the native post_content
 * column; it lives in post meta, and the class mirrors selected meta fields
 * into the native post_title/post_content/post_excerpt columns (via the
 * `post_title`/`post_content`/`post_excerpt` settings below) so WordPress
 * search, the admin list table, etc. still work as expected.
 *
 * HOW TO USE THIS FILE
 * 1. Copy it to api/classes/post-types/class-{your-post-type}.php
 *    e.g. class-blog.php for a "blog" post type.
 * 2. Rename `DO_POST_TYPE` below to something specific, e.g. `DO_Blog`.
 * 3. Fill in the five methods below (see the Blog post type's real
 *    implementation quoted throughout as a worked example).
 * 4. Register the file in functions.php's devo_load_classes(), in the
 *    $post_types array, using the same {your-post-type} string as the
 *    filename (no "class-" prefix, no ".php"):
 *        $post_types = [
 *            'landing-page',
 *            'blog',   // <- loads api/classes/post-types/class-blog.php
 *            ...
 *        ];
 * 5. If the post type is only sometimes needed, leave it commented out of
 *    the $post_types array above rather than deleted, so it's easy to
 *    re-enable later 
 *
 * Once loaded, DO_POST_TYPE::get_instance() (bottom of this file) registers
 * the post type on `init`, wires its meta boxes into wp-admin, and exposes
 * `fields` (typed, serialized meta) on the post type's REST API response.
 */
class DO_POST_TYPE extends DO_Custom_Post_Type {

    /*
     * The raw WordPress post type slug, e.g. 'devo_blog'.
     * Convention: prefix with 'devo_' to avoid colliding with core/plugin
     * post types. The LAST underscore-separated segment (here, "blog")
     * becomes this post type's meta_prefix automatically - see meta_fields()
     * below for why that matters. Override it explicitly with the
     * 'meta_prefix' setting in settings() if you ever need a different one.
     *
     * Example (Blog): return 'devo_blog';
     */
    protected function post_type(): string {
        return '';
    }

    /*
     * Raw args merged into register_post_type()'s own $args array (labels,
     * supports, taxonomies, etc. - see the WP register_post_type() docs).
     * Most post types don't need anything here; settings() below already
     * covers the common cases (slug, has_archive, menu_position, ...) with
     * theme-specific conveniences layered on top.
     *
     * Example (Blog): return []; (nothing extra needed)
     */
    protected function post_type_args(): array {
        return [];
    }

    /*
     * Theme-specific configuration, as a flat associative array. Every key
     * is optional; only set what you need. Full list of recognized keys is
     * the switch statement in DO_Custom_Post_Type::set_setting() - the ones
     * you'll use most often:
     *
     *   - post_title / post_content / post_excerpt / post_name / post_thumbnail
     *     Point these at a meta field LABEL (defined below in meta_fields())
     *     and its value gets mirrored into the matching native post_* column
     *     on save. post_thumbnail additionally accepts 'Field||Fallback' to
     *     fall back to a second field if the first is empty.
     *   - slug            Archive/rewrite base, e.g. 'blog' -> /blog/.
     *   - has_archive     Whether an archive page exists for this post type.
     *   - hide_field      Label of a 'binary' meta field used to hide a post
     *                     from queries/listings without deleting it.
     *   - character_count Map of { 'Field Label' => max chars } shown as a
     *                     live counter in the admin edit screen.
     *   - seo             { title, description, image } - each value is a
     *                     meta field label (or 'Field||Fallback') used to
     *                     build this post type's SEO meta tags / og: tags.
     *   - schema          schema.org JSON-LD config. '@type' is a literal
     *                     string; every other key maps a schema.org property
     *                     name to a meta field label (or 'One||Two' for a
     *                     fallback chain).
     *   - breadcrumbs     { 'Crumb Text' => '/url/', ... } prepended ahead
     *                     of this post type's own breadcrumb on single pages.
     *   - bonus_fields    { 'short_name' => 'actual_meta_field_key', ... }
     *                     extra named hooks some theme code looks up by a
     *                     short alias instead of the full meta key.
     *   - rest_slug       Override the REST API base if it should differ
     *                     from `slug` (defaults to the same value). List it
     *                     after `slug`: setting `slug` resets it.
     *   - menu_position   Where this post type sits in the wp-admin sidebar.
     *   - restrict_users  Array of role slugs allowed to manage this post
     *                     type in wp-admin (defaults to everyone).
     *
     * Example (Blog):
     *   return [
     *       'post_title'       => 'Title',
     *       'post_name'        => 'Title',
     *       'post_thumbnail'   => 'Image',
     *       'post_content'     => 'Content',
     *       'post_excerpt'     => 'Description',
     *       'slug'             => 'blog',
     *       'has_archive'      => TRUE,
     *       'seo' => [
     *           'title'       => 'Title',
     *           'image'       => 'SEO Image||Image',
     *           'description' => 'Description',
     *       ],
     *       'bonus_fields' => [
     *           'subject' => 'blog_subject',
     *           'region'  => 'blog_region',
     *       ],
     *       'hide_field'       => 'Hidden',
     *       'character_count'  => [ 'Page Title' => 60, 'Description' => 160 ],
     *       'schema' => [
     *           '@type'    => 'BlogPosting',
     *           'headline' => 'Title',
     *           'image'    => 'Image',
     *           'text'     => 'Content',
     *       ],
     *       'breadcrumbs' => [
     *           'Resources' => '/resources/',
     *           'Blog'      => '/blog/',
     *       ],
     *   ];
     */
    protected function settings(): array {
        return [];
    }

    /*
     * The actual custom fields, grouped into wp-admin meta boxes:
     *   [ 'Meta Box Name' => [ 'Field Label' => 'field_type', ... ], ... ]
     *
     * Each field's storage key is auto-derived as
     *   {meta_prefix}_{snake_case_label}
     * e.g. meta_prefix 'blog' + label 'SEO Image' -> 'blog_seo_image'.
     * (Mirrors devo_meta_field_key() on the JS side - see metaFieldKey() in
     * app/utils/helpers, used to read the same field from post.fields.)
     *
     * 'field_type' controls both the wp-admin input UI (DO_Form_Field_Display)
     * and how the value is serialized for the REST API (DO_Form_Field_API_Display).
     * Common types: text, varchar, textarea, wp_editor, html, media, binary,
     * date, url, select, select_multiple, cta, ctas, per_row, background,
     * gallery, post_browser. Full list: the private method names in
     * api/classes/class-form-field-display.php.
     *
     * Example (Blog):
     *   return [
     *       'Blog Post' => [
     *           'Title'         => 'text',
     *           'Image'         => 'media',
     *           'Image Credit'  => 'varchar',
     *           'SEO Image'     => 'media',
     *           'Description'   => 'html',
     *           'Content'       => 'wp_editor',
     *           'Author'        => 'varchar',
     *           'Hidden'        => 'binary',
     *       ],
     *       'Custom CTA' => [
     *           'Custom CTA Hide Panel' => 'binary',
     *           'Custom CTA'            => 'devo_cta_callback',
     *       ],
     *   ];
     */
    protected function meta_fields(): array {
        return [];
    }

    /*
     * Flat list of columns shown (and made sortable) in the wp-admin post
     * list table for this post type. Entries are either a meta field LABEL
     * from meta_fields() above, or one of the special native keywords
     * 'title', 'post_date', 'author' (matched literally, not converted to a
     * meta key).
     *
     * Example (Blog): return [ 'Title', 'Subject', 'Hidden', 'post_date' ];
     */
    protected function admin_fields(): array {
        return [];
    }
}
// Rename DO_POST_TYPE above (and here) to match, e.g. DO_Blog::get_instance().
// This runs once per request and registers the post type on `init`.
$devo_post_type = DO_POST_TYPE::get_instance();
