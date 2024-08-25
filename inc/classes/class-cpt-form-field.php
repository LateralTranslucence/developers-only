<?php

class DO_CPT_Form_Field {
	private $apply_taxonomy;
	public $callback;
	private $disabled;
	private $display_field;
	public $field_type;
	private $options;
	private $orderby;
	private $orderby_num;
	private $query;
	private $target;
	private $target_name;
	public $target_type;
	private $value_field;
	private $value_filter;

	public function __construct( $_field_type = NULL, $_target_name = NULL, $_display_field = NULL, $_value_field = NULL, $_settings = FALSE ) {
		if ( in_array( NULL, [ $_field_type, $_target_name ] ) ) {
			trigger_error( 'Required argument(s): $_field_type, $_target_name, $_display_field, $_value_field' );
			return;
		}
        add_action( 'admin_init', function() use ( $_field_type, $_target_name, $_display_field, $_value_field, $_settings ) {
            $this->settings( $_field_type, $_target_name, $_display_field, $_value_field, $_settings );
        } );
	}

    public function settings( $_field_type, $_target_name, $_display_field, $_value_field, $_settings ) {
        $this->target_name = $_target_name;
        $this->target_type = post_type_exists( $this->target_name ) ? 'post_type' : ( taxonomy_exists( $this->target_name ) ? 'taxonomy' : FALSE );
        if ( $this->target_type == 'post_type' ) {
            global $do_custom_post_types;
    		$this->target = $do_custom_post_types[ $this->target_name ];
        }
		$this->field_type = $_field_type;
		$this->display_field = $_display_field;
		$this->value_field = $_value_field;
		$this->orderby = isset( $_settings['orderby'] ) ? $_settings['orderby'] : FALSE;
		$this->orderby_num = isset( $_settings['orderby_num'] ) ? $_settings['orderby_num'] : FALSE;
		$this->query = isset( $_settings['query'] ) ? $_settings['query'] : FALSE;
		$this->disabled = isset( $_settings['disabled'] ) ? $_settings['disabled'] : FALSE;
		$this->callback = $this->target_type == 'taxonomy' ? [ $this, 'display_tax_callback' ] : [ $this, 'display_field_callback' ];
		$this->value_filter = isset( $_settings['value_filter'] ) ? $_settings['value_filter'] : FALSE;
        $this->apply_taxonomy = isset( $_settings['apply_taxonomy'] ) ? $_settings['apply_taxonomy'] : TRUE;
    }

    public function set_up_field_options() {
        $display_field_key = $this->is_meta_field( $this->display_field ) ? do_meta_field_key( $this->display_field, $this->target->meta_prefix ) : $this->field_name( $this->display_field );
        $value_field_key = $this->is_meta_field( $this->value_field ) ? do_meta_field_key( $this->value_field, $this->target->meta_prefix ) : $this->field_name( $this->value_field );
        // Get the posts
        $args = [
            'post_type' => $this->target->post_type,
            'order' => 'ASC',
            'nopaging' => TRUE,
            'fields' => 'ids',
        ];
        // Order
        if ( $this->orderby ) {
            if ( $this->is_meta_field( $this->orderby ) ) {
                $orderby_field_key = do_meta_field_key( $this->orderby, $this->target->meta_prefix );
                $args['meta_key'] = $orderby_field_key;
                $args['orderby'] = 'meta_value';
            } else {
                $args['orderby'] = $this->field_name( $this->orderby );
            }
        } elseif ( $this->orderby_num ) {
            if ( $this->is_meta_field( $this->orderby_num ) ) {
                $orderby_field_key = do_meta_field_key( $this->orderby_num, $this->target->meta_prefix );
                $args['meta_key'] = $orderby_field_key;
                $args['orderby'] = 'meta_value_num';
            } else {
                $args['orderby'] = $this->field_name( $this->orderby_num );
            }
        }
        // Default to orderby title
        else {
            $args['orderby'] = 'title';
        }
        // Query
        if ( $this->query ) {
            foreach ( $this->query as $query ) {
                if ( $this->is_meta_field( $query['key'] ) ) {
                    if ( ! isset( $args['meta_query'] ) ) {
                        $args['meta_query'] = [ 'relation' => 'AND' ];
                    }
                    $args['meta_query'][] = [
                        'key' => do_meta_field_key( $query['key'], $this->target->meta_prefix ),
                        'value' => $query['value'],
                        'compare' => isset( $query['compare'] ) ? $query['compare'] : '=',
                    ];
                } else {
                    $args[ $this->field_name( $query['key'] ) ] = $query['value'];
                }
            }
        }
        $field_posts = get_posts( $args );
        $field_options = [];
        foreach ( $field_posts as $post_id ) {
            $field_options[] = [
                'label' => $this->is_meta_field( $this->display_field ) ? do_get_post_meta( $post_id, $display_field_key ) : get_post_field( $display_field_key, $post_id ),
                'value' => $this->is_meta_field( $this->value_field ) ? do_get_post_meta( $post_id, $value_field_key ) : ( $value_field_key == 'id' ? $post_id : get_post_field( $value_field_key, $post_id ) ),
            ];
        }
        $this->options = $field_options;
        return $field_options;
    }

    public function set_up_tax_options() {
        $term_objects = get_terms( [ 'taxonomy' => $this->target_name, 'hide_empty' => FALSE ] );
        $terms = [];
        foreach ( $term_objects as $term ) {
            $terms[ $term->slug ] = [
                'label' => $term->name,
                'value' => $term->term_id,
            ];
        }
        $this->options = $terms;
        return $terms;
    }

