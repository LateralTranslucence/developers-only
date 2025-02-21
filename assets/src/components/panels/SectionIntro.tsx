import React from 'react';
import { doLength } from '@/utils/helpers';
import MediaLoader from '@/components/shared/MediaLoader';
import '@/styles/components/section-intro.scss';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { PanelProps } from '@/utils/types/PanelProps';
import { Media } from '@/utils/types/Media';

const SectionInro: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const sectionIntroFieldKeys: MetaFieldKeyMap = {
        media: panelPrefix + '_media' + panelSuffix,
    };
    const media: Media = post.fields[ sectionIntroFieldKeys.media ] ? post.fields[ sectionIntroFieldKeys.media ] : [];
    
    if ( doLength( media ) ) {
        return <MediaLoader media={ media } />;
    } else {
        return null;
    }
}
export default SectionInro;