// Figures out whether a media file is an image or a video
const doVideoType = ( url: string ): string => {
    // If there's no video, get out
    if ( ! url ) {
        return '';
    }
    // Streaming
    if ( url.indexOf( 'vimeo' ) > -1 || url.indexOf( 'youtube' ) > -1 ) {
        return 'streaming';
    }
    // Embed
    else if ( url.indexOf( '.mp4' ) > -1 || url.indexOf( '.webm' ) > -1 ) {
        return 'embed';
    }
    // No idea
    else {
        return '';
    }
}
export default doVideoType;