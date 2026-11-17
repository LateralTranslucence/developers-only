<?php
/*
 * HEADER
 *
 */
?>
<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="<?php bloginfo( 'charset' ) ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php // Hide the browser UI ?>
<meta name="apple-mobile-web-app-capable" content="yes">

<?php
// Set initial SEO meta fields
global $devo_custom_post_types, $post, $wp;
// If no post object, try to find one
if ( ! $post ) {
    $post_array = get_posts( [ 'name' => strlen( $wp->request ) ? $wp->request : 'home', 'post_type' => 'devo_landing_page' ] );
    $post = current( $post_array );
}
// If there's a post now, produce some fields. devo_seo_data() returns raw
// text, so everything is escaped here for its context.
if ( $post && isset( $devo_custom_post_types[ $post->post_type ] ) ) :
    $seo = devo_seo_data( $post, $devo_custom_post_types[ $post->post_type ] );
    ?>
    <?php // <title> is rendered by WordPress via title-tag support; the SEO
          // title is supplied by devo_document_title() in functions.php. ?>
    <link rel="canonical" href="<?php echo esc_url( $seo['seo_url'] ) ?>" data-react-helmet="true" />
    <meta property="og:locale" content="<?php echo esc_attr( $seo['seo_locale'] ) ?>" data-react-helmet="true" />
    <meta property="og:type" content="website" data-react-helmet="true" />
    <meta property="og:title" content="<?php echo esc_attr( $seo['seo_title_plain'] ) ?>" data-react-helmet="true" />
    <meta property="og:description" content="<?php echo esc_attr( $seo['seo_description'] ) ?>" data-react-helmet="true" />
    <meta name="description" content="<?php echo esc_attr( $seo['seo_description'] ) ?>" data-react-helmet="true" />
    <meta property="og:url" content="<?php echo esc_url( $seo['seo_url'] ) ?>" data-react-helmet="true" />
    <meta property="og:site_name" content="<?php echo esc_attr( $seo['seo_site_name'] ) ?>" data-react-helmet="true" />
    <meta property="og:image" content="<?php echo esc_url( $seo['seo_image'] ) ?>" data-react-helmet="true" />
    <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
    <meta name="robots" content="<?php echo esc_attr( $seo['noindex'] ) ?>" data-react-helmet="true" />
    <?php // JSON_HEX_TAG keeps a "</script>" inside a value from closing the element ?>
    <script type="application/ld+json" data-react-helmet="true"><?php echo wp_json_encode( $seo['schema'], JSON_HEX_TAG | JSON_UNESCAPED_SLASHES ) ?></script>
<?php
// No post: WordPress falls back to the site title on its own.
endif; ?>
<?php wp_head(); ?>

</head>
<body <?php body_class() ?>>
<?php
// Required since WP 5.2: the hook plugins use to inject markup at the top of
// <body>. Also where core adds the admin bar's markup dependencies.
wp_body_open();
?>
