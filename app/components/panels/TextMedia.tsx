import React, { JSX } from 'react';
import { getArrayField, getStringField } from '@/utils/helpers';
import { CTASettings } from '@/utils/types/CTASettings';
import { ImageLink } from '@/utils/types/ImageLink';
import { Media } from '@/utils/types/Media';
import { PanelProps } from '@/utils/types/PanelProps';
import CTA from '@/components/shared/CTA';
import CTAs from '@/components/shared/CTAs';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/text-media.scss';

const TextMedia: React.FC<PanelProps> = ( { 
    post, 
    panelPrefix = '', 
    panelSuffix = '',
    parallaxMediaEffect = {},
} ): JSX.Element => {
    const media = ( post.fields[ panelPrefix + '_media' + panelSuffix ] ?? {} ) as Media;
    const imageSize = getStringField( post.fields, panelPrefix + '_image_size' + panelSuffix, 'cinema_600' );
    const imageLink = ( post.fields[ panelPrefix + '_image_link' + panelSuffix ] ?? {} ) as ImageLink;
    const ctas = getArrayField<CTASettings>( post.fields, panelPrefix + '_ctas' + panelSuffix );
    return (
        <>
        <CTA url={ imageLink.url } modal={ imageLink.modal } classes={ [ 'text-media__link' ] }>
            <MediaLoader media={ media } size={ imageSize } wrapperDataAttr={ parallaxMediaEffect } videoDataAttr={ parallaxMediaEffect } />
        </CTA>
        { ctas ? 
            <CTAs ctas={ ctas } />
        : null }
        </>
    );
};
export default TextMedia;