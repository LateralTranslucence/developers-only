// Determine url type - pdf, image, video, page
const doURLType = ( url: string ): string => {
    // Image
    if ( 
        url.indexOf( '.jpg' ) > -1 || 
        url.indexOf( '.jpeg' ) > -1 || 
        url.indexOf( '.png' ) > -1 || 
        url.indexOf( '.gif' ) > -1 || 
        url.indexOf( '.bmp' ) > -1 || 
        url.indexOf( '.svg' ) > -1 || 
        url.indexOf( '.webp' ) > -1 
    ) {
        return 'image';
    }
    // Video
    else if ( 
        url.indexOf( 'vimeo' ) > -1 || 
        url.indexOf( 'youtube' ) > -1 || 
        url.indexOf( '.mp4' ) > -1 || 
        url.indexOf( '.webm' ) > -1 
    ) {
        return 'video';
    }
    // PDF
    else if ( url.indexOf( '.pdf' ) > -1 ) {
        return 'pdf';
    }
    // Must just be a webpage
    else {
        return 'page';
    }
}
export default doURLType;