import React from 'react';
import Icon from '@/components/shared/Icon';
import Image from '@/components/shared/Image';
import Video from '@/components/shared/Video';
import { Media } from '@/utils/types/Media';
import { ImageProps } from '@/utils/types/ImageProps';
import { VideoProps } from '@/utils/types/VideoProps';

interface MediaLoaderProps extends Partial<VideoProps> {
    [ key: string ]: unknown;
    id?: string;
    loop?: boolean;
    media: Media;
    mobileImage?: string;
    size?: string;
}

const MediaLoader: React.FC<MediaLoaderProps> = ( props ) => {
    const media: Media = props.media;
    const mediaType: string = media.type;
    if ( mediaType === 'icon' ) {
        return <Icon media={ media } />;
    } else if ( mediaType === 'image' ) {
        return <Image image={ media } { ...( props as unknown as Omit<ImageProps, 'image'> ) } />;
    } else if ( mediaType === 'video' ) {
        return <Video url={ media.url as string } { ...props } />;
    } else {
        return null;
    }
};
export default MediaLoader;
