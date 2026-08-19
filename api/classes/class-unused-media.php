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
        $view_data = new DO_Options_Screen( 'devo_view_unused_media' );
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
            $uploads_info = wp_upload_dir();
            $uploads_baseurl = $uploads_info['baseurl'];
            $uploads_basepath = (string) wp_parse_url( $uploads_baseurl, PHP_URL_PATH );
            $all_media = $wpdb->get_results( "SELECT * FROM $wpdb->posts WHERE post_type = 'attachment';");
            foreach ( $all_media as $media ) {
                // Normalise the GUID against this site's uploads URL.
                //
                // The host recorded in a GUID is whichever site the attachment was
                // created on, so a database copied between environments carries
                // stale hosts. Comparing on the path below /uploads sidesteps that
                // without needing to know what the other environments are called.
                $media_path = (string) wp_parse_url( $media->guid, PHP_URL_PATH );
                if ( strlen( $uploads_basepath ) && strpos( $media_path, $uploads_basepath ) === 0 ) {
                    $media_path = substr( $media_path, strlen( $uploads_basepath ) );
                }
                // Drop the extension so the entry matches every generated size of
                // the same upload. Anchored to the end so directories containing a
                // dot survive.
                $media_path = preg_replace( '/\.[^.\/]*$/', '', $media_path );
                // Add to All Media table
                $wpdb->insert( $media_table_name, [
                    'post_id' => $media->ID,
                    'post_date' => $media->post_date,
                    'post_title' => $media->post_title,
                    'post_type' => $media->post_type,
                    'media_url' => $uploads_baseurl . $media_path,
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
            // Capture the whole URL - up to whitespace, a quote or a markup
            // delimiter - rather than stopping at the first dot. Stopping early
            // truncated any filename containing a dot, so it no longer matched
            // the All Media entry and the file was reported as unused.
            $uploads_directory_regex = preg_quote( $uploads_directory, '`' ) . '[^\s"\'<>\\\\]*';
            // The same URL is stored two different ways. DO_Form_Field_Validate
            // json_encode()s every array-valued meta field - galleries, image
            // sets, CTAs - and json_encode escapes forward slashes, so those
            // rows hold https:\/\/site\/wp-content\/uploads\/... Matching only
            // the plain form missed them entirely, which meant media used in a
            // gallery was reported as unused and offered for deletion.
            $uploads_like = '%' . $wpdb->esc_like( $uploads_directory ) . '%';
            $uploads_like_json = '%' . $wpdb->esc_like( str_replace( '/', '\/', $uploads_directory ) ) . '%';
            $posts_used_media = $wpdb->get_results( $wpdb->prepare(
                "SELECT ID as post_id, post_content as content FROM $wpdb->posts WHERE post_content LIKE %s OR post_content LIKE %s",
                $uploads_like, $uploads_like_json
            ) );
            $postmeta_used_media = $wpdb->get_results( $wpdb->prepare(
                "SELECT post_id, meta_value as content FROM $wpdb->postmeta WHERE meta_value LIKE %s OR meta_value LIKE %s",
                $uploads_like, $uploads_like_json
            ) );
            $all_used_media = array_merge( $posts_used_media, $postmeta_used_media );
            foreach ( $all_used_media as $used_media ) {
                // Collapse JSON's escaped slashes so one pattern covers both
                // storage forms.
                $content = str_replace( '\/', '/', $used_media->content );
                $urls = preg_match_all( '`' . $uploads_directory_regex . '`', $content, $matches );
                if ( $urls !== FALSE ) {
                    foreach ( $matches[0] as $url ) {
                        // Same extension strip as the All Media side, so a single
                        // entry covers every generated size of one upload.
                        $wpdb->insert( $used_media_table_name, [
                            'post_id' => $used_media->post_id,
                            'media_url' => preg_replace( '/\.[^.\/]*$/', '', $url ),
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
        // Deletion runs in two steps: "Delete Selected" collects the choice and
        // shows what is about to go, and only the confirmation screen deletes.
        // This is permanent - wp_delete_attachment( $id, TRUE ) plus unlink of
        // every generated size - so it should not be reachable in one click.
        $pending_delete = [];
        $deleted_count = FALSE;
        if ( isset( $_POST['devo_unused_media_action'] ) ) {
            check_admin_referer( 'devo_unused_media', 'devo_unused_media_nonce' );
            if ( ! current_user_can( 'delete_posts' ) ) {
                wp_die( esc_html__( 'You are not allowed to delete media.', 'developers_only' ) );
            }
            $submitted_ids = isset( $_POST['delete_media'] ) && is_array( $_POST['delete_media'] )
                ? array_values( array_filter( array_map( 'absint', $_POST['delete_media'] ) ) )
                : [];
            // Only ever act on real attachments.
            $ids = [];
            foreach ( $submitted_ids as $submitted_id ) {
                if ( get_post_type( $submitted_id ) === 'attachment' ) {
                    $ids[] = $submitted_id;
                }
            }

            if ( $_POST['devo_unused_media_action'] === 'confirm' ) {
                $pending_delete = $ids;
            }
            elseif ( $_POST['devo_unused_media_action'] === 'delete' ) {
                $image_sizes = get_intermediate_image_sizes();
                $uploads_info = wp_upload_dir();
                $deleted_count = 0;
                foreach ( $ids as $post_id ) {
                    foreach ( $image_sizes as $size ) {
                        $image_details = wp_get_attachment_image_src( $post_id, $size );
                        if ( ! $image_details || ! isset( $image_details[0] ) ) {
                            continue;
                        }
                        $image_path = str_replace( $uploads_info['baseurl'], $uploads_info['basedir'], $image_details[0] );
                        // Never unlink outside the uploads directory, however the
                        // URL-to-path rewrite turned out.
                        if ( strpos( $image_path, $uploads_info['basedir'] ) === 0 && file_exists( $image_path ) ) {
                            unlink( $image_path );
                        }
                    }
                    wp_delete_attachment( $post_id, TRUE );
                    $wpdb->query( $wpdb->prepare( "DELETE FROM $media_table_name WHERE post_id = %d", $post_id ) );
                    $deleted_count++;
                }
            }
        }

        // Confirmation step - show exactly what will be deleted, then stop.
        if ( count( $pending_delete ) ) : ?>
            <div id="devo-unused-media">
                <h2><?php echo esc_html( sprintf(
                    /* translators: %d: number of attachments selected for deletion. */
                    _n( 'Permanently delete %d attachment?', 'Permanently delete %d attachments?', count( $pending_delete ), 'developers_only' ),
                    count( $pending_delete )
                ) ); ?></h2>
                <p><?php esc_html_e( 'This removes the attachment and every generated image size from disk. It cannot be undone.', 'developers_only' ); ?></p>
                <ul>
                    <?php foreach ( $pending_delete as $post_id ) : ?>
                        <li><?php echo esc_html( get_the_title( $post_id ) ); ?> &mdash; <code><?php echo esc_html( wp_get_attachment_url( $post_id ) ); ?></code></li>
                    <?php endforeach; ?>
                </ul>
                <form action="<?php echo esc_url( admin_url( '/tools.php?page=devo_view_unused_media' ) ) ?>" method="post">
                    <?php wp_nonce_field( 'devo_unused_media', 'devo_unused_media_nonce' ); ?>
                    <?php foreach ( $pending_delete as $post_id ) : ?>
                        <input type="hidden" name="delete_media[]" value="<?php echo esc_attr( $post_id ) ?>" />
                    <?php endforeach; ?>
                    <button type="submit" name="devo_unused_media_action" value="delete" class="button button-primary">
                        <?php esc_html_e( 'Yes, delete permanently', 'developers_only' ); ?>
                    </button>
                    <a href="<?php echo esc_url( admin_url( '/tools.php?page=devo_view_unused_media' ) ) ?>" class="button"><?php esc_html_e( 'Cancel', 'developers_only' ); ?></a>
                </form>
            </div>
        <?php return;
        endif;

        if ( $deleted_count !== FALSE ) : ?>
            <div class="notice notice-success"><p><?php echo esc_html( sprintf(
                /* translators: %d: number of attachments deleted. */
                _n( '%d attachment deleted.', '%d attachments deleted.', $deleted_count, 'developers_only' ),
                $deleted_count
            ) ); ?></p></div>
        <?php endif;
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
                    // preg_quote: the stored value is a URL, not a pattern. An
                    // unescaped filename containing +, (, or ? would either fail
                    // to compile or match the wrong rows - and a wrong answer here
                    // means offering someone's live media for deletion.
                    $matches = preg_grep( '`' . preg_quote( $media->media_url, '`' ) . '`', $all_used_media );
                    if ( ! $matches ) {
                        $unused[] = $media;
                    }
                }
            }
            // Return if content array is still empty
            if ( ! count( $unused ) ) : ?>
                <p>There is no unused media.</p>
            <?php else : ?>
                <div id="devo-unused-media">
                    <form action="<?php echo esc_url( admin_url( '/tools.php?page=devo_view_unused_media' ) ) ?>" method="post">
                        <?php wp_nonce_field( 'devo_unused_media', 'devo_unused_media_nonce' ); ?>
                        <button type="submit" name="devo_unused_media_action" value="confirm" class="button"><?php esc_html_e( 'Delete Selected', 'developers_only' ); ?></button>
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
$devo_unused_media = new DO_Unused_Media();