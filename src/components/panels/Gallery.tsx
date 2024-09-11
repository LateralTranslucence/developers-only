import React from 'react';
import { doLength } from 'src/utils/helpers';
import CTAs from 'src/components/shared/CTAs';
import CTA from 'src/components/shared/CTA';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/gallery.scss';
import { PanelProps } from 'src/utils/types/PanelProps';
import { CTASettings } from 'src/utils/types/CTASettings';

const Gallery: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const galleryFieldKeys: Record<string, string> = {
        media: panelPrefix + '_media_gallery' + panelSuffix,
        cta: panelPrefix + '_cta' + panelSuffix,
    };
    const media: Array<Record<string, any>> = post.fields[ galleryFieldKeys.media ];
    const cta: Array<CTASettings> = post.fields[ galleryFieldKeys.cta ] ? post.fields[ galleryFieldKeys.cta ] : {};

    
    if ( doLength( media ) ) {
        return (
            <>
                <ul className="panel-gallery blocks logos four">
                    { media.map( ( mediaItem: Record<string, any>, index: number ) => {
                        if ( doLength( mediaItem.media ) ) {
                            const ctaSettings: CTASettings = {
                                url: '',
                                modal: mediaItem.modal,
                                modalClass: mediaItem.modalClass,
                            };
                            if ( doLength( mediaItem.url ) ) {
                                ctaSettings.url = mediaItem.url
                            }
                            return (
                                <li key={ index }> 
                                    <CTA { ...ctaSettings }>
                                        <MediaLoader media={ mediaItem.media } size={ 'logo' } loop={ mediaItem.video_loop } />
                                        { doLength( mediaItem.title ) ?
                                            <span className="screen-reader-text">{ mediaItem.title }</span>
                                        : null }
                                    </CTA>
                                </li>
                            );
                        }
                    } ) }
                </ul>
                { doLength( cta ) ?
                    <CTAs ctas={ cta } />
                : null }
            </>
        );
    } else {
        return null;
    }        
}
export default Gallery;