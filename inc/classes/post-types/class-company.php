<?php
class Do_Company extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'do_company';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
            'post_title' => 'Name',
            'post_content' => 'Description',
            'post_excerpt' => 'Description',
            'post_thumbnail' => 'Logo',
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
                'Name' => 'text',
                'Logo' => 'media',
                'Description' => 'html',
                'About' => 'html',
                'Size' => 'int',
                'URL' => 'url',
                'Hidden' => 'binary',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Logo', 'Description', 'Hidden', 'post_date' ];
    }
    public function onsave( $POST, $cpt_object ) {
        global $wpdb;
        if ( isset( $POST['company_logo'] ) && strlen( $POST['company_logo'] ) ) {
            $logo_file = $POST['company_logo'];
            $logo_id = do_get_media_by_url( $logo_file, 'thumbnail', 'id' );
            update_post_meta( $logo_id, 'logo', TRUE );
            update_post_meta( $logo_id, 'logo_label', $POST['company_name'] );
            $wpdb->update( 
                // Table
                $wpdb->posts,
                // Data $column => $value
                [
                    'post_title' => $POST['company_name'],
                ],
                // Where $column => $value
                [ 'ID' => $logo_id ],
            );
        }
        return $POST;
    }
}
$do_company = Do_Company::get_instance();