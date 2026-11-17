<?php
/*
 * Build JS components for use in Shortcodes
 */

/* Escapes a link target for an HTML attribute without assuming it's absolute.
 *
 * CTA links are often bare internal paths ("blog", "about/team"), which
 * esc_url() would turn into "http://blog". So only values with a scheme go
 * through esc_url() - which also drops javascript: and other unsafe
 * protocols - and everything else is attribute-escaped as a path. Entities
 * and whitespace are resolved first, so "javascript&#58;" or "java\tscript:"
 * can't slip past the scheme check. */
function devo_esc_link( $url ) {
    if ( ! is_scalar( $url ) ) {
        return '';
    }
    $url = trim( html_entity_decode( (string) $url, ENT_QUOTES | ENT_HTML5, 'UTF-8' ) );
    $compact = preg_replace( '/[\x00-\x20\x7f]+/', '', $url );
    if ( preg_match( '/^[a-z][a-z0-9+.\-]*:/i', $compact ) || strpos( $compact, '//' ) === 0 ) {
        return esc_url( $compact );
    }
    return esc_attr( $url );
}

/* Builds a <CTA> tag for the React front end to render. Every attribute is
 * escaped: the values come from shortcode attributes, which anyone who can
 * edit a post can write. */
function devo_cta( $text = FALSE, $url = FALSE, $settings = [] ) {
    $modal = isset( $settings['modal'] ) ? $settings['modal'] : FALSE;
    $modal_class = isset( $settings['modal_class'] ) ? $settings['modal_class'] : FALSE;
    $id = isset( $settings['id'] ) && $settings['id'] && strlen( $settings['id'] ) ? $settings['id'] : FALSE;
    $classes = isset( $settings['classes'] ) && (bool) $settings['classes'] ? ( is_array( $settings['classes'] ) ? implode( ' ', $settings['classes'] ) : $settings['classes'] ) : FALSE;
    $custom_attribute = isset( $settings['custom_attribute'] ) ? $settings['custom_attribute'] : FALSE;
    $target = isset( $settings['target'] ) ? $settings['target'] : FALSE;
    // onclick is no longer supported: it would put script in the page.

    // URLs may be bare paths, anchors, mailto: or tel: (see devo_esc_link()).
    $output = '<CTA url="' . ( $url ? devo_esc_link( $url ) : '' ) . '"';
    if ( $text ) {
        $output .= ' text="' . esc_attr( $text ) . '"';
    }
    if ( $modal ) {
        $output .= ' modal="' . esc_attr( $modal === TRUE ? 'true' : $modal ) . '"';
    }
    if ( $modal_class ) {
        $output .= ' modal_class="' . esc_attr( $modal_class ) . '"';
    }
    if ( $id ) {
        $output .= ' id="' . esc_attr( $id ) . '"';
    }
    if ( $classes ) {
        $output .= ' classes="' . esc_attr( $classes ) . '"';
    }
    if ( $custom_attribute ) {
        $output .= ' customAttribute="' . esc_attr( $custom_attribute ) . '"';
    }
    if ( $target ) {
        $output .= ' target="' . esc_attr( $target ) . '"';
    }
    $output .= '/>';

    return $output;
}

function devo_image( $image = FALSE, $size = 'full', $settings = [] ) {
    if ( ! $image ) {
        return;
    }
    $classes = isset( $settings['classes'] ) ? ( is_array( $settings['classes'] ) ? implode( ' ', $settings['classes'] ) : ( strlen( $settings['classes'] ) ? $settings['classes'] : FALSE ) ) : FALSE;
    $wrapper_data_attr = isset( $settings['wrapper_data_attr'] ) ? ( is_array( $settings['wrapper_data_attr'] ) ? implode( ' ', $settings['wrapper_data_attr'] ) : $settings['wrapper_data_attr'] ) : FALSE;
    $image_data_attr_array = isset( $settings['image_data_attr'] ) ? $settings['image_data_attr'] : FALSE;
    $overlay = isset( $settings['overlay'] ) ? $settings['overlay'] : FALSE;
    $lazy_load = isset( $settings['lazy_load'] ) ? $settings['lazy_load'] : TRUE;
    $output = '';
    if ( $image ) {
        $output .= '<Image image="' . esc_attr( $image ) . '"';
        $output .= ' size="' . esc_attr( $size ) . '"';
        if ( $classes ) {
            $output .= ' classes="' . esc_attr( $classes ) . '"';
        }
        if ( $wrapper_data_attr ) {
            $output .= ' wrapperDataAttr="' . esc_attr( $wrapper_data_attr ) . '"';
        }
        if ( $image_data_attr_array ) {
            $output .= ' imageDataAttr="' . esc_attr( is_array( $image_data_attr_array ) ? implode( ' ', $image_data_attr_array ) : $image_data_attr_array ) . '"';
        }
        if ( $overlay ) {
            $output .= ' overlay="' . esc_attr( $overlay ) . '"';
        }
        $output .= '/>';
    }
    return $output;
}

