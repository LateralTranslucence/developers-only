import React, { JSX } from 'react';
import CTAs from '@/components/shared/CTAs';
import CTA from '@/components/shared/CTA';
import MediaLoader from '@/components/shared/MediaLoader';
import { getArrayField } from '@/utils/helpers';
import { PanelProps } from '@/utils/types/PanelProps';
import { CTASettings } from '@/utils/types/CTASettings';
import { Media } from '@/utils/types/Media';
import '@/styles/components/blocks.scss';
import '@/styles/components/gallery.scss';

// Shape produced by the PHP gallery field (DO_Form_Field_API_Display::gallery)
interface GalleryItem {
    title?: string;
    media?: Media;
    url?: string;
    modal?: boolean;
    modal_class?: string;
    video_loop?: boolean;
}

const Gallery: React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element | null => {
    const media = getArrayField<GalleryItem>( post.fields, panelPrefix + '_media_gallery' + panelSuffix );
    const cta = getArrayField<CTASettings>( post.fields, panelPrefix + '_cta' + panelSuffix );
    
    if ( media.length > 0 ) {
        return (
            <>
                <ul className="panel-gallery blocks blocks--logos blocks--four">
                    { media.map( ( mediaItem: GalleryItem, index: number ) => {
                        if ( mediaItem.media && Object.keys( mediaItem.media ).length > 0 ) {
                            const ctaSettings: CTASettings = {
                                url: '',
                                modal: mediaItem.modal,
                                modal_class: mediaItem.modal_class,
                            };
                            if ( mediaItem.url ) {
                                ctaSettings.url = mediaItem.url;
                            }
                            return (
                                <li key={ index }>
                                    <CTA { ...ctaSettings }>
                                        <MediaLoader media={ mediaItem.media } size={ 'logo' } loop={ mediaItem.video_loop } />
                                        { mediaItem.title ?
                                            <span className="screenReader">{ mediaItem.title }</span>
                                        : null }
                                    </CTA>
                                </li>
                            );
                        }
                    } ) }
                </ul>
                { cta.length > 0 ?
                    <CTAs ctas={ cta } />
                : null }
            </>
        );
    } else {
        return null;
    }        
};
export default Gallery;
