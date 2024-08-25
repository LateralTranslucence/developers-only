import React from 'react';
import { doLength } from 'src/utils/helpers';
import PartialTemplateLoader from 'src/loaders/PartialTemplateLoader';
import CTAs from 'src/components/shared/CTAs';
import 'assets/styles/components/logo-gallery.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import CTASettings from 'src/utils/types/CTASettings';

const LogoGallery: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const logoGalleryFieldKeys: Record<string, string> = {
        logoGallery: panelPrefix + '_logo_gallery' + panelSuffix,
        cta: panelPrefix + '_cta' + panelSuffix,
    };
    
    // Post objects for do_company
    const logoGalleryItems: Array<Record<string, any>>  = data.fields[ logoGalleryFieldKeys.logoGallery ] ? data.fields[ logoGalleryFieldKeys.logoGallery ] : [];

    // CTA
    const cta: Array<CTASettings> = data.fields[ logoGalleryFieldKeys.cta ] ? data.fields[ logoGalleryFieldKeys.cta ] : [];

    // Number of posts per row
    const panelPerRow: number = 6;

    if ( doLength( logoGalleryItems ) ) {
        return (
            <>
            <ul className="logo-gallery logos blocks four">
                { logoGalleryItems.map( ( post: Record<string, any>, index: number ) => {
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