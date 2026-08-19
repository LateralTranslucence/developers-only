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
        // The Background field now stores a hex value, which is applied as an
        // inline style rather than through a class - `color-#0a0a0a` is not a
        // valid selector. Named values (from before the field changed) still get
        // their modifier so existing styling keeps working.
        if ( ! backgroundColor.startsWith( '#' ) ) {
            elementClasses.push( 'color-' + backgroundColor );
        }
        elementClasses.push( 'has-background-color' );
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
