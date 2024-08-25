<?php
/**
 * Unused Media
 */

class DO_Unused_Media {
    private $media_table_name_suffix;
    private $used_media_table_name_suffix;
    public function __construct() {
        $this->media_table_name_suffix = 'all_media';
        $this->used_media_table_name_suffix = 'used_media';
        // View Data Screen
        $view_data = new DO_Options_Screen( 'do_view_unused_media' );
        $view_data->fields( [
            'Refresh Media Data' => [
                'type' => 'button',
                'value' => 'refresh',
            ],
            'Refresh Usage Data' => [
                'type' => 'button',
                'value' => 'refresh',
            ],
        ] );
        $view_data->settings( [
            'page_title' => 'Unused Media',
            'submenu' => 'tools.php',
            'post_form_callback' => [ $this, 'display' ],
            'button_text' => FALSE,
            'onsave_callback' => [ $this, 'create_and_load_tables' ],
        ] );
    }
    
    public function create_and_load_tables( $POST ) {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        // All Media
        if ( isset( $POST['refresh_media_data'] ) && $POST['refresh_media_data'] === 'refresh' ) {
            $media_table_name = $wpdb->prefix . $this->media_table_name_suffix;
            $media_table_exists = $wpdb->query( "SHOW TABLES LIKE '$media_table_name'" );
            // Create the table if it doesn't exist
            if ( ! $media_table_exists ) {
                $media_columns = [ 'post_id int', 'post_date datetime', 'post_title text', 'post_type text', 'media_url text' ];
                $media_columns_string = implode( ",\n", $media_columns ) . ",\n";
                $media_sql = "CREATE TABLE $media_table_name 
                    (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    $media_columns_string
                    PRIMARY KEY  (id)
                ) $charset_collate;";
                $media_create_table = $wpdb->query( $media_sql );
            } 
            // or delete all data from existing table
            else {
                $media_clear_table = $wpdb->query( "DELETE FROM $media_table_name;" );
            }
            // Load current data
            $all_media = $wpdb->get_results( "SELECT * FROM $wpdb->posts WHERE post_type = 'attachment';");
            foreach ( $all_media as $media ) {
                // Clean up the media url
                $environments = do_environments();
                $media_url = str_replace( $environments, '', $media->guid );
                $media_url = preg_replace( '/\.[^\.]*/',  '', $media_url );
                // Add to All Media table
                $wpdb->insert( $media_table_name, [
                    'post_id' => $media->ID,
                    'post_date' => $media->post_date,
                    'post_title' => $media->post_title,
                    'post_type' => $media->post_type,
                    'media_url' => $environments[ DO_ENVIRONMENT ] . $media_url,
                ] );
            }
        }
        // Used Media
        if ( isset( $POST['refresh_usage_data'] ) && $POST['refresh_usage_data'] === 'refresh' ) {
            $used_media_table_name = $wpdb->prefix . $this->used_media_table_name_suffix;
            $used_media_table_exists = $wpdb->query( "SHOW TABLES LIKE '$used_media_table_name'" );
            // Create the table if it doesn't exist
            if ( ! $used_media_table_exists ) {
                $used_media_columns = [ 'post_id int', 'media_url text' ];
                $used_media_columns_string = implode( ",\n", $used_media_columns ) . ",\n";
                $used_media_sql = "CREATE TABLE $used_media_table_name 
                    (
                    id int(11) NOT NULL AUTO_INCREMENT,
                    $used_media_columns_string
                    PRIMARY KEY  (id)
                ) $charset_collate;";
                $used_media_create_table = $wpdb->query( $used_media_sql );
            }
            // or delete all data from existing table
            else {
                $used_media_clear_table = $wpdb->query( "DELETE FROM $used_media_table_name;" );
            }
            // Load current data
            $uploads_info = wp_upload_dir();
            $uploads_directory = $uploads_info['baseurl'];
            $uploads_directory_regex = preg_quote( $uploads_directory ) . '[^\.]*';
            $posts_used_media = $wpdb->get_results( "SELECT ID as post_id, post_content as content FROM $wpdb->posts WHERE post_content LIKE '%$uploads_directory%';" );
            $postmeta_used_media = $wpdb->get_results( "SELECT post_id, meta_value as content FROM $wpdb->postmeta WHERE meta_value LIKE '%$uploads_directory%';" );
            $all_used_media = array_merge( $posts_used_media, $postmeta_used_media );
            foreach ( $all_used_media as $used_media ) {
                $urls = preg_match_all( '`' . $uploads_directory_regex . '`', $used_media->content, $matches );
                if ( $urls !== FALSE ) {
                    foreach ( $matches[0] as $url ) {
                        $wpdb->insert( $used_media_table_name, [
                            'post_id' => $used_media->post_id,
                            'media_url' => $url,
                        ] );
                    }
                }
            }
	    }
	}

