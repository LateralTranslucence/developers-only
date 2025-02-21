import React from 'react';
import { doLength } from '@/utils/helpers';
import MediaLoader from '@/components/shared/MediaLoader';
import Gated from '@/components/shared/Gated';
import '@/styles/components/report.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { Post } from '@/utils/types/Post';
import { Media } from '@/utils/types/Media';
import { GatedProps } from '@/utils/types/GatedProps';

const Download: React.FC<PanelProps> = ( { 
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
export default Download;