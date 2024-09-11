import React from 'react';
import { doLength } from 'src/utils/helpers';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/section-intro.scss';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { PanelProps } from 'src/utils/types/PanelProps';
import { Media } from 'src/utils/types/Media';

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