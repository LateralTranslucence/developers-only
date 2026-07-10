
var binary_toggle = function(e) {
        var $this = jQuery(this);
        e.preventDefault();
        var post_id = $this.parents('tr').attr('id');
        post_id = post_id.replace('post-', '');
        var meta_key_string = $this.parents('td').attr('class');
        var meta_key_array = meta_key_string.split(' ');
        var meta_key = meta_key_array[0];
        var image_src_string = $this.find('img').attr('src');
        var image_src_array = image_src_string.split('/');
        var image_location = image_src_string.replace(image_src_array[image_src_array.length - 1], '');
        if($this.hasClass('binary-true')) {
            jQuery.ajax({
                url: window.homeURL + '/update-meta-field/' + post_id + '/' + meta_key + '/empty/',
                success: function(data) {
                    if(data == 'true') {
                        $this.removeClass('binary-true').addClass('binary-false');
                        $this.find('img').attr('src', image_location + 'binary-empty.png');
                    }
                }
            });
        } else {
            jQuery.ajax({
                url: window.homeURL + '/update-meta-field/' + post_id + '/' + meta_key + '/true/',
                success: function(data) {
                    if(data == 'true') {
                        $this.removeClass('binary-false').addClass('binary-true');
                        $this.find('img').attr('src', image_location + 'binary-true.png');
                    }
                }
            });
            
        }
};

jQuery(document).ready(function($) {
    $('a.devo-binary-toggle').on('click', binary_toggle);
});