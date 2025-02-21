<?php
class Do_Icon extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'do_icon';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
            'post_title' => 'Label',
            'has_archive' => FALSE,
            'noindex' => TRUE,
            'show_in_menu' => 'themes.php',
            'show_in_admin_bar' => FALSE,
            'hide_field' => 'Hidden',
            'onsave_callback' => [ $this, 'onsave' ],
        ];
    }
    // [ 'BoxName' => [ ... ] ]
    protected function meta_fields(): array {
        return [
            '' => [
                'Label' => 'text',
                'Files' => [
                    'type' => 'multi',
                    'fields' => [
                        'Blue' => 'media',
                        'Navy' => 'media',
                        'Teal' => 'media',
                        'White' => 'media',
                        'Yellow' => 'media',
                    ],
                ],
                'Keywords' => 'textarea',
                'Hidden' => 'binary',
                'Preview' => 'hidden',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Preview', 'Hidden', 'post_date' ];
    }
    public function onsave( $POST, $cpt_object ) {
        global $wpdb;
        if ( isset( $POST['icon_files'] ) && count( $POST['icon_files'] ) ) {
            foreach ( $POST['icon_files'] as $icon_color => $icon_file ) {
                $icon_id = do_get_media_by_url( $icon_file, 'thumbnail', 'id' );
                update_post_meta( $icon_id, 'icon', TRUE );
                update_post_meta( $icon_id, 'icon_color', $icon_color );
                update_post_meta( $icon_id, 'icon_label', $POST['icon_label'] );
                $wpdb->update( 
                    // Table
                    $wpdb->posts,
                    // Data $column => $value
                    [
                        'post_title' => $POST['icon_label'],
                        'post_content' => $POST['icon_keywords'],
                    ],
                    // Where $column => $value
                    [ 'ID' => $icon_id ],
                );
                if ( $icon_color === 'navy' ) {
                    $POST['icon_preview'] = $icon_file;
                }
            }
        }
        return $POST;
    }
}
$do_icon = Do_Icon::get_instance();