	public function display_field_callback( $post_id, $location = 'edit', $value = FALSE, $meta_field_key = '' ) {
        $field_value = do_get_post_meta( $post_id, $meta_field_key );
        if ( isset( $this->value_filter ) && function_exists( $this->value_filter ) ) {
            $field_value = call_user_func( $this->value_filter, $field_value );
        }
        $display_field_key = $this->is_meta_field( $this->display_field ) ? do_meta_field_key( $this->display_field, $this->target->meta_prefix ) : $this->field_name( $this->display_field );
        $value_field_key = $this->is_meta_field( $this->value_field ) ? do_meta_field_key( $this->value_field, $this->target->meta_prefix ) : $this->field_name( $this->value_field );
		$field_options['options'] = $this->options ? $this->options : $this->set_up_field_options();
		switch ( $location ) {
			case 'edit':
				$output = '';
                if ( isset( $field_options['options'] ) && count( $field_options['options'] ) ) {
    				$disable = $this->disabled && strlen( $field_value );
                    $form_field = new DO_Form_Field_Display( $this->field_type, $meta_field_key, $field_options, [ 'value_source' => $post_id, 'disabled' => $disable ] );
    				$output .= $form_field->output;
				} else {
				    echo '<p>There are no ' . do_pluralize( $this->target->post_type_display_name ) . '... <a href="' . admin_url( '/post-new.php?post_type=' . $this->target->post_type ) . '">Go create some!</a></p>';
				    echo '<span class="footnote">' . $meta_field_key . '</span>';
                }
				echo $output;
				break;
			case 'list':
		        $output = '';
                $field_value_array = is_array( $field_value ) ? $field_value : [ $field_value ];
                foreach ( $field_value_array as $field ) {
                    $args['post_type'] = $this->target->post_type;
                    if ( $this->is_meta_field( $this->value_field ) ) {
                        $args['meta_key'] = $value_field_key;
                        $args['meta_value'] = $field;
                    } else {
                        $query_safe_value_field_key = $value_field_key == 'post_name' ? 'name' : $value_field_key;
                        $args[ $query_safe_value_field_key ] = $field;
                    }
                    // If querying by post id, use get_post...
                    if ( isset( $query_safe_value_field_key ) && $query_safe_value_field_key == 'id' ) {
                        $value_post = get_post( $args['id'] );
                    }
                    // ...otherwise use get_posts
                    else {
                        $value_post = get_posts( $args );
                    }
                    if ( count( $value_post ) ) {
                        $single_value_post = is_array( $value_post ) ? $value_post[0] : $value_post;
                        $output .= $this->is_meta_field( $this->display_field ) ? do_get_post_meta( $single_value_post->ID, $display_field_key ) . '<br>' : get_post_field( $display_field_key, $single_value_post->ID ) . '<br>';
                    }
                }
				echo $output;
				break;
			case 'validate':
                $validate = new DO_Form_Field_Validate( $this->field_type, $value );
				return $validate->value;
				break;
			default:
				break;
		}
	}

	public function display_tax_callback( $post_id, $location = 'edit', $value = FALSE, $meta_field_key = '' ) {
        $field_values = defined( 'IS_PROFILE_PAGE' ) && IS_PROFILE_PAGE ? get_user_meta( $post_id, $this->target_name, TRUE ) : ( $this->apply_taxonomy ? implode( ';', wp_list_pluck( wp_get_post_terms( $post_id, $this->target_name ), 'term_id' ) ) : do_get_post_meta( $post_id, $meta_field_key ) );
        $string_field_values = is_string( $field_values ) ? $field_values : implode( ';', $field_values );
        if ( isset( $this->value_filter ) && function_exists( $this->value_filter ) ) {
            $field_values = call_user_func( $this->value_filter, $field_values );
        }
		$field_options['options'] = $this->options ? $this->options : $this->set_up_tax_options();
		switch ( $location ) {
			case 'edit':
				$output = '';
                if ( isset( $field_options['options'] ) && count( $field_options['options'] ) ) {
    				$disable = $this->disabled && strlen( $field_values );
                    $form_field = new DO_Form_Field_Display( $this->field_type, ( $this->apply_taxonomy ? $this->target_name : $meta_field_key ), $field_options, [ 'value_source' => $post_id, 'force_value' => $field_values, 'disabled' => $disable, 'taxonomy' => TRUE ] );
    				$output .= $form_field->output;
				} else {
				    $tax_details = get_taxonomy( $this->target_name );
				    echo '<p>There are no ' . $tax_details->labels->name . '... <a href="' . admin_url( '/edit-tags.php?taxonomy=' . $this->target_name ) . '">Go create some!</a></p>';
				}
				echo $output;
				break;
            case 'list':
                $output = '';
                if ( $this->apply_taxonomy ) {
                    $terms = get_the_terms( $post_id, $this->target_name );
                    foreach ( $terms as $term ) {
                        $output .= $term->name . '<br>';
                    }
                }
				echo $output;
				break;
			case 'validate':
                $validate = new DO_Form_Field_Validate( $this->field_type, $value );
				return $validate->value;
				break;
			default:
				break;
		}
	}

	private function is_meta_field( $field_name ) {
		return ( in_array( strtolower( $field_name ), [ 'slug', 'title', 'post_id', 'post_name', 'post_title' ] ) === FALSE );
	}

	private function field_name( $field_name ) {
		switch( strtolower( $field_name ) ) {
			case 'title':
			case 'post_title':
				return 'post_title';
				break;
			case 'slug':
			case 'name':
			case 'post_name':
				return 'post_name';
				break;
			case 'id':
			case 'ID':
			case 'post_id':
				return 'id';
				break;
		}
	}
}
