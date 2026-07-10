<?php
/*
 * Short codes
 */

// [button][/button]
function devo_button_shortcode( $attr, $content ) {
    if ( ! is_assoc_array( $attr ) ) {
        $attr_temp = [];
        foreach ( $attr as $index => $attribute ) {
            //devo_var_dump($attribute);
            [ $key, $value ] = explode( '=', $attribute );
            $attr_temp[ $key ] = trim( $value, '"' );
        }
        $attr = $attr_temp;
    }
    $attributes = shortcode_atts( [
        'href' => FALSE,
        'class' => FALSE,
        'modal' => FALSE,
        'modal-class' => FALSE,
        'id' => FALSE,
        'onclick' => FALSE,
    ], $attr, 'button' );

    $href = $attributes['href'];
    $classes = $attributes['class'] && strlen( $attributes['class'] ) ? [ $attributes['class'] ] : 'solid-button';
    $modal = $attributes['modal'] === 'true';
    $modal_class = $attributes['modal-class'];
    $id = $attributes['href'];
    $onclick = $attributes['onclick'];

    $output = devo_cta( $content, $href, [ 'modal' => $modal, 'modal_class' => $modal_class, 'classes' => $classes, 'id' => $id, 'onclick' => $onclick ] );
    //$output = str_replace( "\n", '', $output );

    return $output;
}
add_shortcode( 'button', 'devo_button_shortcode' );

// [dropdown][/dropdown]
// ex:
// [dropdown title="Learn More"]
// Providers, #providers
// Health Plans, #health-plans
// Patient Services, #patient-services
// Pharmacies and Labs, #pharmacies-and-labs
// [/dropdown]
function devo_dropdown_button_shortcode( $atts, $content = null ) {
    $attributes = shortcode_atts( [
        'title' => FALSE,
    ], $atts, 'dropdown' );
	$dropdown_title = $attributes['title'];
    if ( ! $dropdown_title || ! $content ) {
        return;
    }
    $dropdown_items_raw = explode( "\n", $content );
    $dropdown_items = [];
    foreach ( $dropdown_items_raw as $dropdown_item_raw ) {
        $dropdown_item_raw = trim( $dropdown_item_raw );
        if ( strlen( $dropdown_item_raw ) ) {
            $dropdown_items[] = $dropdown_item_raw;
        }
    }
    $output = '<nav class="dropdown">';
    $output .= '<p><button class="button color-border"><span>' . $dropdown_title . '</span></button></p>';
    $output .= '<ul class="dropdown-content">';
    foreach( $dropdown_items as $dropdown_item ) {
        $item = explode( ',', $dropdown_item );
        $item_label = isset( $item[0] ) ? trim( $item[0] ) : '';
        $item_link = isset( $item[1] ) ? str_replace( '<br />', '', trim( $item[1] ) ) : '#';
        $output .= '<li><a href="' . $item_link . '">' . $item_label . '</a></li>';
    }
    $output .= '</ul>';
    $output .= '</nav>';
    return $output;
}
add_shortcode( 'dropdown', 'devo_dropdown_button_shortcode' );

// [iframe]
function devo_iframe_shortcode( $attr, $content = null ) {
    $attributes = shortcode_atts(
		[
			'align' => false,
			'frameborder' => false,
			'height' => false,
			'longdesc' => false,
			'marginheight' => false,
			'marginwidth' => false,
			'name' => false,
			'sandbox' => false,
			'scrolling' => false,
			'seamless' => false,
			'src' => false,
			'srcdoc' => false,
			'width' => false,
			'class' => false,
			'id' => false,
			'style' => false,
			'data-src' => false
		], $attr, 'iframe'
	);
	// open iframe
	$output = '<iframe ';
	// assemble attributes
	foreach ( $attributes as $name => $att ) {
		if ( $att !== false ) {
			$output .= $name . '="' . $att . '" ';
		}
	}
	// close bracket
	$output .= '>';
	// alt content
	if ( $content ) {
		$output .= $content;
	}
	// close iframe
	$output .= '</iframe>';

    return $output;
}
add_shortcode( 'iframe', 'devo_iframe_shortcode' );

// [menu]
function devo_menu_shortcode( $attr ) {
    $attributes = shortcode_atts(
        [
            'name' => FALSE,
            'wrap' => TRUE,
            'exclude' => FALSE,
        ],
        $attr, 'menu'
    );
    $name = $attributes['name'];
    $wrap = $attributes['wrap'] === 'false' ? FALSE : TRUE;
    $exclude = $attributes['exclude'] ? explode( ';', $attributes['exclude'] ) : [];

    // If no menu, return
    if ( ! $name ) {
        return;
    }

    // Build custom menu structure
    $args = [
        'order' => 'ASC',
        'orderby' => 'menu_order'
    ];
    $menu_items = wp_get_nav_menu_items( $name, $args );
    $ul_wrap = $wrap ? $menu_items : FALSE;
    $output = '';
    // wrap?
    if ( $ul_wrap ) {
        $output .= '<ul id="menu-' . $name . '" class="menu">';
    }
    // If there is a menu, build it
    if ( $menu_items ) {
        foreach ( $menu_items as $key => $item ) {
            if ( ! in_array( $item->title, $exclude ) ) {
                $output .= '<li class="' . implode( ' ', $item->classes ) . '"><a href="' . $item->url . '">' . $item->title . '</a></li>';
            }
        }
    }
    // close wrap?
    if ( $ul_wrap ) {
        $output .= '</ul>';
    }

    return $output;
}
add_shortcode( 'menu', 'devo_menu_shortcode' );

// [quote]
function devo_quote_shortcode( $attr, $content = null ) {
	if ( $content == null ) {
		return;
	}
	$output = '<blockquote>' . $content . '</blockquote>';
	return $output;
}
add_shortcode( 'quote', 'devo_quote_shortcode' );

// [social_media]
function devo_social_media_shortcode() {
    return '<SocialMenu />';
}
add_shortcode( 'social_media', 'devo_social_media_shortcode' );

// [url]
function devo_url_shortcode( $attr ) {
    $url = home_url() . $_SERVER['REQUEST_URI'];
    return $url;
}
add_shortcode( 'url', 'devo_url_shortcode' );

// [video]
function devo_video_shortcode( $attr, $content = NULL ) {
	$attributes = shortcode_atts( [
        'url' => FALSE,
        'width' => FALSE,
    ], $attr, 'video' );

    $video_url = $attributes['url'];
    $video_width = $attributes['width'];
    ob_start();
    devo_video( $video_url, [ 'label' => 'Watch', 'width' => $video_width ] );
    $output = ob_get_contents();
    ob_end_clean();
    return $output;
}
add_shortcode( 'video', 'devo_video_shortcode' );

/* Fixes common shortcode bugs */

// Prevents empty p tags in shortcodes
remove_filter( 'the_content', 'wpautop' );
add_filter( 'the_content', 'wpautop' , 99 );
add_filter( 'the_content', 'shortcode_unautop', 100 );

// Execute shortcodes in widgets
add_filter( 'widget_text', 'do_shortcode' );

// Removes extra p tags from nested shortcodes
function devo_shortcode_empty_paragraph_fix( $content ) {
    $replace = [
        '<p>[' => '[',
        ']</p>' => ']',
        ']<br />' => ']',
    ];
    $content = strtr( $content, $replace );
    return $content;
}
add_filter( 'the_content', 'devo_shortcode_empty_paragraph_fix' );
