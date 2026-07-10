import React from 'react';
import { ImageProps } from '@/utils/types/ImageProps';
import { Media, MediaItem } from '@/utils/types/Media';
import '@/styles/components/image.scss';

const Image: React.FC<ImageProps> = ( {
    classes = [],
    image,
    size = '',
    url = '',
} ) => {
    const type = image.type;
    const finalSize: string | undefined = type === 'image' ? ( size ? size : 'full' ) : undefined;
    const sizedImage: MediaItem | Media | undefined = finalSize ? ( image[ finalSize ] ? image[ finalSize ] as MediaItem : undefined ) : image;
    if ( sizedImage || url ) {
        const isIcon: boolean = type === 'icon';
        const wrapperClasses = [ 'image', ...classes ];
        const imageURL: string = sizedImage ? ( isIcon ? '' : ( sizedImage.url ? sizedImage.url as string : '' ) ) : ( url ? url : '' );
        const imageIsSVG: boolean = isIcon ? true : imageURL.indexOf( '.svg' ) > -1;
        const imageClasses: Array<string> = [ 'image' ];

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
                <img className={ imageClasses.join( ' ' ) } src={imageURL} />
            </figure>
        );
    } else {
        return null;
    }
};
export default Image;
