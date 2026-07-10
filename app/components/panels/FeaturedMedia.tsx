import React from 'react';
import { Media } from '@/utils/types/Media';
import { PanelProps } from '@/utils/types/PanelProps';
import { getBooleanField, getMediaField, getObjectField, length } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/featured-media.scss';
import { ImageLink } from '@/utils/types/ImageLink';

const FeaturedMedia:React.FC<PanelProps> = ( { 
    post, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const media: Media = getMediaField( post.fields, panelPrefix + '_media' + panelSuffix );
    const imageLink = getObjectField<ImageLink>( post.fields, panelPrefix + '_image_link' + panelSuffix );
    const url: string = imageLink.url ? imageLink.url : '';
    const modal: boolean = Boolean( imageLink.modal );

    if ( length( media ) ) {
        return (
            <CTA url={ url } modal={ modal }>
                <MediaLoader media={ media } size='cinema_1000' />
            </CTA>
        );
    } else {
        return null;
    }
};
export default FeaturedMedia;