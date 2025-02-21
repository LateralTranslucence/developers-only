import { doGetVimeoID, doGetYouTubeID } from '@/utils/helpers';

const doVideoEmbedURL = ( url: string = '' ): string => {
    const source: string = url.indexOf( 'vimeo' ) > -1 ? 'vimeo' : 'youtube';
    const id: string = url.indexOf( 'vimeo' ) > -1 ? doGetVimeoID( url ) : doGetYouTubeID( url );
    if ( id ) {
        return source == 'vimeo'
            ? 'https://player.vimeo.com/video/' + id + '?loop=0&title=0&byline=0'
            : 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0';
    }
    return url;
}
export default  doVideoEmbedURL;