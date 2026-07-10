import { BackgroundProps } from '@/utils/types/BackgroundProps';
import { Media, MediaType } from '@/utils/types/Media';

const panelClasses = ( settings: BackgroundProps ): Array<string> => {
    const backgroundOverlay: boolean = settings.overlay ? settings.overlay : false;
    const backgroundColor: string = settings.color && settings.color.length ? settings.color : '';
    const backgroundEffect: string | undefined = settings.effect ? settings.effect : undefined;
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
    if ( backgroundEffect ) {
        elementClasses.push( 'effect', backgroundEffect );
    }
    if ( avatar && ! animated ) {
        elementClasses.push( 'has-avatar' );
    }
    return elementClasses;
};
export default panelClasses;
