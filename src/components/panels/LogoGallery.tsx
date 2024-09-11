import React from 'react';
import { CTASettings } from 'src/utils/types/CTASettings';
import { MetaFieldKeyMap } from 'src/utils/types/MetaFieldKeyMap';
import { PanelProps } from 'src/utils/types/PanelProps';
import { Post } from 'src/utils/types/Post';
import { doLength } from 'src/utils/helpers';
import PartialTemplateLoader from 'src/loaders/PartialTemplateLoader';
import CTAs from 'src/components/shared/CTAs';
import 'assets/styles/components/logo-gallery.scss';

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