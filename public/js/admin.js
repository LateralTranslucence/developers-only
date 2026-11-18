'use strict';

/* Character Count */

const character_counter = function() {
    jQuery('.count-characters').each(function(i) {
        // Set the initial values
        const $this = jQuery(this);
        const $field = $this.find('input, textarea');
        const $count_info = $this.find('.character-count-info');
        const $count_status = $count_info.find('.status');
        const $count_status_number = $count_status.find('.number');
        const character_limit = Number($this.attr('data-character-limit'));
        const current_count = $field.val().length;
        // Show how many character are remaining
        $count_status_number.text(character_limit - current_count);
        // Set a class for over or under the limit (equal to the limit is the same as under)
        $count_status.addClass(current_count > character_limit ? 'over' : 'under');
        // Update the values as user types
        $field.on('keyup', function(e) {
            const new_current_count = jQuery(this).val().length;
            // Update the number of characters remaining
            $count_status_number.text(character_limit - new_current_count);
            // Remove the over/under class, then put is back based on current numbers
            $count_status.removeClass(['over', 'under']);
            $count_status.addClass(new_current_count > character_limit ? 'over' : 'under');
        });
    });
}
jQuery(document).ready(function($) {
    //$(window).on('load', function(e) {
    	character_counter();
    //});
});

/* Dynamic Interface */

const devo_disabled = function() {
    jQuery('.devo-disabled').each(function(i) {
        const $this = jQuery(this);
        const $children = ! $this.is('select') ? $this.children() : [];
        let value;
        let name;
    	if ($children.length) {
    		const vals = [];
    		$children.each(function(i) {
    			if(jQuery(this).is(':checked')) {
    				vals.push(jQuery(this).val());
    			}
    		});
    		value = vals.join(';');
    		name = $this.attr('name').replace('[]', '');
        } else {
    		value = $this.attr('value');
    		name = $this.attr('name');
    	}
    	// Set as properties, not concatenated into HTML: the value is already
    	// decoded, so a quote in it would end the attribute and could add markup
    	$this.before(jQuery('<input type="hidden">').prop({ value: String(value), name: String(name) }));
    	$this.after('<span class="devo-enable">Enable</span>');
    });
    jQuery(document).on('click', '.devo-enable', function(e) {
        const $this = jQuery(e.currentTarget);
        $this.prev().removeAttr('disabled').children().removeAttr('disabled');
    	$this.remove();
    });
};

const dynamic_interface_bound_fields = new Set();

