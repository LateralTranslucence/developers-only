import React from 'react';
import { CTASettings } from 'src/utils/types/CTASettings';
import { ImageLink } from 'src/utils/types/ImageLink';
import { Media } from 'src/utils/types/Media';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { PanelProps } from 'src/utils/types/PanelProps';
import CTA from 'src/components/shared/CTA';
import CTAs from 'src/components/shared/CTAs';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/text-media.scss';

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
    const cta: CTASettings = post.fields[ textMediaFieldKeys.cta ] ? post.fields[ textMediaFieldKeys.cta ] : {};

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