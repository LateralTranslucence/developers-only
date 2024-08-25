import React from 'react';
import { doLength } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/featured-media.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import Media from 'src/utils/types/Media';

const FeaturedMedia:React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const featuredFieldKeys: Record<string, string> = {
        media: panelPrefix + '_media' + panelSuffix,
        image_link: panelPrefix + '_image_link' + panelSuffix,
        full_width_svg: panelPrefix + '_fullwidth_svg' + panelSuffix,
    };
    const media: Media = data.fields[ featuredFieldKeys.media ] ? data.fields[ featuredFieldKeys.media ] : {};
    const url: string = data.fields[ featuredFieldKeys.image_link ] ? data.fields[ featuredFieldKeys.image_link ].url : '';
    const modal: boolean = data.fields[ featuredFieldKeys.image_link ] ? Boolean( data.fields[ featuredFieldKeys.image_link ].modal ) : false;
    const fullWidthSVG: boolean = data.fields[ featuredFieldKeys.full_width_svg ] ? data.fields[ featuredFieldKeys.full_width_svg ] : false;

    if ( doLength( media ) ) {
        return (
            <CTA url={ url } modal={ modal }>
                <MediaLoader media={ media } size='cinema_1000' fullWidthSVG={ fullWidthSVG } />
            </CTA>
        );
    } else {
        return null;
    }
}
export default FeaturedMedia;