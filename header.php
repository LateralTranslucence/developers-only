<?php
/*
 * HEADER
 *
 */
?>
<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
<?php // Template debugger ?>
<?php if ( in_array( DO_ENVIRONMENT, [ 'local', 'dev', 'stg' ] ) ) : ?>
    <?php do_debug_page_request() ?>
<?php endif; ?>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta charset="<?php bloginfo( 'charset' ) ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php // Hide the browser UI ?>
<meta name="apple-mobile-web-app-capable" content="yes">
<?php // FAVICONS from https://www.emergeinteractive.com/insights/detail/the-essentials-of-favicons/ ?>
<?php // Generics ?>
<?php /*
<link rel="icon" sizes="32x32" type="image/png" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/32x32.png">
<link rel="icon" sizes="57x57" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/57x57.png">
<link rel="icon" sizes="76x76" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/76x76.png">
<link rel="icon" sizes="96x96" type="image/png" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/96x96.png">
<link rel="icon" sizes="128x128" type="image/png" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/128x128.png">
<link rel="icon" sizes="192x192" type="image/png" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/192x192.png">
<link rel="icon" sizes="228x228" type="image/png" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/228x228.png">
<?php // Android ?>
<link rel="shortcut icon" sizes="196x196" type="image/png" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/196x196.png">
<?php // iOS ?>
<link rel="apple-touch-icon" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="120x120" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/120x120.png">
<link rel="apple-touch-icon" sizes="152x152" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/180x180.png">
<?php // Windows 8 IE 10 ?>
<meta name="msapplication-TileColor" content="#000000">
<meta name="msapplication-TileImage" content="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/144x144.png">
<?php // Windows 8.1 + IE11 and above ?>
<meta name="msapplication-config" content="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/browserconfig.xml" />
<?php // Manifest ?>
<link rel="manifest" href="<?php echo get_stylesheet_directory_uri() ?>/assets/images/favicons/manifest.json">
*/?>
<?php 
// Set initial SEO meta fields
global $do_custom_post_types, $post, $wp;
// If no post object, try to find one
if ( ! $post ) {
    $post_array = get_posts( [ 'name' => strlen( $wp->request ) ? $wp->request : 'home', 'post_type' => 'do_landing_page' ] );
    $post = current( $post_array );
}
// If there's a post now, produce some fields
if ( $post && isset( $do_custom_post_types[ $post->post_type ] ) ) {
    $post_type_details = $do_custom_post_types[ $post->post_type ];
    $post_type_label = isset( $post_type_details->post_type_display_name ) ? $post_type_details->post_type_display_name : '';
    $seo_title = isset( $post_type_details->seo_title ) ? do_get_seo_field_value( $post_type_details->seo_title, $post ) : '';
    $og_image = get_stylesheet_directory_uri() . '/assets/images/og-image.jpg';
    $image = isset( $post_type_details->seo_image ) && $post_type_details->seo_image && strlen( $post_seo_image = do_get_seo_field_value( $post_type_details->seo_image, $post ) ) ? $post_seo_image : $og_image;
    $seo_image = is_array( $image ) && count( $image ) && isset( $image['cinema_600'] ) ? $image['cinema_600']['url'] : ( is_array( $image ) ? $og_image : $image );
    $seo_url = esc_attr( home_url( trim( do_get_relative_permalink( $post->ID ), '/' ) . '/' ) );
    $seo_description = isset( $post_type_details->seo_description ) ? esc_attr( do_get_seo_field_value( $post_type_details->seo_description, $post ) ) : '';
    $seo_locale = esc_attr( get_locale() );
    $seo_site_name = esc_attr( get_bloginfo( 'name' ) );
    $noindex = do_noindex();
    $schema = do_get_schema( $post_type_details->schema, $post );
    $publish_date = date( 'Y-m-d', strtotime( get_post_field( 'post_date', $post->ID ) ) );
    $content = get_post_field( 'post_content', $post->ID );
    ?>
    <title><?php echo $seo_title . ( strlen( $post_type_label ) ? ' - ' . $post_type_label : '' ) ?></title>
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
} 
// If there's still no post, just show a title
else { ?>
    <title>{DevelopersOnly}</title>
<?php }
wp_head(); ?>

<?php if ( DO_ENVIRONMENT == 'prod' ) : ?>
    <?php include( locate_template( 'inc/ga-script.php' ) ) ?>
<?php endif; ?>
</head>