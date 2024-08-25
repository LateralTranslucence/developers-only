import React from 'react';
import Image from 'src/components/shared/Image';
import Video from 'src/components/shared/Video';
import Media from 'src/utils/types/Media';

const MediaLoader: React.FC<Record<string, any>> = ( props ) => {
    const media: Media = props.media;
    const mediaType: string = media.type;
    if ( mediaType === 'image' || mediaType === 'icon' ) {
        return <Image image={ media } { ...props } />;
    } else if ( mediaType === 'video' ) {
        return <Video url={ media.url } { ...props } />;
    } else {
        return null;
    }
}
export default MediaLoader;