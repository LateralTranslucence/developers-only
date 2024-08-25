import React from 'react';
import CTAs from 'src/components/shared/CTAs';
import CTA from 'src/components/shared/CTA';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/text-media.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import MetaFieldKeyMap from 'src/utils/types/MetaFieldKeyMap';
import Media from 'src/utils/types/Media';
import CTASettings from 'src/utils/types/CTASettings';

const TextMedia: React.FC<PanelLoaderProps> = ( { 
    data, 
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

    const media: Media = data.fields[ textMediaFieldKeys.media ] ? data.fields[ textMediaFieldKeys.media ] : {};
    const imageSize: string = data.fields[ textMediaFieldKeys.imageSize ] ? data.fields[ textMediaFieldKeys.imageSize ] : 'cinema_600';
    const imageLink: [ string, boolean ] = data.fields[ textMediaFieldKeys.imageLink ] ? data.fields[ textMediaFieldKeys.imageLink ] : [];
    const linkURL: string = imageLink[0] ? imageLink[0] : '';
    const linkModal: boolean = imageLink[1] ? imageLink[1] : false;
    const cta: CTASettings = data.fields[ textMediaFieldKeys.cta ] ? data.fields[ textMediaFieldKeys.cta ] : {};

    return (
        <>
        <CTA url={ linkURL } modal={ linkModal } classes={ [ 'text-media-link' ] }>
            <MediaLoader media={ media } size={ imageSize } wrapperDataAttr={ parallaxMediaEffect } videoDataAttr={ parallaxMediaEffect } />
        </CTA>
        { cta ? 
            <CTAs ctas={ cta } />
        : null }
        </>
    );
}
export default TextMedia;