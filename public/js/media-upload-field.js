/*
 * Attaches the media uploader to the input field
 * Slightly modified from http://stackoverflow.com/q/13847714
 */

var delete_button = function($obj) {
    $obj.each(function() {
        let $this = jQuery(this);
        if(!$this.find('span.delete-image').length) {
            $this.append('<span class="delete-image">X</span>');
        }
    });
};
var delete_action = function(e, mode) {
    var $preview_wrapper = jQuery(e.target).parents('span.media-upload-preview-wrapper');
    if(mode == 'gallery') {
        $preview_wrapper.remove();
    } else {
        $preview_wrapper.siblings('input.media-upload-field').val('');
        $preview_wrapper.remove();
    }
};

var admin_media_click_events = function() {
    window.wpActiveEditor = null;
    // Gallery
    jQuery(document).on('click', 'a.media-upload-button-gallery', function() {
        var $previews_wrapper = jQuery(this).parent().siblings('span.previews');
        var $preview_image = $previews_wrapper.find('img.media-upload-preview');
        var $attachments = $previews_wrapper.find('span.media-upload-preview-wrapper');
        var field_name = jQuery(this).attr('name');
        var send_meta_attachment = wp.media.editor.send.attachment;
        wp.media.editor.send.attachment = function(props, attachment) {
            if ($previews_wrapper.parents('div.gallery-wrapper').hasClass('gallery')) {
                var newImage = '<span class="media-upload-preview-wrapper">';
                newImage += '<img src="' + attachment.url + '" height="100" class="media-upload-preview">';
                newImage += '<input type="hidden" class="media-upload-field" name="' + field_name + '[' + $attachments.length + ']" id="'+ field_name +'[' + $attachments.length + ']" value="'+ attachment.id +'">';
                newImage += '</span>';
            } else {
                var newImage = '<span class="media-upload-preview-wrapper">';
                newImage += attachment.filename;
                newImage += '<input type="hidden" class="media-upload-field" name="' + field_name + '[' + $attachments.length + ']" id="'+ field_name +'[' + $attachments.length + ']" value="'+ attachment.id +'">';
                newImage += '</span>';
            }
            if($attachments.length) {
               $attachments.last().after(newImage);
            } else {
                $previews_wrapper.prepend(newImage);
            }
            delete_button(jQuery('span.media-upload-preview-wrapper'));
            wp.media.editor.send.attachment = send_meta_attachment;
        };
        wp.media.editor.open();
        return false;       
    });
    // Image
    jQuery(document).on('click', 'a.media-upload-button-image:not(.icon)', function() {
        $this = jQuery(this);
        var $preview_image = $this.siblings('span.media-upload-preview-wrapper').find('img.media-upload-preview');
        var $image_url_field = $this.siblings('input.media-upload-field');
        var send_meta_attachment = wp.media.editor.send.attachment;
        wp.media.editor.send.attachment = function(props, attachment) {
            if( $image_url_field.hasClass('media')) {            
                if($preview_image.length) {
                    $preview_image.attr('src', attachment.url);
                } else {
                    $this.after('<br><span class="media-upload-preview-wrapper"><img src="' + attachment.url + '" height="100" class="media-upload-preview"></span>');
                }
            }
            delete_button(jQuery('span.media-upload-preview-wrapper'));
            //console.log(attachment);
            $image_url_field.attr('value', attachment.url);
            $image_url_field.val(attachment.url);
            wp.media.editor.send.attachment = send_meta_attachment;
        };
        wp.media.editor.open();
        return false;       
    });
    
    // Icon
    jQuery(document).on('click', 'a.media-upload-button-image.icon', function() {
        var $field = jQuery(this).siblings('input.media-upload-field');

        var frame = wp.media({
            frame: 'post',
            state: 'icons',
            title: 'Icon Library',
            button: { text: 'Select Icon' },
            multiple: false,
        });

        frame.on('insert select', function() {
            var selection = frame.state().get('selection');
            if ( selection && selection.length ) {
                $field.val( selection.first().toJSON().url );
            }
        });

        frame.open();
        return false;
    });

    // Delete Button
    delete_button(jQuery('span.media-upload-preview-wrapper'));
    jQuery(document).on('click', 'span.delete-image', function(e) {
        var mode = jQuery(this).parents('div.gallery-wrapper').length ? 'gallery' : 'media';
        delete_action(e, mode);
    });
    
    jQuery('.previews').sortable();
    jQuery('.previews').disableSelection();
};

jQuery(document).ready(function($) {
    //console.log($('media-upload-preview-wrapper').html());
    admin_media_click_events();
});