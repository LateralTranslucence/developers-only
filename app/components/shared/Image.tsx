import React from 'react';
import { ImageProps } from '@/utils/types/ImageProps';
import { Media, MediaItem } from '@/utils/types/Media';
import '@/styles/components/image.scss';

// A positive pixel dimension from the media data ('' when WordPress has none)
const dimension = ( value: unknown ): number | undefined => {
    const number = Number( value );
    return Number.isFinite( number ) && number > 0 ? number : undefined;
};

const Image: React.FC<ImageProps> = ( {
    alt,
    classes = [],
    image,
    loading = 'lazy',
    size = '',
    url = '',
} ) => {
    const type = image?.type;
    const finalSize: string | undefined = type === 'image' ? ( size ? size : 'full' ) : undefined;
    // Fall back to 'full' if the requested size doesn't exist on this media
    // object (e.g. a size that isn't registered via add_image_size)
    const sizedImage: MediaItem | Media | undefined = image ? ( finalSize ? ( ( image[ finalSize ] ?? image[ 'full' ] ) as MediaItem | undefined ) : image ) : undefined;
    if ( sizedImage || url ) {
        const isIcon: boolean = type === 'icon';
        const wrapperClasses = [ 'image', ...classes ];
        const imageURL: string = sizedImage ? ( isIcon ? '' : ( sizedImage.url ? sizedImage.url as string : '' ) ) : ( url ? url : '' );
        const imageIsSVG: boolean = isIcon ? true : imageURL.indexOf( '.svg' ) > -1;
        const imageClasses: Array<string> = [ 'image' ];
        // Media data's own alt text wins; without either, the image is treated
        // as decorative (alt="") rather than having its file name read out.
        const altText: string = ( typeof image?.alt === 'string' && image.alt ) || alt || '';

        // An empty media field ({}) or an icon has no file to show here
        if ( ! imageURL ) {
            return null;
        }

        if ( imageIsSVG ) {
            wrapperClasses.push( 'svg-wrapper' );
            imageClasses.push( 'svg' );
        }
        if ( size ) {
            wrapperClasses.push( size );
            imageClasses.push( size );
        }
        return (
            <figure className={ wrapperClasses.join( ' ' ) }>
                <img
                    alt={ altText }
                    className={ imageClasses.join( ' ' ) }
                    decoding="async"
                    height={ dimension( sizedImage?.height ) }
                    loading={ loading }
                    src={ imageURL }
                    width={ dimension( sizedImage?.width ) } />
            </figure>
        );
    } else {
        return null;
    }
};
export default Image;