    public function display() {
        ini_set( 'memory_limit', '1024M' );
        global $wpdb;
        // Table names
        $media_table_name = $wpdb->prefix . $this->media_table_name_suffix;
        $used_media_table_name = $wpdb->prefix . $this->used_media_table_name_suffix;
        // Tables exist
        $media_table_exists = $wpdb->query( "SHOW TABLES LIKE '$media_table_name'" );
        $used_media_table_exists = $wpdb->query( "SHOW TABLES LIKE '$used_media_table_name'" );
        // Delete stuff?
        if ( isset( $_POST['submit'] ) && isset( $_POST['delete_media'] ) ) {
            $image_sizes = get_intermediate_image_sizes();
            $uploads_info = wp_upload_dir();
            foreach ( $_POST['delete_media'] as $post_id ) {
                foreach ( $image_sizes as $size ) {
                    $image_details = wp_get_attachment_image_src( $post_id, $size );
                    $image_path = @str_replace( $uploads_info['baseurl'], $uploads_info['basedir'], $image_details[0] );
                    @unlink( $image_path );
                }
                wp_delete_attachment( $post_id, TRUE );
                $wpdb->query( "DELETE FROM $media_table_name WHERE post_id = $post_id;" );
            }
        }
        // If the tables exist
        if ( $media_table_exists && $used_media_table_exists ) {
            // Get the media
            $all_media = $wpdb->get_results( "SELECT * FROM $media_table_name" );
            $all_used_media = $wpdb->get_col( "SELECT DISTINCT(media_url) FROM $used_media_table_name" );
            // Create content array
            $unused = [];
            if ( count ( $all_used_media ) ) {        
                // Add content to array
                foreach ( $all_media as $media ) {
                    $matches = preg_grep( '`' . $media->media_url . '`', $all_used_media );
                    if ( ! $matches ) {
                        $unused[] = $media;
                    }
                }
            }
            // Return if content array is still empty
            if ( ! count( $unused ) ) : ?>
                <p>There is no unused media.</p>
            <?php else : ?>
                <div id="do-unused-media">
                    <form action="<?php echo admin_url( '/tools.php?page=do_view_unused_media' ) ?>" method="post">
                        
                        <input type="submit" name="submit" value="Delete Selected" />
                        <label for="unused-media-search">Search:</label> <input type="search" class="search" id="unused-media-search">
                        <span id="unused-media-count"><?php echo count( $unused ) ?></span>
                        <table border="0" width="100%" id="unused-media-table">
                            <thead>
                                <tr>
                                    <th style="text-align:left;background-color:#999;color:#fff"></th>
                                    <th style="text-align:left;background-color:#999;color:#fff"><input type="checkbox" name="select_n" id="select_n" /></th>
                                    <th id="media_url" data-sort="media_url" class="sort media_url" style="text-align:left;background-color:#999;color:#fff">Media URL</th>
                                </tr>
                            </thead>
                            <tbody class="list">
                                <?php $i = 0; ?>
                                <?php foreach ( $unused as $media ) : ?>
                                    <tr <?php echo $i % 2 ? 'style="background-color:#fefefe;"' : '' ?>>
                                        <td><?php echo $i + 1 ?></td>
                                        <td><input type="checkbox" class="delete-media" name="delete_media[]" value="<?php echo $media->post_id ?>" /></td>
                                        <td class="media_url" style="text-align:left;">
                                            <a href="<?php echo admin_url( '/post.php?post=' . $media->post_id . '&action=edit' ) ?>" target="_blank">
                                                <?php echo $media->media_url ?>
                                            </a>
                                        </td>
                                    </tr>
                                <?php $i++; ?>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                        <input type="submit" name="submit" value="Delete Selected" />
                    </form>
                </div>
            <?php endif;
        } else {
            echo 'Tables do not exist - refresh the data.';
        }
    } 
}
$do_unused_media = new DO_Unused_Media();