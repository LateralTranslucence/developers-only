import React from 'react';
import { doLength } from 'src/utils/helpers';
import MediaLoader from 'src/components/shared/MediaLoader';
import Gated from 'src/components/shared/Gated';
import 'assets/styles/components/report.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import MetaFieldKeyMap from 'src/utils/types/MetaFieldKeyMap';
import Post from 'src/utils/types/Post';
import Media from 'src/utils/types/Media';

const Report: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const reportFieldKeys: MetaFieldKeyMap = {
        ctaText: panelPrefix + '_cta_text' + panelSuffix,
        ctaColor: panelPrefix + '_cta_color' + panelSuffix,
        customMedia: panelPrefix + '_custom_media' + panelSuffix,
        post: panelPrefix + '_post' + panelSuffix,
    };

    // The Report
    const report: Post = data.fields[ reportFieldKeys.post ][0] ? data.fields[ reportFieldKeys.post ][0] : {};

    if ( report ) {
        // Media
        const customMedia: Media = data.fields[ reportFieldKeys.customMedia ] ? data.fields[ reportFieldKeys.customMedia ] : {};
        const media: Media = doLength( customMedia ) ? customMedia : report.post_thumbnail;

        // Gated props
        const gated: Record<string, any> = {
            post: report,
            pageID: pageID,
            panelID: panelID,
        }
        
        return (
            <>
                { media ?
                    <MediaLoader media={ media } size="vertical_400" />
                : null }
                <Gated { ...gated } />
            </>
        )
    } else {
        return null;
    }
}
export default Report;