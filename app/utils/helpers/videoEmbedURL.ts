import { getVimeoID, getYouTubeID } from '@/utils/helpers';

const videoEmbedURL = ( url: string = '' ): string => {
    const source: string = url.indexOf( 'vimeo' ) > -1 ? 'vimeo' : 'youtube';
    const id: string = url.indexOf( 'vimeo' ) > -1 ? getVimeoID( url ) : getYouTubeID( url );
    if ( id ) {
        return source == 'vimeo'
            ? 'https://player.vimeo.com/video/' + id + '?loop=0&title=0&byline=0'
            : 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0';
    }
    return url;
};
export default  videoEmbedURL;