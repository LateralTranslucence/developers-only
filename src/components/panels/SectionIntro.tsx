import React from 'react';
import { doLength } from 'src/utils/helpers';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/section-intro.scss';
import MetaFieldKeyMap from 'src/utils/types/MetaFieldKeyMap';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import Media from 'src/utils/types/Media';

const SectionInro: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const sectionIntroFieldKeys: MetaFieldKeyMap = {
        media: panelPrefix + '_media' + panelSuffix,
    };
    const media: Media = data.fields[ sectionIntroFieldKeys.media ] ? data.fields[ sectionIntroFieldKeys.media ] : [];
    
    if ( doLength( media ) ) {
        return <MediaLoader media={ media } />;
    } else {
        return null;
    }
}
export default SectionInro;