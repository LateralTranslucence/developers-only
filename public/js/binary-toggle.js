/*
 * Binary (true/false) fields shown as admin list columns can be flipped in
 * place. The button carries the post ID, meta key and a per-post nonce; the
 * devo_binary_toggle admin-ajax action (DO_Custom_Post_Type::ajax_binary_toggle)
 * checks the nonce, the user's capability and that the key is one of the post
 * type's binary columns before saving.
 */
jQuery( function( $ ) {
    $( document ).on( 'click', 'button.devo-binary-toggle', function( e ) {
        e.preventDefault();
        var $button = $( this );
        if ( $button.prop( 'disabled' ) ) {
            return;
        }
        var turnOn = ! $button.hasClass( 'binary-true' );
        var $image = $button.find( 'img' );
        var imageSrc = $image.attr( 'src' ) || '';
        var imageDirectory = imageSrc.substring( 0, imageSrc.lastIndexOf( '/' ) + 1 );

        $button.prop( 'disabled', true );
        $.post( window.ajaxurl, {
            action: 'devo_binary_toggle',
            post_id: $button.data( 'post-id' ),
            meta_key: $button.data( 'meta-key' ),
            nonce: $button.data( 'nonce' ),
            value: turnOn ? 1 : 0
        } ).done( function( response ) {
            if ( ! response || ! response.success ) {
                return;
            }
            var isOn = !! response.data.value;
            $button
                .toggleClass( 'binary-true', isOn )
                .toggleClass( 'binary-false', ! isOn )
                .attr( 'aria-pressed', isOn ? 'true' : 'false' );
            $image.attr( 'src', imageDirectory + ( isOn ? 'binary-true.png' : 'binary-empty.png' ) );
        } ).always( function() {
            $button.prop( 'disabled', false );
        } );
    } );
} );
