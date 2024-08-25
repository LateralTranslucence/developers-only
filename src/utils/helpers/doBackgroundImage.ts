import BackgroundSettings from 'src/utils/types/BackgroundSettings';
import CustomAttributes from 'src/utils/types/CustomAttributes';
import { Media, MediaItem, MediaType } from 'src/utils/types/Media';

const doBackgroundImage = ( settings: BackgroundSettings = {}, classes: Array<string> = [] ): CustomAttributes => {
    const allMedia: Media | undefined = settings.media;
    const backgroundMedia: MediaItem | undefined = allMedia ? allMedia.background as MediaItem : undefined;
    const backgroundOverlay: boolean = settings.overlay as boolean;
    const backgroundColor: string | undefined = settings.color;
    const backgroundParallax: string | undefined = settings.parallax;
    const backgroundMediaType: MediaType | undefined = settings.media ? settings.media.type : undefined;
    const avatar: boolean = settings.avatar as boolean;
    const animated: boolean = settings.animated as boolean;
    if ( backgroundOverlay ) {
        classes.push( 'overlay-' + backgroundOverlay );
    }
    if ( backgroundMediaType === 'video' ) {
        classes.push( 'has-video-controls' );
    }
    const styleAttribute: CustomAttributes = {};
    const outputAttributes: CustomAttributes = {};
    if ( backgroundMediaType === 'image' ) {
        const imageURL: string | undefined = backgroundMedia ? backgroundMedia.url : undefined;
        const mobileImageDetails: MediaItem | MediaType | undefined = allMedia ? allMedia.background_mobile as MediaItem : undefined;
        const mobileImageURL: string | undefined = mobileImageDetails && mobileImageDetails.url ? mobileImageDetails.url : imageURL;
        styleAttribute[ '--background-image' ] = 'url(' + imageURL + ')';
        styleAttribute[ '--mobile-background-image' ] = 'url(' + mobileImageURL + ')';
    }
    if ( backgroundColor ) {
        classes.push( 'color-' + backgroundColor );
    }
    if ( avatar && ! animated ) {
        classes.push( 'has-avatar' );
    }
    if ( styleAttribute ) {
        outputAttributes.style = styleAttribute;
    }
    if ( backgroundParallax ) {
        outputAttributes[ 'uk-parallax' ] = 'bgy: ' + backgroundParallax;
    }
    if ( classes.length ) {
        outputAttributes.className = classes.join( ' ' );
    }
    return outputAttributes;
}
export default doBackgroundImage;