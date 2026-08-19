import React, { JSX } from 'react';
import { evenOdd, getBackgroundField, getBackgroundStyle, getBooleanField, getStringField, panelClasses as getPanelClasses, parse, sanitizeTitleWithDashes } from '@/utils/helpers';
import PanelLoader from '@/loaders/PanelLoader';
import PanelWrapper from '@/components/layout/PanelWrapper';
import Modal from '@/components/shared/Modal';
import { PanelProps } from '@/utils/types/PanelProps';
import { BackgroundProps } from '@/utils/types/BackgroundProps';
import { HeadingProps } from '@/utils/types/HeadingProps';
import { CustomAttributes } from '@/utils/types/CustomAttributes';

const Panel: React.FC<PanelProps> = ( { 
    post, 
    index = 0, 
    panelNumber, 
    panelPrefix = '',
    panelSuffix = panelNumber ? '_' + panelNumber : '',
} ): JSX.Element | null => {
    const panelHidden: boolean = getBooleanField( post.fields, panelPrefix + '_hide_panel' + panelSuffix );
    const panelPretitle: string = getStringField( post.fields, panelPrefix + '_pretitle' + panelSuffix );
    const panelTitle: string = getStringField( post.fields, panelPrefix + '_title' + panelSuffix );
    const panelClass: string = getStringField( post.fields, panelPrefix + '_panel_class' + panelSuffix );
    const panelType: string = getStringField( post.fields, panelPrefix + '_panel_type' + panelSuffix );
    const panelID: string = getStringField( post.fields, panelPrefix + '_panel_id' + panelSuffix, panelTitle ? sanitizeTitleWithDashes( panelTitle ) : panelType );
    const panelCopy: string = getStringField( post.fields, panelPrefix + '_copy' + panelSuffix );
    const panelBackgroundSettings: BackgroundProps = getBackgroundField( post.fields, panelPrefix + '_background' + panelSuffix );
    const panelAlignment: string = getStringField( post.fields, panelPrefix + '_media_alignment' + panelSuffix );
    const panelModal: boolean = panelType === 'form' && getBooleanField( post.fields, panelPrefix + '_modal' + panelSuffix );
    const panelOverlay: boolean = getBooleanField( post.fields, panelPrefix + '_overlay' + panelSuffix );
    const componentName: string = getStringField( post.fields, panelPrefix + '_component_name' + panelSuffix );

    const featuredPanelBackgroundImage: CustomAttributes = {};

    // Load right component
    const Component = panelType;

    // Build some classes
    let panelClasses = [ 'panel', 'panel-type-' + panelType.toLowerCase() ];
    if ( panelClass ) {
        panelClasses.push( panelClass );
    }
    if ( panelAlignment ) {
        panelClasses.push( 'alignment-' + panelAlignment );
    }
    if ( panelAlignment && panelAlignment === 'alternate' ) {
        panelClasses.push( evenOdd( index ) );
    }
    if ( panelOverlay ) {
        panelClasses.push( 'overlay' );
    }
    if ( componentName ) {
        panelClasses.push( componentName );
    }

    panelClasses = [ ...panelClasses, ...getPanelClasses( panelBackgroundSettings ) ];

    const headingSettings: HeadingProps = {
        tag: 'h2', 
        title: panelTitle,
        pretitle: panelPretitle,
    };

    const panelParams: PanelProps = {
        name: Component,
        post: post,
        panelNumber: panelNumber,
        panelPrefix: panelPrefix,
        panelSuffix: panelSuffix,
        panelID: panelID,
    };

    if ( ! panelHidden && panelType.length && Component.length ) {
        if ( panelModal ) {
            return (
                <Modal id={ panelID } heading={ { tag: 'h2', title:  panelTitle } }>
                    { panelCopy.length ?
                        <div className="panel-copy-wrapper">
                            { parse( panelCopy ) }
                        </div>
                    : null }
                    <PanelLoader { ...panelParams } />
                </Modal>
            );
        } else {
            return (
                <PanelWrapper
                    panelID={ panelID }
                    panelType={ panelType }
                    classes={ panelClasses }
                    heading={ headingSettings }
                    copy={ panelCopy }
                    background={ { style: getBackgroundStyle( panelBackgroundSettings ) } }
                    featuredSettings={ featuredPanelBackgroundImage } >
                        <PanelLoader { ...panelParams } />
                </PanelWrapper>
            );
        }
    } else {
        return null;
    }
};
export default Panel;