const dynamic_interface = function(settings) {
    const field_ids = settings.fields;
    const type = settings.settings.type;
    // Set listeners on each field
    if ( field_ids ) {
        for(let i = 0; i < field_ids.length; i++) {
            if ( dynamic_interface_bound_fields.has( field_ids[i] ) ) {
                continue;
            }
            dynamic_interface_bound_fields.add( field_ids[i] );
            jQuery(document).on('change', '#'+field_ids[i], function(e) {
                const $this = jQuery(e.currentTarget);
                const $parent_form = $this.parents('form');
                const $parent_meta_box = $this.parents('div.postbox');
                //const form_id = $parent_form.attr('id');
                const form_action = $parent_form.attr('action');
                //const form_data = $parent_form.serializeArray();
                //console.log(form_data);
                $parent_form.addClass('devo-ajax-loading');
                $parent_form.attr('action', form_action + '#' + $parent_meta_box.attr('id'));
                $parent_form.trigger('submit');
            });
        }
    }
    // Reorder function
    const reorder_boxes = function() {
        let box_index = 1;
        const nonces = {};
        jQuery('.postbox').each(function(i) {
            const $this = jQuery(this);
            if($this.attr('id') && $this.attr('id').match(/\d+_meta$/) !== null) {
                // Box ID
                $this.attr('id', $this.attr('id').replace(/\d+_meta$/, box_index + '_meta'));
                // Form fields
                $this.find('input, select, textarea').each(function(i) {
                    const $this = jQuery(this);
                    if($this.attr('name') && $this.attr('name').match(/_\d+/) !== null) {
                        // Store the nonces
                        if($this.attr('name').indexOf('nonce') > -1) {
                            const nonce_number = $this.attr('name').match(/\d+/)[0];
                            const nonce_value = $this.attr('value');
                            nonces[ nonce_number ] = nonce_value;
                        }
                        // Replace everything else
                        else {
                            const new_name = $this.attr('name').replace(/(_[\d]+)(_[\d]+)*/, '_'+box_index);
                            const new_id = $this.attr('id') ? $this.attr('id').replace(/(_[\d]+)(_[\d]+)*/, '_'+box_index) : false;
                            $this.attr('name', new_name);
                            if(new_id) {
                                $this.attr('id', new_id);
                            }
                        }
                    }
                });
                // Footnotes
                $this.find('span.footnote').each(function(i) {
                    const $this = jQuery(this);
                    const new_name = $this.text().replace(/_\d+/, '_'+box_index);
                    $this.text(new_name);
                });
                // Panel Title
                //console.log(box_index);
                const $panel_short_title = $this.find('h2');
                //console.log($panel_short_title.text());
                const new_title = $panel_short_title.text().replace(/\d+/, box_index);
                //console.log(new_title);
                $panel_short_title.text(new_title);
                // Iterate the box_index
                box_index++;
            }
        });
        // And do it all again just for the nonces
        box_index = 1;
        jQuery('.postbox').each(function(i) {
            const $this = jQuery(this);
            if($this.attr('id') && $this.attr('id').match(/\d+_meta$/) !== null) {
                $this.find('input[type="hidden"]').each(function(i) {
                    const $this = jQuery(this);
                    if($this.attr('name') && $this.attr('name').indexOf('nonce') > -1) {
                        const current_nonce_name = $this.attr('name'); //.match(/\d+/)[0];
                        const new_nonce_name = current_nonce_name.replace(/\d+/, box_index);
                        $this.attr('name', new_nonce_name);
                        $this.val(nonces[ box_index ]);
                    }
                });
                box_index++;
            }
        });
    }
    // Actions for arrays
    if ( type == 'array' ) {
        // Full Title
        //console.log(settings);
        if ( settings.settings.dynamic_meta_box_title_field ) {
            jQuery('.postbox').each(function(i) {
                const $this = jQuery(this);
                const $panel_full_title = $this.find('.postbox-header').children('h2');
                const $dynamic_title_field = $this.find('input[name^='+settings.settings.dynamic_meta_box_title_field+']');
                const dynamic_title = $dynamic_title_field ? $dynamic_title_field.attr('value') : false;
                // .text(), not .html(): the title is what an editor typed, and
                // the browser has already decoded the attribute, so a typed
                // "&lt;img onerror=...&gt;" would otherwise become markup.
                if ( dynamic_title ) {
                    $panel_full_title.text( $panel_full_title.text() + ': ' + dynamic_title );
                } else {
                    const $fallback_title_field = $this.find('[name^='+settings.settings.nested_field_key+']');
                    const fallback_title_value = $fallback_title_field ? $fallback_title_field.val() : false;
                    const nested_field_options = settings.settings.nested_field_options ? settings.settings.nested_field_options.options : {};
                    if ( nested_field_options[ fallback_title_value ] ) {
                        $panel_full_title.text( $panel_full_title.text() + ': ' + nested_field_options[ fallback_title_value ].label );
                    }
                }
            });
        }
        // Add
        jQuery('span#dynamic-add-button').on('click', function(e) {
            const $this = jQuery(this);
            const $parent_form = $this.parents('form');
            //const $parent_meta_box = $this.parents('div.postbox');
            const form_action = $parent_form.attr('action');
            const $number_field = jQuery('input#dynamic-add-number');
            const $current_count_field = jQuery('span#dynamic-add-field').find('input');
            //const $scroll_to_postbox = jQuery('#normal-sortables').children().not('#revisionsdiv').last('.postbox');
            // let $scroll_to = false;
            // if($scroll_to_postbox.hasClass('closed')) {
            //     $scroll_to = $scroll_to_postbox;
            // } else {
            //    $scroll_to = $scroll_to_postbox.find('.scroll-to');
            // }
            const number = Number($number_field.val());
            const current_count = Number($current_count_field.val());
            $current_count_field.val(current_count+number);
            //$parent_form.attr('action', form_action + '#' + $scroll_to.attr('id'));
            $parent_form.trigger('submit');
        });
        // Delete
        jQuery('span.dynamic-delete-button').on('click', function(e) {
            const $this = jQuery(this);
            const $parent_meta_box = $this.parents('div.postbox');
            const $current_count_field = jQuery('span#dynamic-add-field').find('input');
            const current_count = Number($current_count_field.val());
            $current_count_field.val(current_count-1);
            $parent_meta_box.remove();
            //console.log($current_count_field.val());
            reorder_boxes();
        });
        // Sort
        jQuery('.meta-box-sortables').on('sortupdate', reorder_boxes);
    }
};

