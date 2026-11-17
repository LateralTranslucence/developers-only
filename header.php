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
// If there's a post now, produce some fields
if ( $post && isset( $devo_custom_post_types[ $post->post_type ] ) ) :
    $post_type_details = $devo_custom_post_types[ $post->post_type ];
    $post_type_label = isset( $post_type_details->post_type_display_name ) ? $post_type_details->post_type_display_name : '';
    $seo_title = isset( $post_type_details->seo_title ) ? devo_get_seo_field_value( $post_type_details->seo_title, $post ) : '';
    $og_image = get_stylesheet_directory_uri() . '/public/images/og-image.png';
    $image = isset( $post_type_details->seo_image ) && $post_type_details->seo_image && strlen( $post_seo_image = devo_get_seo_field_value( $post_type_details->seo_image, $post ) ) ? $post_seo_image : $og_image;
    $seo_image = is_array( $image ) && count( $image ) && isset( $image['cinema_600'] ) ? $image['cinema_600']['url'] : ( is_array( $image ) ? $og_image : $image );
    $seo_url = esc_attr( home_url( trim( devo_get_relative_permalink( $post->ID ), '/' ) . '/' ) );
    $seo_description = isset( $post_type_details->seo_description ) ? esc_attr( devo_get_seo_field_value( $post_type_details->seo_description, $post ) ) : '';
    $seo_locale = esc_attr( get_locale() );
    $seo_site_name = esc_attr( get_bloginfo( 'name' ) );
    $noindex = devo_noindex();
    $schema = devo_get_schema( $post_type_details->schema, $post );
    $publish_date = date( 'Y-m-d', strtotime( get_post_field( 'post_date', $post->ID ) ) );
    $content = get_post_field( 'post_content', $post->ID );
    ?>
    <?php // <title> is rendered by WordPress via title-tag support; the SEO
          // title is supplied by devo_document_title() in functions.php. ?>
    <link rel="canonical" href="<?php echo $seo_url ?>" data-react-helmet="true" />
    <meta property="og:locale" content="<?php echo $seo_locale ?>" data-react-helmet="true" />
    <meta property="og:type" content="website" data-react-helmet="true" />
    <meta property="og:title" content="<?php echo $seo_title ?>" data-react-helmet="true" />
    <meta property="og:description" content="<?php echo $seo_description ?>" data-react-helmet="true" />
    <meta name="description" content="<?php echo $seo_description ?>" data-react-helmet="true" />
    <meta property="og:url" content="<?php echo $seo_url ?>" data-react-helmet="true" />
    <meta property="og:site_name" content="<?php echo $seo_site_name ?>" data-react-helmet="true" />
    <meta property="og:image" content="<?php echo $seo_image ?>" data-react-helmet="true" />
    <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
    <meta name="robots" content="<?php echo $noindex ?>" data-react-helmet="true" />
    <script type="application/ld+json" data-react-helmet="true">
        <?php echo json_encode( $schema ) ?>
    </script>
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
