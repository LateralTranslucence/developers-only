import React from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { PanelProps } from '@/utils/types/PanelProps';
import { Post } from '@/utils/types/Post';
import { doLength } from '@/utils/helpers';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import CTAs from '@/components/shared/CTAs';
import '@/styles/components/logo-gallery.scss';

const LogoGallery: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {

    const logoGalleryFieldKeys: MetaFieldKeyMap = {
        logoGallery: panelPrefix + '_logo_gallery' + panelSuffix,
        cta: panelPrefix + '_cta' + panelSuffix,
    }
    
    // Post objects for do_company
    const logoGalleryItems: Array<Post>  = post.fields[ logoGalleryFieldKeys.logoGallery ] ? post.fields[ logoGalleryFieldKeys.logoGallery ] : [];

    // CTA
    const cta: Array<CTASettings> = post.fields[ logoGalleryFieldKeys.cta ] ? post.fields[ logoGalleryFieldKeys.cta ] : [];

    // Number of posts per row
    const panelPerRow: number = 6;

    if ( doLength( logoGalleryItems ) ) {
        return (
            <>
            <ul className="logo-gallery logos blocks four">
                { logoGalleryItems.map( ( post: Post, index: number ) => {
                    return <PartialTemplateLoader key={ index } index={ index } type="simple" post={ post } perRow={ panelPerRow } />;
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
export default LogoGallery;