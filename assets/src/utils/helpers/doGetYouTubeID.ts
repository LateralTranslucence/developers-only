import { doTrimChar } from '@/utils/helpers';

/**
 * Extracts the youtube id from a youtube url.
 * Returns false if the url is not recognized as a youtube url.
 * From https://github.com/lingtalfi/video-ids-and-thumbnails/blob/master/function.video.php
 */
const doGetYouTubeID = ( url: string ): string => {
    if ( ! url ) {
        return '';
    }
    const urlParts: URL = new URL( url );
    if ( urlParts.host ) {
        const host: string = urlParts.host;
        if ( host.indexOf( 'youtube' ) == -1 && host.indexOf( 'youtu.be' ) == -1 ) {
            return '';
        }
    }
    if ( urlParts.search ) {
        const params: URLSearchParams = new URLSearchParams( urlParts.search );
        const queryVarsV: string | null = params.get( 'v' );
        const queryVarsVi: string | null = params.get( 'vi' );
        if ( params.has( 'v' ) ) {
            return queryVarsV ? queryVarsV : '';
        } else if ( params.has( 'vi' ) ) {
            return queryVarsVi ? queryVarsVi : '';
        }
    }
    if ( urlParts.pathname ) {
        const urlPath: Array<string> = doTrimChar( urlParts.pathname, '/' ).split( '/' );
        const urlPathCount: number = urlPath.length;
        return urlPath[ urlPathCount - 1 ];
    }
    return '';
}
export default doGetYouTubeID;