import React from 'react';
import { ImageProps } from '@/utils/types/ImageProps';
import { Media, MediaItem } from '@/utils/types/Media';
import { doLength } from '@/utils/helpers';
import '@/styles/components/image.scss';

const Image: React.FC<ImageProps> = ( { 
    image, 
    classes = [], 
    fullWidthSVG = false, 
    height,
    id = '', 
    imageDataAttr = {}, 
    mobileImage,
    overlay = false, 
    size = '', 
    url = '', 
    width,
    wrapperDataAttr = {}, 
} ) => {
    const type = image.type;
    const finalSize: string | undefined = type === 'image' ? ( size ? size : 'full' ) : undefined;
    const sizedImage: MediaItem | Media | undefined = finalSize ? ( image[ size ] ? image[ size ] as MediaItem : undefined ) : image;
    if ( doLength( sizedImage ) || doLength( url ) ) {
        const isIcon: boolean = type === 'icon';
        const wrapperClasses = classes;
        wrapperClasses.push( 'do-image-wrapper' );
        const imageURL: string = sizedImage ? ( isIcon ? '' : ( sizedImage.url ? sizedImage.url as string : '' ) ) : ( url ? url : '' );
        const imageIsSVG: boolean = isIcon ? true : imageURL.indexOf( '.svg' ) > -1;
        const imageWidth: number | undefined = isIcon ? 50 : ( width ? width : ( sizedImage ? sizedImage.width as number : undefined ) );
        const imageHeight: number | undefined = isIcon ? 50 : ( height ? height : ( sizedImage ? sizedImage.height as number : undefined ) );
        const useImagePadding: boolean = imageIsSVG || [ 'full', 'large', 'medium', 'small' ].indexOf( size ) > -1 || Boolean( width );
        const mobileImageDetails: MediaItem | undefined = mobileImage && image[ mobileImage ] ? image[ mobileImage ] as MediaItem : ( ! isIcon && imageWidth && imageWidth >= 600 ? image[ size.replace( /(600|1000)/, '400' ) ] as MediaItem : undefined );
        const mobileImageURL: string | undefined = mobileImageDetails ? mobileImageDetails.url : ( isIcon ? undefined : imageURL );
        const imageClasses: Array<string> = [ 'do-image' ];
        imageClasses.push( size );
        if ( id ) {
            wrapperDataAttr.id = id;
        }
        if ( overlay ) {
            imageClasses.push( 'overlay' );
        }
        if ( imageIsSVG ) {
            wrapperClasses.push( 'do-svg-wrapper' );
            imageClasses.push( 'do-svg' );
        } else {
            imageClasses.push( 'do-raster' );
        }
        if ( imageIsSVG && fullWidthSVG ) {
            wrapperClasses.push( 'do-svg-fullwidth' );
        }
        if ( isIcon ) {
            imageClasses.push( 'do-icon' );
        }
        let styleObject: Record<string, string>;
        if ( isIcon && sizedImage ) {
            const blue: MediaItem = (sizedImage as Media).blue as MediaItem;
            const navy: MediaItem = (sizedImage as Media).navy as MediaItem;
            const teal: MediaItem = (sizedImage as Media).teal as MediaItem;
            const white: MediaItem = (sizedImage as Media).white as MediaItem;
            const yellow: MediaItem = (sizedImage as Media).yellow as MediaItem;
            styleObject = { 
                '--icon-blue': `url( ${ blue.url } )`, 
                '--icon-navy': `url( ${ navy.url } )`, 
                '--icon-teal': `url( ${ teal.url } )`, 
                '--icon-white': `url( ${ white.url } )`, 
                '--icon-yellow': `url( ${ yellow.url } )`, 
            };
        } else {
            styleObject = { 
                '--background-image': `url( ${ imageURL } )`, 
                '--mobile-background-image': `url("${ mobileImageURL }")`,
            };
        }
        if ( useImagePadding && imageHeight && imageWidth ) {
            styleObject.paddingTop = ( imageHeight / imageWidth ) * 100 + '%'
        }
        return (
            <span className={ wrapperClasses.join( ' ' ) } style={ { width: imageWidth ? imageWidth + 'px' : '' } } { ...wrapperDataAttr }>
                <figure className={ imageClasses.join( ' ' ) } style={ styleObject } { ...imageDataAttr }></figure>
            </span>
        )
    } else {
        return null;
    }
}
export default Image;