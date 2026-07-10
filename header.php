<?php
/*
 * HEADER
 *
 */
?>
<!DOCTYPE html>
<html <?php language_attributes() ?> data-theme="light">
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
    $og_image = get_stylesheet_directory_uri() . '/public/images/og-image.jpg';
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
// If there's still no post, just show a title
else : ?>
    <title>{DevelopersOnly}</title>
<?php endif; ?>
<?php wp_head(); ?>

<?php if ( DO_ENVIRONMENT == 'prod' ) : ?>
    <!-- Google Tag Manager -->
    <meta name="google-site-verification" content="sIIblhof2iVPtZYF2dA7_GUbot9ZXpZP6KIocWi8q2E" />
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-PJ878CTW');</script>
    <!-- End Google Tag Manager -->
<?php endif; ?>
