import BackgroundSettings from 'src/utils/types/BackgroundSettings';
import { Media, MediaType } from 'src/utils/types/Media';

const doPanelClasses = ( settings: BackgroundSettings ): Array<string> => {
    const backgroundOverlay: boolean = settings.overlay ? settings.overlay : false;
    const backgroundColor: string = settings.color && settings.color.length ? settings.color : '';
    const backgroundMedia: Media | null = settings.media ? settings.media : null;
    const backgroundMediaType: MediaType | null = backgroundMedia ? backgroundMedia.type : null;
    const avatar: boolean = settings.avatar ? settings.avatar : false;
    const animated: boolean = settings.animated ? settings.animated : false;
    const elementClasses: Array<string> = [];
    if ( backgroundOverlay || backgroundColor || backgroundMedia ) {
        elementClasses.push( 'has-background' );
    }
    if ( backgroundOverlay ) {
        elementClasses.push( 'overlay-' + backgroundOverlay );
    }
    if ( backgroundMediaType === 'video' ) {
        elementClasses.push( 'has-video-controls' );
    }
    if ( backgroundColor ) {
        elementClasses.push( 'color-' + backgroundColor );
    }
    if ( avatar && ! animated ) {
        elementClasses.push( 'has-avatar' );
    }
    return elementClasses;
}
export default doPanelClasses;