import React from 'react';
import { doLength } from 'src/utils/helpers';
import MediaLoader from 'src/components/shared/MediaLoader';
import Gated from 'src/components/shared/Gated';
import 'assets/styles/components/report.scss';
import { PanelProps } from 'src/utils/types/PanelProps';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { Post } from 'src/utils/types/Post';
import { Media } from 'src/utils/types/Media';
import { GatedProps } from 'src/utils/types/GatedProps';

const Report: React.FC<PanelProps> = ( { 
    post, 
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
    const report: Post = post.fields[ reportFieldKeys.post ][0] ? post.fields[ reportFieldKeys.post ][0] : {};

    if ( report ) {
        // Media
        const customMedia: Media = post.fields[ reportFieldKeys.customMedia ] ? post.fields[ reportFieldKeys.customMedia ] : {};
        const media: Media = doLength( customMedia ) ? customMedia : report.post_thumbnail;

        // Gated props
        const gated: GatedProps = {
            post: report,
            pageID: pageID,
            panelID: panelID,
            panelNumber: panelNumber,
            panelPrefix: panelPrefix,
            panelSuffix: panelSuffix,
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