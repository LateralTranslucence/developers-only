import React from 'react';
import { doBackgroundImage, doEvenOdd, doLength, doPanelClasses, doParse, doSanitizeTitleWithDashes } from '@/utils/helpers';
import PanelLoader from '@/loaders/PanelLoader';
import PanelWrapper from '@/components/layout/PanelWrapper';
import Modal from '@/components/shared/Modal';
import { PanelProps } from '@/utils/types/PanelProps';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { BackgroundProps } from '@/utils/types/BackgroundProps';
import { HeadingProps } from '@/utils/types/HeadingProps';
import { DateTime } from '@/utils/types/DateTime';
import { Post } from '@/utils/types/Post';
import { Media } from '@/utils/types/Media';
import { CustomAttributes } from '@/utils/types/CustomAttributes';

const Panel: React.FC<PanelProps> = ( { 
    post, 
    index = 0, 
    pageCSS = '', 
    pageID = '', 
    panelNumber, 
    panelPrefix = '',
    panelSuffix = panelNumber ? '_' + panelNumber : '',
} ): JSX.Element | null => {
    //const panelSuffix = panelNumber ? '_' + panelNumber : '';
    // Panel meta field keys (defaults + various from type components that are needed at this level)
    const panelFieldKeys: MetaFieldKeyMap = {
        hidden: panelPrefix + '_hide_panel' + panelSuffix, // default
        type: panelPrefix + '_panel_type' + panelSuffix, // default
        pretitle: panelPrefix + '_pretitle' + panelSuffix, // Customer Story Tabs
        title: panelPrefix + '_title' + panelSuffix, // default
        backgroundSettings: panelPrefix + '_background' + panelSuffix, // default
        copy: panelPrefix + '_copy' + panelSuffix, // default
        id: panelPrefix + '_panel_id' + panelSuffix, // default
        class: panelPrefix + '_panel_class' + panelSuffix, // default
        mediaAlignment: panelPrefix + '_media_alignment' + panelSuffix, // text-media
        overlay: panelPrefix + '_overlay' + panelSuffix, // text
        modal: panelPrefix + '_modal' + panelSuffix, // Archive
        archivePostType: panelPrefix + '_post_type' + panelSuffix, // Archive
        contentSliderType: panelPrefix + '_type' + panelSuffix, // content-slider
        contentSliderStyle: panelPrefix + '_style' + panelSuffix, // content-slider
        cta: panelPrefix + '_cta' + panelSuffix, // cta for Archive and Posts
        tabsOrientation: panelPrefix + '_tabs_orientation' + panelSuffix, // media tabs
        statsStyle: panelPrefix + '_block_style' + panelSuffix, // stats
        featuredPost: panelPrefix + '_post' + panelSuffix, // Featured Post
        elementOverlay: panelPrefix + '_overlay_hero' + panelSuffix, // Featured Post, Form
        overrideImage: panelPrefix + '_override_image' + panelSuffix, // Featured Post
        mediaBackground: panelPrefix + '_media_background' + panelSuffix, // Simple Content
        componentName: panelPrefix + '_component_name' + panelSuffix, // Custom
    }
    let panelHidden: boolean = Boolean( post.fields[ panelFieldKeys.hidden ] );
    const panelPretitle: string = post.fields[ panelFieldKeys.pretitle ] ? post.fields[ panelFieldKeys.pretitle ] : '';
    const panelTitle: string = post.fields[ panelFieldKeys.title ] ? post.fields[ panelFieldKeys.title ] : '';
    const panelClass: string = post.fields[ panelFieldKeys.class ] ? post.fields[ panelFieldKeys.class ] : '';
    const panelType: string = post.fields[ panelFieldKeys.type ] ? post.fields[ panelFieldKeys.type ] : '';
    const panelID: string = post.fields[ panelFieldKeys.id ] ? post.fields[ panelFieldKeys.id ] : ( doLength( panelTitle ) ? doSanitizeTitleWithDashes( panelTitle ) : panelType );
    const panelCopy: string = post.fields[ panelFieldKeys.copy ] ? post.fields[ panelFieldKeys.copy ] : '';
    const panelBackgroundSettings: BackgroundProps = post.fields[ panelFieldKeys.backgroundSettings ] ? post.fields[ panelFieldKeys.backgroundSettings ] : {};
    const panelMediaAlignment: string = post.fields[ panelFieldKeys.mediaAlignment ];
    const panelModal: boolean = panelType === 'form' && Boolean( post.fields[ panelFieldKeys.modal ] );
    const panelCountdownOverlay: boolean = Boolean( post.fields[ panelFieldKeys.countdownOverlayPreviousPanel ] );
    const panelSmall: boolean = Boolean( post.fields[ panelFieldKeys.small ] );
    const panelOverlay: boolean = Boolean( post.fields[ panelFieldKeys.overlay ] );
    const componentName = post.fields[ panelFieldKeys.componentName ] ? post.fields[ panelFieldKeys.componentName ] : '';

    // If countdown and the date has passed, hide it
    if ( panelType == 'countdown' ) {
        const panelCountdownDate: DateTime = post.fields[ panelFieldKeys.countdownDate ];
        // Hide 30 minutes after start time
        const nowRaw: Date = new Date();
        const now: number = nowRaw.getTime() / 1000;
        panelHidden = panelHidden || panelCountdownDate.stamp + 1800 < now;
    }
    let featuredPanelBackgroundImage = {};
    // If featured...
    if ( panelType === 'featured-post' ) {
        // ... and first panel overlaying hero, hide it (it's shown through the hero custom html)
        if ( panelNumber === 1 && Boolean( post.fields[ panelFieldKeys.elementOverlay ] ) ) {
            panelHidden = true;
        } 
        // ...and not first, grab the background image
        else {
            const featuredPost: Post = post.fields[ panelFieldKeys.featuredPost ] ? post.fields[ panelFieldKeys.featuredPost ] : {};
            const overrideImage: Media = post.fields[ panelFieldKeys.overrideImage ] ? post.fields[ panelFieldKeys.overrideImage ] : {};
            if ( doLength( overrideImage ) ) {
                featuredPanelBackgroundImage = doBackgroundImage( { media: overrideImage } );
            }
            else if ( doLength( featuredPost.post_thumbnail ) ) {
                featuredPanelBackgroundImage = doBackgroundImage( { media: featuredPost.post_thumbnail } );
            }
        }
    }

    // If form
    if ( panelType == 'form' && panelNumber == 1 && Boolean( post.fields[ panelFieldKeys.elementOverlay ] )   ) {
        // ... and first panel, hide it (it's shown through the hero custom html)
        panelHidden = true;
    }

    // Load right component
    const Component = panelType;

    // Build some classes
    let panelClasses = [ 'panel', 'panel-type-' + panelType.toLowerCase() ];
    if ( panelClass ) {
        panelClasses.push( panelClass );
    }
    if ( panelMediaAlignment ) {
        panelClasses.push( 'media-alignment-' + panelMediaAlignment );
    }
    if ( panelMediaAlignment && panelMediaAlignment === 'alternate' ) {
        panelClasses.push( doEvenOdd( index ) );
    }
    if ( panelType === 'countdown' && panelCountdownOverlay ) {
        panelClasses.push( 'countdown-overlay' );
    }
    if ( panelSmall ) {
        panelClasses.push( 'small-panel' );
    }
    if ( panelOverlay ) {
        panelClasses.push( 'overlay' );
    }
    if ( componentName ) {
        panelClasses.push( componentName );
    }

    const panelBackgroundAttrs: CustomAttributes = doBackgroundImage( panelBackgroundSettings );
    panelClasses = [ ...panelClasses, ...doPanelClasses( panelBackgroundSettings ) ];

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
        pageID: pageID,
        panelID: panelID,
        pageCSS: pageCSS,
    };

    if ( ! panelHidden && panelType.length && Component.length ) {
        if ( panelModal ) {
            let modalContent: string = '';
            if ( panelCopy.length ) {
                modalContent += `<div className="panel-copy-wrapper">${ doParse( panelCopy ) }</div>`;
            }
            modalContent += <PanelLoader { ...panelParams } />;
            return (
                <Modal id={ panelID } heading={ { tag: 'h2', title:  panelTitle } }>
                    { modalContent }
                </Modal>
            );
        } else {
            return (
                <PanelWrapper 
                    panelID={ panelID } 
                    panelType={ panelType } 
                    classes={ panelClasses } 
                    background={ panelBackgroundAttrs } 
                    heading={ headingSettings } 
                    copy={ panelCopy } 
                    featuredSettings={ featuredPanelBackgroundImage } 
                    backgroundVideo={ panelBackgroundSettings }>
                        <PanelLoader { ...panelParams } />
                </PanelWrapper>
            )
        }
    } else {
        return null;
    }
}
export default Panel;