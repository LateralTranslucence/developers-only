<?php

class DO_Icon extends DO_Custom_Post_Type {
    protected function post_type(): string {
        return 'devo_icon';
    }
    protected function post_type_args(): array {
        return [];
    }
    protected function settings(): array {
        return [
            'post_title'       => 'Label',
            'has_archive'      => FALSE,
            'noindex'          => TRUE,
            'show_in_menu'     => 'themes.php',
            'show_in_admin_bar' => FALSE,
            'hide_field'       => 'Hidden',
            'onsave_callback'  => [ $this, 'onsave' ],
        ];
    }
    protected function meta_fields(): array {
        return [
            'Icon' => [
                'Label'    => 'text',
                'File'     => 'media',
                'Keywords' => 'textarea',
                'Hidden'   => 'binary',
                'Preview'  => 'hidden',
            ],
        ];
    }
    protected function admin_fields(): array {
        return [ 'Title', 'Preview', 'Hidden', 'post_date' ];
    }

    public function onsave( $POST, $cpt_object ) {
        global $wpdb;
        if ( empty( $POST['icon_file'] ) ) return $POST;

        $attachment_id = devo_get_media_by_url( $POST['icon_file'], 'thumbnail', 'id' );
        if ( ! $attachment_id ) return $POST;

        $file_path = get_attached_file( $attachment_id );
        if ( $file_path && strtolower( pathinfo( $file_path, PATHINFO_EXTENSION ) ) === 'svg' ) {
            $svg = file_get_contents( $file_path );
            if ( $svg !== false && strpos( $svg, 'currentColor' ) === false ) {
                file_put_contents( $file_path, $this->replace_with_current_color( $svg ) );
            }
        }

        update_post_meta( $attachment_id, 'icon', TRUE );
        update_post_meta( $attachment_id, 'icon_label', $POST['icon_label'] );
        $wpdb->update(
            $wpdb->posts,
            [
                'post_title'   => $POST['icon_label'],
                'post_content' => $POST['icon_keywords'],
            ],
            [ 'ID' => $attachment_id ],
        );

        $POST['icon_preview'] = $POST['icon_file'];
        return $POST;
    }

    private function replace_with_current_color( $svg ) {
        $black = '(?:#(?:000000|000)|black|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\))';
        $svg = preg_replace( '/(fill|stroke)=["\']' . $black . '["\']/', '$1="currentColor"', $svg );
        $svg = preg_replace( '/\b(fill|stroke)\s*:\s*' . $black . '/', '$1:currentColor', $svg );
        // If the root <svg> has no fill attribute, add one so child elements inherit currentColor
        if ( ! preg_match( '/<svg[^>]*\bfill\s*=/', $svg ) ) {
            $svg = preg_replace( '/(<svg\b)/', '$1 fill="currentColor"', $svg, 1 );
        }
        return $svg;
    }
}
$devo_icon = DO_Icon::get_instance();
