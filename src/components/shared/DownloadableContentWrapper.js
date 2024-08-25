// TODO

//import { DO_Downloadable_Contact_Button } from 'src/utils/display.js';

export default function DownloadableContentWrapper( props ) {
    return null;
}

/*
<?php
// For the do-downloadable toolbar
global $do_forms, $do_content_survey;
wp_localize_script( 'do-display', 'downloadable', [
    'contact' => '<div class="do-downloadable-contact-button-wrapper">' .
            do_cta( 'Contact Us', 'iframe/contact', [
                'modal' => FALSE, 
                'classes' => [ 'button', 'blue' ], 
                'target' => 'do-downloadable-iframe', 
                'id' => 'downloadable-contact-button',
                'echo' => FALSE
            ] ) . 
        '</div>',
    'site_updates' => $do_forms->display( 'site-updates-subscribe', FALSE, 'do-downloadable-iframe' ),
    'survey' => $do_content_survey->display( isset( $post_id ) ? $post_id : $lp_post_id ),
] );
*/