function devo_video( $video_url = FALSE, $settings = [] ) {
    if ( ! $video_url ) {
        return;
    }
    $echo = isset( $settings['echo'] ) ? $settings['echo'] : TRUE;
    $label = isset( $settings['label'] ) ? $settings['label'] : 'Watch';
    $width = isset( $settings['width'] ) ? $settings['width'] : FALSE;
    $loop = isset( $settings['loop'] ) ? $settings['loop'] : FALSE;
    $timestamp = isset( $settings['timestamp'] ) ? $settings['timestamp'] : FALSE;
    $player_number = isset( $settings['player_number'] ) ? $settings['player_number'] : rand( 0, 999 );
    $type = devo_video_type( $video_url );
    $source = $type == 'streaming' ? ( strpos( $video_url, 'vimeo' ) !== FALSE ? 'vimeo' : 'youtube' ) : FALSE;
    $video_embed_url = devo_video_embed_url( $video_url );
    $webm = $type == 'embed' && strlen( locate_template( str_replace( get_template_directory_uri() . '/', '', $webm_file = str_replace( '.mp4', '.webm', $video_url ) ) ) ) ? $webm_file : FALSE;
    $poster = $type == 'embed' && strlen( locate_template( str_replace( get_template_directory_uri() . '/', '', $poster_file = str_replace( '.mp4', '.jpg', $video_url ) ) ) ) ? $poster_file : '';
    $video_data_attr_array = isset( $settings['video_data_attr'] ) ? $settings['video_data_attr'] : FALSE;
    $video_data_attr = [];
    if ( $video_data_attr_array ) {
        foreach ( $video_data_attr_array as $attr_key => $attr_value ) {
            $attr_key = preg_replace( '/[^a-z0-9_\-]/', '', strtolower( (string) $attr_key ) );
            if ( strlen( $attr_key ) && strpos( $attr_key, 'on' ) !== 0 ) {
                $video_data_attr[] = ' ' . $attr_key . '="' . esc_attr( $attr_value ) . '"';
            }
        }
    }
    ob_start(); ?>
    <figure class="devo-video <?php echo esc_attr( $type ) ?>"<?php echo $width ? ' style="max-width: ' . esc_attr( $width ) . '"' : '' ?><?php echo implode( '', $video_data_attr ) ?>>
        <span class="devo-video-wrapper">
            <?php if ( $type == 'streaming' ) : ?>
                <?php if ( $source == 'vimeo' ) :
                    $site_language = substr( get_bloginfo( 'language' ), 0, 2 );
                    // SDK does not currently seem to support timestamps
                    if ( $timestamp ) : ?>
                        <iframe id="video-player-<?php echo esc_attr( $player_number ) ?>"
                            data-video-index="0"
                            data-player-number="<?php echo esc_attr( $player_number ) ?>"
                            src="<?php echo esc_url( $video_embed_url . ( $site_language !== 'en' ? '&texttrack=' . rawurlencode( $site_language ) : '' ) . ( $timestamp ? '#t=' . rawurlencode( $timestamp ) : '' ) ) ?>">
                        </iframe>
                    <?php else :
                        // Uses the Vimeo player SDK (initialized through the data-vimeo-url attribute) ?>
                        <div id="video-player-<?php echo esc_attr( $player_number ) ?>"
                            data-video-index="0"
                            data-player-number="<?php echo esc_attr( $player_number ) ?>"
                            data-video-url="<?php echo esc_url( $video_embed_url . ( $timestamp ? '#t=' . rawurlencode( $timestamp ) : '' ) ) ?>"
                            data-video-t="<?php echo esc_attr( $timestamp ? '#t=' . $timestamp : '' ) ?>"
                            <?php if ( $site_language !== 'en' ) : ?>
                                data-video-texttrack="<?php echo esc_attr( $site_language ) ?>"
                            <?php endif; ?>
                            class="video-player"></div>
                        <?php endif; ?>
                <?php else : ?>
                    <iframe src="" data-src="<?php echo esc_url( $video_embed_url ) ?>" title="<?php echo esc_attr( $label ) ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
                        <a href="<?php echo esc_url( $video_embed_url ) ?>" target="_blank" title="<?php echo esc_attr( $label ) ?>"><?php echo esc_html( $label ) ?></a>
                    </iframe>
                <?php endif; ?>
            <?php elseif ( $type == 'embed' ) : ?>
                <video autoPlay muted playsInline<?php echo $loop ? ' loop' : '' ?> poster="<?php echo esc_url( $poster ) ?>">
                    <source data-src="<?php echo esc_url( $video_url ) ?>" type="video/mp4">
                    <?php if ( $webm ) : ?>
                        <source data-src="<?php echo esc_url( $webm ) ?>" type="video/webm">
                    <?php endif; ?>
                </video>
            <?php endif; ?>
        </span>
    </figure>
    <?php
    $output = ob_get_contents();
    ob_end_clean();
    if ( $echo ) {
        echo $output;
    } else {
        return $output;
    }
}