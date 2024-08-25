<?php
/**
 * Content Survey
 */

class DO_Content_Survey {
    private $table_name_suffix;
    public function __construct() {
        $this->table_name_suffix = 'content_surveys';
        // Template rewrite
        $rewrite = new DO_Rewrite( [ 'from' => 'content-survey', 'template' => [ $this, 'api' ], 'parameter_count' => 2 ] );
        // Query Vars
        add_filter( 'query_vars', [ $this, 'query_vars' ] );
        // View Data Screen
        $view_data = new DO_Options_Screen( 'do_view_content_survey_data' );
        $view_data->settings( [
            'page_title' => 'View Content Survey Data',
            'submenu' => 'tools.php',
            'post_form_callback' => [ $this, 'view_data' ],
        ] );
    }
    public function display( $post_id = FALSE, $wrapper = 'aside' ) {
        if ( ! $post_id ) {
            return;
        }
        global $do_custom_post_types;
        $cpt_obj = $do_custom_post_types[ get_post_field( 'post_type', $post_id ) ];
        ob_start() ?>
        <?php if ( $wrapper == 'aside' ) : ?>
            <aside id="content-survey" class="content-survey">
        <?php elseif ( $wrapper == 'panel' ) : ?>
            <section id="content-survey" <?php do_background( '||#FFFFFF|||', [ 'panel', 'content-survey', 'text-dark' ] ) ?>>
                <div class="panel-inner-wrapper container">
                    <header class="panel-header">
        <?php endif; ?>
        <?php do_heading( [ 
            'title' => __( 'Did you find this content helpful?', 'developers_only' ), 
            'tag' => 'h2', 
        ] ) ?>
        <?php if ( $wrapper == 'panel' ) : ?>
                    </header>
        <?php endif; ?>
                    <button class="fa-thumbs-up"  data-post-type="<?php echo $cpt_obj->post_type_slug ?>" data-post-id="<?php echo $post_id ?>" data-meta-prefix="<?php $cpt_obj->meta_prefix ?>" data-value="yes"><?php echo __( 'Yes', 'developers_only' ) ?></button>
                    <button class="fa-thumbs-down" data-post-type="<?php echo $cpt_obj->post_type_slug ?>" data-post-id="<?php echo $post_id ?>" data-meta-prefix="<?php echo $cpt_obj->meta_prefix ?>" data-value="no"><?php echo __( 'No', 'developers_only' ) ?></button>
        <?php if ( $wrapper == 'aside' ) : ?>
            </aside>
        <?php elseif ( $wrapper == 'panel' ) : ?>
                </div>
            </section>
        <?php endif;
        $output = ob_get_contents();
        ob_end_clean();

        return $output;
    }
    public function api() {
        global $wp_query, $wpdb;
        // Only if a user is NOT logged in
        if ( DO_ENVIRONMENT !== 'prod' || ! is_user_logged_in() ) {
            $table_name = $wpdb->prefix . $this->table_name_suffix;
            // Maybe create a table
            $this->create_table();
            // Definitely add data to it
            $post_id = sanitize_key( $wp_query->query_vars['post'] );
            $post_title = get_post_field( 'post_title', $post_id );
            $post_type = get_post_field( 'post_type', $post_id );
            $answer = sanitize_text_field( $wp_query->query_vars['answer'] );
            // Get current values for post_id, if any
            $post_id_exists = $wpdb->get_results( "SELECT * FROM $table_name where post_id = $post_id;" );
            // If the post_id does not exist, insert it
            if ( ! $post_id_exists ) {
                $wpdb->insert(
                    $table_name,
                    [
                        'post_id' => $post_id,
                        'post_title' => $post_title,
                        'post_type' => $post_type,
                        'yes' => $answer == 'yes' ? 1 : 0,
                        'no' => $answer == 'no' ? 1 : 0,
                    ],
                    [
                        '%d',
                        '%s',
                        '%s',
                        '%d',
                        '%d',
                    ]
                );
            }
            // If it does exist, update it
            else {
                $post_id_entry = current( $post_id_exists );
                $wpdb->update(
                    $table_name,
                    [ $answer => $post_id_entry->$answer + 1 ],
                    [ 'post_id' => $post_id ],
                    [ '%d' ],
                    [ '%d' ]
                );
            }
        }
    }
    public function query_vars( $vars ) {
        array_push( $vars, 'post' );
        array_push( $vars, 'answer' );
        return $vars;
    }

    private function create_table() {
		global $wpdb;
        $table_name = $wpdb->prefix . $this->table_name_suffix;
        $table_exists = $wpdb->query( "SHOW TABLES LIKE '$table_name'" );
        if ( ! $table_exists ) {
            $columns = [ 'post_id int', 'post_title text', 'post_type text', 'yes int', 'no int' ];
            $columns_string = implode( ",\n", $columns ) . ",\n";
            $charset_collate = $wpdb->get_charset_collate();
            $sql = "CREATE TABLE $table_name 
                (
                id int(11) NOT NULL AUTO_INCREMENT,
                $columns_string
                PRIMARY KEY  (id)
            ) $charset_collate;";
            $create_table = $wpdb->query( $sql );
        }
	}

    public function view_data() {
        ini_set( 'memory_limit', '1024M' );
        global $wpdb;
        $table_name = $wpdb->prefix . $this->table_name_suffix;
        $data = $wpdb->get_results( "SELECT * FROM $table_name", ARRAY_A );
        // Create content array
        $content_rows = [];
        if ( count ( $data ) ) {        
            // Add content to array
            for ( $i = 0; $i < count( $data ); $i++ ) {
                $content_rows[ $i ] = $data[ $i ];
                if ( $i === 0 ) {
                    $header_row = array_keys( $content_rows[ $i ] );
                }
            }
        }
        // Return if content array is still empty
        if ( ! count( $content_rows ) || ! isset( $header_row ) ) : ?>
            <p>Nothing to show here.</p>
        <?php else : ?>
            <div id="do-content-survey">
                <label for="content-survey-search">Search:</label> <input type="search" class="search" id="content-survey-search">
                <span id="content-survey-count"><?php echo count( $content_rows ) ?></span>
                <table border="0" width="100%" id="content-survey-table">
                    <thead>
                        <tr>
                            <?php foreach ( $header_row as $header ) : ?>
                                <th id="<?php echo $header ?>" data-sort="<?php echo $header ?>" class="sort <?php echo $header ?>" style="text-align:left;background-color:#999;color:#fff"><?php echo $header ?></th>
                            <?php endforeach; ?>
                        </tr>
                    </thead>
                    <tbody class="list">
                        <?php $i = 0; ?>
                        <?php foreach ( $content_rows as $row ) : ?>
                            <tr>
                                <?php foreach ( $row as $column => $content ) : ?>
                                    <td class="<?php echo $column ?>" style="text-align:left;"><?php echo $content ?></td>
                                <?php endforeach; ?>
                            </tr>
                        <?php $i++; ?>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif;
    }
}
global $do_content_survey;
$do_content_survey = new DO_Content_Survey();