jQuery(document).ready(function($) {
    $(window).on('load', function(e) {
    	devo_disabled();
    });
    if(typeof dynamic_interface_settings !== 'undefined') {
        if ( Array.isArray( dynamic_interface_settings.interfaces ) ) {
            dynamic_interface_settings.interfaces.forEach( dynamic_interface );
        } else {
            dynamic_interface( dynamic_interface_settings );
        }
    }
});


/* Array Fields */

const array_delete_button = function($obj) {
    $obj.each(function(i) {
        const $this = jQuery(this);
        const code = '<span class="delete-field">X Delete</span>';
        if(!$this.find('span.delete-field').length) {
            if($this.find('span.footnote').length) {
                $this.find('span.footnote').before(code);
            } else {
                $this.append(code);
            }
        }
    });
};

const array_delete_field = function(e) {
    const $array_fields = jQuery(e.target).parentsUntil('.array-wrapper', '.array-fields-wrapper');
    const $field_wrapper = jQuery(e.target).parent('span.array-field-wrapper');
    if($array_fields.children('span.array-field-wrapper').length < 2) {
        $field_wrapper.find('input, select, textarea').val('');
        $field_wrapper.find('.post-browser-title').text('');
        $field_wrapper.find('.media-upload-preview-wrapper').remove();
    } else {
        $field_wrapper.remove();
    }
};

const array_add_field = function(e) {
    const $this = jQuery(e.target).parent('span.new-array-field');
    const $fields_wrapper = $this.siblings('div.array-fields-wrapper');
    const $new_field = $fields_wrapper.children('span.array-field-wrapper').last().clone();
    const i = Number($new_field.attr('data-i'));
    const in_a_multi = $new_field.hasClass('in-a-multi') || Boolean( $fields_wrapper.parents('span.multi').length );
    //if ( ! in_a_multi ) {
        $new_field.attr('data-i', i+1);
    //}
    // A kept-but-unavailable stored value belongs to the row it came from
    $new_field.find('option.devo-unavailable-option').remove();
    const $new_field_fields = $new_field.find('input:not(.search), select, textarea');
    if($new_field_fields.length) {
        $new_field_fields.each(index => {
            const $this = jQuery($new_field_fields[index]);
            const current_name = $this.attr('name');
            let new_name;
            if ( in_a_multi ) {
                const regex = new RegExp( '\['+i+'\]', 'g' );
                const matches = current_name.match(regex);
                if ( matches !== null && matches.length > 1 && current_name.indexOf( '[]' ) === -1 ) {
                    let t = 0
                    new_name = current_name.replace(regex, match => ++t === matches.length ? ( i + 1 ) : match);
                } 
                else if ( current_name.indexOf( '[]' ) > -1 ) {
                    new_name = current_name;
                }
                else {
                    new_name = current_name.replace(regex, (i+1));
                }
            } else {
                new_name = current_name.replace('[' + i + ']', '['+ ( i + 1 ) + ']');
            }
            //console.log(new_name);
            $this.attr({
                id: null,
                value: null,
                name: new_name,
            });
            $this.val('');
        });
    }
    $new_field.find('span.footnote').remove();
    $new_field.find('span.media-upload-preview-wrapper').remove();
    $new_field.appendTo($fields_wrapper);
};

jQuery(document).ready(function($) {
    // Delete Button
    $(document).on('click', 'span.delete-field', array_delete_field);
    $(document).on('click', 'span.new-array-field', array_add_field);

    // Sortable
    const sort_containers = $('.array-fields-wrapper');
    if(sort_containers) {
        sort_containers.each(function(i) {
            $(this).sortable({
                draggable: '.array-field-wrapper',
                handle: '.drag-handle',
            });
        });
    }
});


