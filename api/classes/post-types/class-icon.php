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

        $POST['icon_preview'] = $POST['icon_file'];
        // Everything below edits the attachment (its file, title, content and
        // meta), which may be someone else's upload. Leave it alone unless
        // this user could edit it in the media library.
        if ( ! current_user_can( 'edit_post', $attachment_id ) ) return $POST;

        $file_path = get_attached_file( $attachment_id );
        if ( $file_path && strtolower( pathinfo( $file_path, PATHINFO_EXTENSION ) ) === 'svg' ) {
            $svg = file_get_contents( $file_path );
            if ( $svg !== false && strpos( $svg, 'currentColor' ) === false ) {
                file_put_contents( $file_path, $this->replace_with_current_color( $svg ) );
            }
        }

        update_post_meta( $attachment_id, 'icon', TRUE );
        update_post_meta( $attachment_id, 'icon_label', $POST['icon_label'] );
        // $POST is still slashed. update_post_meta() unslashes for itself, but
        // $wpdb->update() writes what it's given, so "O'Brien" would be saved
        // as "O\'Brien".
        $wpdb->update(
            $wpdb->posts,
            [
                'post_title'   => wp_unslash( $POST['icon_label'] ),
                'post_content' => wp_unslash( $POST['icon_keywords'] ),
            ],
            [ 'ID' => $attachment_id ],
        );
        clean_post_cache( $attachment_id );

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
