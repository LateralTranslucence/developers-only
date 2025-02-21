import React from 'react';
import { Media } from '@/utils/types/Media';
import { PanelProps } from '@/utils/types/PanelProps';
import { doLength } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/featured-media.scss';

const FeaturedMedia:React.FC<PanelProps> = ( { 
    post, 
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
    const media: Media = post.fields[ featuredFieldKeys.media ] ? post.fields[ featuredFieldKeys.media ] : {};
    const url: string = post.fields[ featuredFieldKeys.image_link ] ? post.fields[ featuredFieldKeys.image_link ].url : '';
    const modal: boolean = post.fields[ featuredFieldKeys.image_link ] ? Boolean( post.fields[ featuredFieldKeys.image_link ].modal ) : false;
    const fullWidthSVG: boolean = post.fields[ featuredFieldKeys.full_width_svg ] ? post.fields[ featuredFieldKeys.full_width_svg ] : false;

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