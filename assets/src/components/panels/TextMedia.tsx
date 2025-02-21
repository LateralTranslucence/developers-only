import React from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import { ImageLink } from '@/utils/types/ImageLink';
import { Media } from '@/utils/types/Media';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { PanelProps } from '@/utils/types/PanelProps';
import CTA from '@/components/shared/CTA';
import CTAs from '@/components/shared/CTAs';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/text-media.scss';

const TextMedia: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = '',
    parallaxMediaEffect = {},
} ): JSX.Element => {
    const textMediaFieldKeys: MetaFieldKeyMap = {
        media: panelPrefix + '_media' + panelSuffix,
        imageSize: panelPrefix + '_image_size' + panelSuffix,
        imageLink: panelPrefix + '_image_link' + panelSuffix,
        cta: panelPrefix + '_cta' + panelSuffix,
    };

    const media: Media = post.fields[ textMediaFieldKeys.media ] ? post.fields[ textMediaFieldKeys.media ] : {};
    const imageSize: string = post.fields[ textMediaFieldKeys.imageSize ] ? post.fields[ textMediaFieldKeys.imageSize ] : 'cinema_600';
    const imageLink: ImageLink = post.fields[ textMediaFieldKeys.imageLink ] ? post.fields[ textMediaFieldKeys.imageLink ] : [];
    const cta: Array<CTASettings> = post.fields[ textMediaFieldKeys.cta ] ? post.fields[ textMediaFieldKeys.cta ] : [];
    return (
        <>
        <CTA url={ imageLink.url } modal={ imageLink.modal } classes={ [ 'text-media-link' ] }>
            <MediaLoader media={ media } size={ imageSize } wrapperDataAttr={ parallaxMediaEffect } videoDataAttr={ parallaxMediaEffect } />
        </CTA>
        { cta ? 
            <CTAs ctas={ cta } />
        : null }
        </>
    );
}
export default TextMedia;