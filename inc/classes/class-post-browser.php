<?php
/*
 * Post Browser
 */

class DO_Post_Browser {
    private $brackets;
    private $field_name;
    private $force_value;
    private $limit;
    public $output;
    private $post_id;
    private $post_types;
    private $posts;
    private $post_types_field;
    private $query;
    private $site;
    private $value_field;

    public function __construct( $field_name, $post_id, $settings = [] ) {
        $this->field_name = $field_name;
        $this->post_id = $post_id;
        $this->post_types_field = isset( $settings['post_types_field'] ) ? $settings['post_types_field'] : FALSE;
        $this->post_types = isset( $settings['post_types'] ) ? $settings['post_types'] : ( $this->post_types_field ? $this->get_post_types() : do_get_public_post_types( 'indexed_array' ) );
        $this->value_field = isset( $settings['value_field'] ) ? $settings['value_field'] : 'ID';
        $this->limit = isset( $settings['limit'] ) ? $settings['limit'] : 0;
        $this->query = isset( $settings['query'] ) ? $settings['query'] : FALSE;
        $this->site = isset( $settings['site'] ) ? $settings['site'] : FALSE;
        $this->brackets = isset( $settings['brackets'] ) ? $settings['brackets'] : '';
        $this->force_value = isset( $settings['force_value'] ) ? $settings['force_value'] : FALSE;
        $this->posts = $this->get_posts();
        $this->output = $this->build_interface( $this->posts );
    }

    private function get_post_types() {
        global $do_custom_post_types;
        $post_type_obj = $do_custom_post_types[ get_post_field( 'post_type', $this->post_id ) ];
        preg_match( '/(\d+)$/', $this->field_name, $matches );
        if ( count( $matches ) ) {
            $field_number = current( $matches );
            $field_name = do_meta_field_key( $this->post_types_field . ' ' . $field_number, $post_type_obj->meta_prefix );
        } else {
            $field_name = do_meta_field_key( $this->post_types_field, $post_type_obj->meta_prefix );
        }
        $raw_post_types = do_get_post_meta( $this->post_id, $field_name );
        $post_types = is_array( $raw_post_types ) && count( $raw_post_types ) ? $raw_post_types : do_get_public_post_types( 'index_array' );
        return $post_types;
    }

    private function get_posts() {
        global $do_custom_post_types;
        
        $args = [
            'post_type' => $this->post_types,
            'orderby' => 'title',
            'order' => 'ASC',
            'nopaging' => TRUE,
            'fields' => 'ids',
        ];
        // Query
        if ( $this->query ) {
            foreach ( $this->query as $query ) {
                if ( $this->is_meta_field( $query['key'] ) ) {
                    if ( ! isset( $args['meta_query'] ) ) {
                        $args['meta_query'] = [
                            'relation' => 'AND',
                        ];
                    }
                    $args['meta_query'][] = [
                        'key' => $query['key'],
                        'value' => $query['value'],
                        'compare' => isset( $query['compare'] ) ? $query['compare'] : '=',
                    ];
                } else {
                    $args[ $this->field_name( $query['key'] ) ] = $query['value'];
                }
            }
        }
        if ( $this->site ) {
            $blog_id = ( $specific_site_id = do_site_id( $this->site ) ) ? $specific_site_id : get_current_blog_id();
            switch_to_blog( $blog_id );
        }
        $post_ids = get_posts( $args );
        $posts = [];
        foreach ( $post_ids as $post_id ) {
            $post_type_details = $do_custom_post_types[ get_post_field( 'post_type', $post_id ) ];
            $posts[] = [
                'label' => get_post_field( 'post_title', $post_id ),
                'value' => get_post_field( $this->value_field, $post_id ),
                'post_type' => $post_type_details->post_type_display_name,
                'date' => get_post_field( 'post_date', $post_id ),
            ];
        }
        if ( $this->site ) {
            restore_current_blog();
        }
        return $posts;
    }

    private function build_interface( $browse_posts ) {
        $form_field = new DO_Form_Field_Display( 'text_array', $this->field_name, FALSE, [ 'value_source' => $this->post_id, 'brackets' => $this->brackets, 'force_value' => $this->force_value ? $this->force_value : FALSE ] );
        $output = $this->limit ? '<span class="red small">Limit ' . $this->limit . '</span><br>' : '';
        $output .= '<div class="do-post-browser">';
        $output .= $this->limit ? '<style>.' . $this->field_name . ' div.do-post-browser .array-field-wrapper:nth-child(n+' . ( $this->limit + 1 ) . ') {opacity: .4;}</style>' :''; // +1 because 'new-array-field'
        $output .= $form_field->output;
        $output .= '<span class="do-post-browser-search-wrapper"><label for="do-post-browser-search-' . esc_attr( $this->field_name ) . '">Search:</label> <input type="search" class="search do-post-browser-search" id="do-post-browser-search-' . esc_attr( $this->field_name ) . '"></span>';
        $output .= '<span class="do-post-browser-count-wrapper">' . count( $browse_posts ) . ' posts</span>';
        $output .= '<div class="browser-wrapper">';
        $output .= '<table width="100%" cell-padding="0" cell-margin="0" class="do-post-browser-table">';
        $output .= '    <thead>';
        $output .= '        <tr>';
        $output .= '            <th class="row-number"></th>';
        $output .= '            <th class="sort title" data-sort="title">Title</th>';
        $output .= '            <th class="sort post-type" data-sort="post-type">Post Type</th>';
        $output .= '            <th class="sort date" data-sort="date">Publish Date</th>';
        $output .= '        </tr>';
        $output .= '    </thead>';
        $output .= '    <tbody class="list">';
        $i = 1;
        foreach ( $browse_posts as $browse_post_slug => $browse_post ) {
            $output .= '<tr class="do-add-post" data-title="' . esc_attr( $browse_post['label'] ) . '" data-value="' . esc_attr( $browse_post['value'] ) . '" data-post-type="' . esc_attr( $browse_post['post_type'] ) . '" data-date="' . esc_attr( $browse_post['date'] ) . '">';
            $output .= '    <td class="row-number">' . $i . '</td>';
            $output .= '    <td class="title">' . $browse_post['label'] . '</td>';
            $output .= '    <td class="post-type">' . $browse_post['post_type'] . '</td>';
            $output .= '    <td class="date">' . $browse_post['date'] . '</td>';
            $output .= '</tr>';
            $i++;
        }
        $output .= '    </tbody>';
        $output .= '</table>';
        $output .= '</div>';
        $output .= '</div>';
        return $output;
    }

    private function is_meta_field( $field_name ) {
		return ( in_array( strtolower( $field_name ), [ 'slug', 'title', 'post_id', 'post_name', 'post_title', 'post_date' ] ) === FALSE );
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