/* Post Browser */

jQuery(document).ready(function($) {
    if($('.post-browser').length) {
        $('.post-browser').each(function(i) {
            const $this = $(this);

            // Activate the lists.js library
            const id = 'post-browser-'+i;
            $this.attr('id', id);
            const options = {
                valueNames: [ 'title','post-type','date' ] ,
            };
            const post_browser = new List(id, options);

            // On load, populate the titles of selected posts
            // .text(), not an HTML string: the browser has already decoded
            // data-title, so a post titled "&lt;img onerror=...&gt;" would
            // otherwise become markup. The row is matched with .filter()
            // rather than a selector built from the stored value.
            $this.find('span.array-field-wrapper').each(function(i) {
                const id = $(this).find('input, select').val();
                let title = '';
                if(id) {
                    title = $this.find('tr[data-value]').filter(function() {
                        return $(this).attr('data-value') === String(id);
                    }).first().attr('data-title') || '';
                }
                $(this).prepend($('<span class="post-browser-title"></span>').text(title));
            });
        });

        // Select post
        $('.devo-add-post').on('click', function(e) {
            const $this = $(this);
            const value = $this.attr('data-value');
            const title = $this.attr('data-title');
            const $post_browser = $this.parents('.post-browser');
            let $last_field = $post_browser.find('.array-fields-wrapper').find('.array-field-wrapper:last').find('input');
            if($last_field.val() != '') {
                $post_browser.find('span.new-array-field > span').trigger('click');
                $last_field = $post_browser.find('.array-fields-wrapper').find('.array-field-wrapper:last').find('input');
                $last_field.siblings('.post-browser-title').text('');
            }
            $last_field.val(value);
            $last_field.parent().find('.post-browser-title').text(title);
        });
    }
});


/* Font Awesome Icons */
jQuery(document).ready(function($) {
    if($('#devo-fa-icons').length) {
        // Activate the lists.js library
        const options = {
            valueNames: [ 'icon-title','icon-code' ] ,
        };
        const fa_icons = new List('devo-fa-icons', options);
        fa_icons.on('updated', function() {
            $('#devo-fa-icons-count').text($('#devo-fa-icons').find('ul.list').find('li').length);
        });
    };
});


/* Unused Media */
jQuery(document).ready(function($) {
    if($('div#devo-unused-media').length) {
        // Activate the lists.js library
        const options = {
            valueNames: [ 'media_url' ] ,
        };
        const unused_media = new List('devo-unused-media', options);
        unused_media.on('updated', function() {
            $('#unused-media-count').text($('#unused-media-table').find('tr').length - 1);
        });
        // Bulk select
        $('input#select_n').on('click', function(e) {
            const n = 100;
            const deleteN = this;
            $('input.delete-media').each(function(i) {
                if ( i < n ) {
                    $(this).prop('checked', deleteN.checked);
                }
            });
        });
    };
});


/* Image Select */

jQuery(document).ready(function($) {
    const $image_select = $('input.image-select');
    if($image_select.length) {
        const $checked = $image_select.filter(':checked');
        const checked_id = $checked.attr('id');
        $('label[for='+checked_id+']').addClass('selected');
        $image_select.on('change', function(e) {
            const $this = $(this);
            const field_id = $this.attr('id');
            $this.parents('td').find('.selected').removeClass('selected');
            $('label[for='+field_id+']').addClass('selected');
        });
    }
});

/* 'Other' field -- also in devo-main.js */

var other_field = function($obj) {
    $obj.on('change', function(e) {
        const $this = jQuery(this);
        $this.siblings('input.devo-other').val($this.val())
    });
};
jQuery(document).ready(function($) {
    if($('.devo-other-text').length) {
        $('.devo-other-text').each(function(i) {
            other_field($(this));
        });
    }
});

