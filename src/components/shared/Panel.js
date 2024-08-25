import { doBackgroundImage, doEvenOdd, doLength, doPanelClasses, doParse, doSanitizeTitleWithDashes } from 'src/utils/helpers.js';
import PanelLoader from 'src/loaders/PanelLoader.js';
import PanelWrapper from 'src/components/layout/PanelWrapper.js';
import Modal from 'src/components/shared/Modal.js';


export default function Panel( props ) {
    // Panel meta field keys components (can be overwritten for different post types, default is landing pages)
    const panelNumber = props.panelNumber !== undefined ? props.panelNumber : '';
    const panelPrefix = props.metaPrefix !== undefined ? props.metaPrefix : '';
    const panelSuffix = props.metaSuffix !== undefined ? props.metaSuffix : '_' + panelNumber;
    const post = props.post;

    // Panel meta field keys (defaults + various from type components that are needed at this level)
    const panelFieldKeys = {
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
        chartType: panelPrefix + '_chart_type' + panelSuffix, // Chart 
    };
    let panelHidden = Boolean( post.fields[ panelFieldKeys.hidden ] );
    const panelPretitle = post.fields[ panelFieldKeys.pretitle ] ? post.fields[ panelFieldKeys.pretitle ] : '';
    const panelTitle = post.fields[ panelFieldKeys.title ] ? post.fields[ panelFieldKeys.title ] : '';
    const panelClass = post.fields[ panelFieldKeys.class ] ? post.fields[ panelFieldKeys.class ] : false;
    const panelType = post.fields[ panelFieldKeys.type ] ? post.fields[ panelFieldKeys.type ] : '';
    const panelID = post.fields[ panelFieldKeys.id ] ? post.fields[ panelFieldKeys.id ] : ( doLength( panelTitle ) ? doSanitizeTitleWithDashes( panelTitle ) : panelType );
    const panelCopy = post.fields[ panelFieldKeys.copy ] ? doParse( post.fields[ panelFieldKeys.copy ] ) : '';
    const panelBackgroundSettings = post.fields[ panelFieldKeys.backgroundSettings ] ? post.fields[ panelFieldKeys.backgroundSettings ] : {};
    const panelMediaAlignment = post.fields[ panelFieldKeys.mediaAlignment ];
    const panelModal = panelType === 'form' && Boolean( post.fields[ panelFieldKeys.modal ] );
    const panelCountdownOverlay = Boolean( post.fields[ panelFieldKeys.countdownOverlayPreviousPanel ] );
    const panelSmall = Boolean( post.fields[ panelFieldKeys.small ] );
    const panelOverlay = Boolean( post.fields[ panelFieldKeys.overlay ] );
    const panelCta = [ 'archive', 'posts' ].indexOf( panelType ) > -1 && post.fields[ panelFieldKeys.cta ] ? post.fields[ panelFieldKeys.cta ] : [];
    const panelTabsOrientation = panelType === 'media-tabs' ? ( post.fields[ panelFieldKeys.tabsOrientation ] ? post.fields[ panelFieldKeys.tabsOrientation ] : 'vertical' ) : false;
    const panelStatsStyle = panelType === 'stats' ? ( post.fields[ panelFieldKeys.statsStyle ] ? post.fields[ panelFieldKeys.statsStyle ] : 'card' ) : false;
    const componentName = post.fields[ panelFieldKeys.componentName ] ? post.fields[ panelFieldKeys.componentName ] : '';
    const chartType = post.fields[ panelFieldKeys.chartType ] ? post.fields[ panelFieldKeys.chartType ] : '';

    // If countdown and the date has passed, hide it
    if ( panelType == 'countdown' ) {
        const panelCountdownDate = post.fields[ panelFieldKeys.countdownDate ];
        // Hide 30 minutes after start time
        const nowRaw = new Date();
        const now = nowRaw.getTime() / 1000;
        panelHidden = panelHidden || panelCountdownDate.stamp + 1800 < now;
    }
    let featuredPanelBackgroundImage = {};
    // If featured...
    if ( panelType == 'featured-post' ) {
        // ... and first panel overlaying hero, hide it (it's shown through the hero custom html)
        if ( panelNumber === 1 && Boolean( post.fields[ panelFieldKeys.elementOverlay ] ) ) {
            panelHidden = true;
        } 
        // ...and not first, grab the background image
        else {
            const featuredPost = post.fields[ panelFieldKeys.featuredPost ] ? post.fields[ panelFieldKeys.featuredPost ] : {};
            const overrideImage = post.fields[ panelFieldKeys.overrideImage ] ? post.fields[ panelFieldKeys.overrideImage ] : {};
            if ( doLength( overrideImage ) ) {
                featuredPanelBackgroundImage = doBackgroundImage( { media: overrideImage } );
            }
            else if ( doLength( featuredPost.post_thumbnail ) ) {
                featuredPanelBackgroundImage = doBackgroundImage( { media: featuredPost.post_thumbnail } );
            }
        }
    }
    let mediaPanelBackground = {};

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
        panelClasses.push( doEvenOdd( props.index ) );
    }
    if ( panelTabsOrientation ) {
        panelClasses.push( 'tabs-' + panelTabsOrientation );
    }
    if ( panelStatsStyle ) {
        panelClasses.push( 'stats-' + panelStatsStyle );
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
    if ( chartType ) {
        panelClasses.push( chartType );
    }
    const panelBackgroundAttrs = doBackgroundImage( panelBackgroundSettings );
    panelClasses = [ ...panelClasses, ...doPanelClasses( panelBackgroundSettings ) ];

    const headingSettings = {
        tag: 'h2', 
        title: panelTitle,
        pretitle: panelPretitle,
        cta: panelCta,
    };
    const panelParams = {
        name: Component,
        data: post,
        panelNumber: panelNumber,
        panelPrefix: panelPrefix,
        panelSuffix: panelSuffix,
        pageID: props.pageID,
        panelID: panelID,
        pageCSS: props.pageCSS,
    };

    if ( ! panelHidden && panelType.length && Component.length ) {
        if ( panelModal ) {
            let modalContent = '';
            if ( panelCopy.length ) {
                modalContent += `<div className="panel-copy-wrapper">${ panelCopy }</div>`;
            }
            modalContent += <PanelLoader name={ Component } />;
            return (
                <Modal id={ panelID } tag="h2" title={ panelTitle }>
                    { autop( modalContent ) }
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
                    mediaBackgroundSettings = { mediaPanelBackground }
                    cta={ panelCta } 
                    backgroundVideo={ panelBackgroundSettings }>
                        <PanelLoader { ...panelParams } />
                </PanelWrapper>
            )
        }
    }
}