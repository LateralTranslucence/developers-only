/*
 * Gate
 * Handles logic and form/button display for downloadable content
 *
 */
import React from 'react';
import { CTASettings } from '@/utils/types/CTASettings';
import { GatedProps } from '@/utils/types/GatedProps';
import { doLength, doURLType } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Modal from '@/components/shared/Modal';
import RenderHubspotForm from '@/components/shared/RenderHubspotForm';

const Gated: React.FC<GatedProps> = ( { 
    iframe = false,
    pageID = '', 
    panelID = '', 
    panelPrefix = '', 
    panelSuffix = '', 
    post 
} ) => {
    const isPanel: boolean = panelID ? true : false;
    // If there's no post, don't bother
    if ( doLength( post ) ) {
        const metaPrefix: string = post.post_type_details.meta_prefix;
        // Download Settings
        const fileOrURL: string = post.fields[ metaPrefix + '_file' ] ? post.fields[ metaPrefix + '_file' ] : '';
        let downloadButtonText: string = post.fields[ metaPrefix + '_download_button_text' ] ? post.fields[ metaPrefix + '_download_button_text' ] : 'Download';
        const downloadButtonStyle: Array<string> = [ 'solid-button' ];
        let downloadModal: boolean = false;
        // Gating Settings
        const gated: boolean = post.fields[ metaPrefix + '_gated' ] ? Boolean( post.fields[ metaPrefix + '_gated' ] ) : false;
        // Form
        const formTitle: string = post.fields[ metaPrefix + '_form_title' ] ? post.fields[ metaPrefix + '_form_title' ] : 'Download the Free Report';
        const formEmbedCode: string = doLength( post.fields[ metaPrefix + '_form_embed_code' ] ) ? JSON.parse( post.fields[ metaPrefix + '_form_embed_code' ] ) : '';
        
        // Panel
        let formID: string = '';
        if ( isPanel ) {
            formID = pageID.replace( '/', '-' ) + ( panelID ? '-' + panelID : '-report' );
            downloadButtonText = post.fields[ panelPrefix + '_cta_text' + panelSuffix ] ? post.fields[ panelPrefix + '_cta_text' + panelSuffix ] : downloadButtonText;
            downloadModal = true;
        }

        // Default is un-gated
        const gate: boolean = fileOrURL && gated ? true : false;
        
        // Gated - show a form
        if ( gate ) {
            if ( formEmbedCode ) {
                if ( downloadModal ) {
                    return (
                        <>
                        <p className="panel-cta">
                            <CTA text={ downloadButtonText } url={ '#' + formID } modal={ true } classes={ downloadButtonStyle } />
                        </p>
                        <Modal id={ formID } heading={ { tag: 'h3', title: formTitle } } content={ <RenderHubspotForm options={ formEmbedCode } formID={ formID + '-form' } /> } />
                        </>
                    )
                } else {
                    return (
                        <div className="panel-form-wrapper">
                            <Heading tag="h2" title={ formTitle } classes={ [ 'text-align-center' ] } />
                            <RenderHubspotForm options={ formEmbedCode } formID={ formID + '-form' } />
                        </div>
                    )
                }
            }
        // Un-gated, show a download button ?>
        } else {
            const ctaSettings: CTASettings = {
                text: downloadButtonText,
                url: fileOrURL,
                modal: doURLType( fileOrURL ) === 'pdf' && ! iframe,
                //modalClass: doURLType( fileOrURL ) === 'pdf' && ! iframe ? 'do-downloadable-content' : false,
                classes: downloadButtonStyle,
                id: 'do-download-content',
                iframeName: 'do-downloadable-iframe',
            }
            // A panel
            if ( isPanel ) {
                return (
                    <p className="panel-cta">
                        <CTA { ...ctaSettings } />
                    </p>
                )
            } 
            // Not a panel
            else {
                return ( 
                    <p id="download" className="panel-cta">
                        <CTA { ...ctaSettings } />
                    </p>
                )
            }
        }
    } else {
        return null;
    }
}
export default Gated;