/* View Data - table sort, search, and sticky header */
jQuery(document).ready(function($) {
    if($('#devo-data-table').length) {
        const $data_table = $('#devo-data-table');
        const valueNames = [];
        $data_table.find('thead').find('th').each(function(i) {
            valueNames.push($(this).attr('id'));
        });
        // Activate the lists.js library
        const options = {
            valueNames: valueNames,
        };
        const data_table = new List('devo-data-table', options);
        $data_table.on('click', 'tr', function(e) {
            const $this = $(this);
            $('.highlight').not($this).removeClass('highlight');
            if($this.hasClass('highlight')) {
                $this.removeClass('highlight');
            } else {
                $this.addClass('highlight');
            }
        });
    }
});

// Single Column
jQuery(document).ready(function($) {
    // Move Preview button
    const $preview_button = $('#preview-action');
    $('#publishing-action').after($preview_button.clone().addClass('moved'));
    $preview_button.remove();

    // Move Save Draft button
    const $save_draft_button = $('#save-action');
    $('#publishing-action').after($save_draft_button.clone());
    $save_draft_button.remove();
});

// Select All
var devo_select_all = function() {
    const $select_alls = jQuery('.devo-select-all');
    $select_alls.each(function(i) {
        const select_text = jQuery(this).text();
        jQuery(this).on('click', function(e) {
            const $this = jQuery(this);
            const field_name = $this.attr('data-for');
            const $check_me = jQuery('[name="'+field_name+'"')
            const deselect_text = $this.attr('data-deselect-text');
            if($this.hasClass('checked')) {
                $check_me.prop('checked', false);
                $this.text(select_text).toggleClass('checked');
            } else {
                $check_me.prop('checked', true);
                $this.text(deselect_text).toggleClass('checked');
            }
        });
    });
};
jQuery(document).ready(function($) {
    if($('.devo-select-all').length) {
        devo_select_all();
    }
});

/* Range Slider */

jQuery(document).ready(function($) {
    const range_slider_containers = document.getElementsByClassName('range-slider-container');
    if(range_slider_containers.length) {
        for(let i = 0; i < range_slider_containers.length; i++) {
            const range_slider = range_slider_containers[i].getElementsByClassName('range-slider')[0];
            const plus_button = range_slider_containers[i].getElementsByClassName('range-slider-plus')[0];
            const minus_button = range_slider_containers[i].getElementsByClassName('range-slider-minus')[0];
            const range_slider_value = range_slider_containers[i].getElementsByClassName('range-slider-display-value')[0];
            const max = Number(range_slider.getAttribute('max'));
            const min = Number(range_slider.getAttribute('min'));
            const step = Number(range_slider.getAttribute('step'));
            const disable_check = function(value) {
                if(value >= max) {
                    plus_button.classList.add('devo-disabled');
                    plus_button.setAttribute('disabled', 'disabled');
                    minus_button.removeAttribute('disabled', 'disabled');
                } else if(value <= min) {
                    minus_button.classList.add('devo-disabled');
                    minus_button.setAttribute('disabled', 'disabled');
                    plus_button.removeAttribute('disabled', 'disabled');
                } else {
                    plus_button.classList.remove('devo-disabled');
                    minus_button.classList.remove('devo-disabled');
                    plus_button.removeAttribute('disabled', 'disabled');
                    minus_button.removeAttribute('disabled', 'disabled');
                }
            }
            range_slider.oninput = function(e) {
                const value = this.value;
                range_slider_value.setAttribute('value', value);
                disable_check(value);
            };
            plus_button.addEventListener('click', function(e) {
                e.preventDefault();
                const value = Number(range_slider_value.getAttribute('value'));
                const new_value = value + step;
                if(new_value >= max) {
                    new_value = max;
                } else {
                    range_slider.stepUp();
                }
                disable_check(new_value);
                range_slider_value.setAttribute('value', new_value);
                range_slider.setAttribute('value', new_value);
            });
            minus_button.addEventListener('click', function(e) {
                e.preventDefault();
                const value = Number(range_slider_value.getAttribute('value'));
                const new_value = value - step;
                if(new_value <= min) {
                    new_value = min;
                } else {
                    range_slider.stepDown();
                }
                disable_check(new_value);
                range_slider_value.setAttribute('value', new_value);
                range_slider.setAttribute('value', new_value);
            });
        }
    }
});
