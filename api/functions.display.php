<?php
/*
 * Build JS components for use in Shortcodes
 */

function devo_cta( $text = FALSE, $url = FALSE, $settings = [] ) {
    $modal = isset( $settings['modal'] ) ? $settings['modal'] : FALSE;
    $modal_class = isset( $settings['modal_class'] ) ? $settings['modal_class'] : FALSE;
    $iframe_name = isset( $settings['iframe_name'] ) ? $settings['iframe_name'] : FALSE;
    $id = isset( $settings['id'] ) && $settings['id'] && strlen( $settings['id'] ) ? $settings['id'] : FALSE;
    $classes = isset( $settings['classes'] ) && (bool) $settings['classes'] ? ( is_array( $settings['classes'] ) ? implode( ' ', $settings['classes'] ) : $settings['classes'] ) : FALSE;
    $onClick = isset( $settings['onclick'] ) ? $settings['onclick'] : FALSE;
    $custom_attribute = isset( $settings['custom_attribute'] ) ? $settings['custom_attribute'] : FALSE;
    $target = isset( $settings['target'] ) ? $settings['target'] : FALSE;

    $output = '<CTA url="' . ( $url ? $url : '' ) . '"';
    if ( $text ) {
        $output .= 'text="' . $text . '"';
    }
    if ( $modal ) {
        $output .= 'modal="' . $modal . '"';
    }
    if ( $modal_class ) {
        $output .= 'modal_class="' . $modal_class . '"';
    }
    if ( $id ) {
        $output .= 'id="' . $id . '"';
    }
    if ( $classes ) {
        $output .= 'classes="' . $classes . '"';
    }
    if ( $onClick ) {
        $output .= 'onClick="' . $onClick . '"';
    }
    if ( $custom_attribute ) {
        $output .= 'customAttribute="' . $custom_attribute . '"';
    }
    if ( $target ) {
        $output .= 'target="' . $target . '"';
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
        $output .= '<Image image="' . $image . '"';
        $output .= 'size="' . $size . '"';
        if ( $classes ) {
            $output .= 'classes="' . $classes . '"';
        }
        if ( $wrapper_data_attr ) {
            $output .= 'wrapperDataAttr="' . $wrapper_data_attr . '"';
        }
        if ( $image_data_attr_array ) {
            $output .= 'imageDataAttr="' . $image_data_attr_array . '"';
        }
        if ( $overlay ) {
            $output .= 'overlay="' . $overlay . '"';
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
            $video_data_attr[] = ' ' . $attr_key . '="' . $attr_value . '"';
        }
    }
    ob_start(); ?>
    <figure class="devo-video <?php echo $type ?>"<?php echo $width ? ' style="max-width: ' . $width . '"' : '' ?><?php echo implode( '', $video_data_attr ) ?>>
        <span class="devo-video-wrapper">
            <?php if ( $type == 'streaming' ) : ?>
                <?php if ( $source == 'vimeo' ) :
                    $site_language = substr( get_bloginfo( 'language' ), 0, 2 );
                    // SDK does not currently seem to support timestamps
                    if ( $timestamp ) : ?>
                        <iframe id="video-player-<?php echo esc_attr( $player_number ) ?>"
                            data-video-index="0"
                            data-player-number="<?php echo esc_attr( $player_number ) ?>"
                            src="<?php echo esc_attr( $video_embed_url ) . ( $site_language !== 'en' ? '&texttrack=' . $site_language : '' ) . ( $timestamp ? '#t=' . $timestamp : '' ) ?>">
                        </iframe>
                    <?php else :
                        // Uses the Vimeo player SDK (initialized through the data-vimeo-url attribute) ?>
                        <div id="video-player-<?php echo esc_attr( $player_number ) ?>"
                            data-video-index="0"
                            data-player-number="<?php echo esc_attr( $player_number ) ?>"
                            data-video-url="<?php echo esc_attr( $video_embed_url ) . ( $timestamp ? '#t=' . $timestamp : '' ) ?>"
                            data-video-t="<?php echo ( $timestamp ? '#t=' . $timestamp : '' ) ?>"
                            <?php if ( $site_language !== 'en' ) : ?>
                                data-video-texttrack="<?php echo $site_language ?>"
                            <?php endif; ?>
                            class="video-player"></div>
                        <?php endif; ?>
                <?php else : ?>
                    <iframe src="" data-src="<?php echo $video_embed_url ?>" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>
                        <a href="<?php echo $video_embed_url ?>" target="_blank" title="<?php echo $label ?>"><?php echo $label ?></a>
                    </iframe>
                <?php endif; ?>
            <?php elseif ( $type == 'embed' ) : ?>
                <video autoPlay muted playsInline<?php echo $loop ? ' loop' : '' ?> poster="<?php echo $poster ?>">
                    <source data-src="<?php echo $video_url ?>" type="video/mp4">
                    <?php if ( $webm ) : ?>
                        <source data-src="<?php echo $webm ?>" type="video/webm">
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