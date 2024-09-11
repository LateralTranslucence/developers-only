import React from 'react';
import { doLength, doParse } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import MediaLoader from 'src/components/shared/MediaLoader';
import 'assets/styles/components/featured-post.scss';
import { PanelProps } from 'src/utils/types/PanelProps';
import { Media } from 'src/utils/types/Media';
import { CustomAttributes } from 'src/utils/types/CustomAttributes';

const FeaturedPost: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const featuredFieldKeys: Record<string, string> = {
        post: panelPrefix + '_post' + panelSuffix,
        override_image: panelPrefix + '_override_image' + panelSuffix,
        override_type: panelPrefix + '_override_type' + panelSuffix,
        override_pretitle: panelPrefix + '_override_pretitle' + panelSuffix,
        override_title: panelPrefix + '_override_title' + panelSuffix,
        override_description: panelPrefix + '_override_description' + panelSuffix,
        override_cta_text: panelPrefix + '_override_cta_text' + panelSuffix,
        override_url: panelPrefix + '_override_url' + panelSuffix,
        overlay_hero: panelPrefix + '_overlay_hero' + panelSuffix,
        link_target: panelPrefix + '_link_target' + panelSuffix,
    };
    
    // Featured Post
    const featuredPost: Record<string, any> = post.fields[ featuredFieldKeys.post ] ? post.fields[ featuredFieldKeys.post ] : {};
    const overlayHero: boolean = post.fields[ featuredFieldKeys.overlay_hero ] ? Boolean( post.fields[ featuredFieldKeys.overlay_hero ] ) : false;

    // Overrides
    const overrideImage: Media = post.fields[ featuredFieldKeys.override_image ] ? post.fields[ featuredFieldKeys.override_image ] : {};
    const overridePretitle: string = post.fields[ featuredFieldKeys.override_pretitle ] ? post.fields[ featuredFieldKeys.override_pretitle ] : '';
    const overrideTitle: string = post.fields[ featuredFieldKeys.override_title ] ? post.fields[ featuredFieldKeys.override_title ] : '';
    const overrideDescription: string = post.fields[ featuredFieldKeys.override_description ] ? post.fields[ featuredFieldKeys.override_description ] : '';
    const overrideCTAText: string = post.fields[ featuredFieldKeys.override_cta_text ] ? post.fields[ featuredFieldKeys.override_cta_text ] : '';
    const overrideURL: string = post.fields[ featuredFieldKeys.override_url ] ? post.fields[ featuredFieldKeys.override_url ] : '';

    // Check to see if this is the first panel
    const firstPanel: boolean = Boolean( panelNumber === 1 ) && overlayHero;

    // Set up the content
    const postImage: Media = featuredPost.post_thumbnail;
    const image: Media = doLength( overrideImage ) ? overrideImage : postImage;
    const pretitle: string = doLength( overridePretitle ) ? overridePretitle : ( featuredPost.post_type_details && featuredPost.post_type_details.post_type_display_name ? featuredPost.post_type_details.post_type_display_name : '' );
    const title: string = doLength( overrideTitle ) ? overrideTitle : featuredPost.post_title;
    const description: string = doLength( overrideDescription ) ? overrideDescription : featuredPost.post_excerpt;
    const ctaText: string = doLength( overrideCTAText ) ? overrideCTAText : 'Read More';
    const url: string = doLength( overrideURL ) ? overrideURL : ( featuredPost.permalink ? featuredPost.permalink : '' );
    const linkTarget: string = doLength( post.fields[ featuredFieldKeys.link_target ] ) ? post.fields[ featuredFieldKeys.link_target ] : '_self';
    const target: CustomAttributes = linkTarget === 'modal' ? { modal: true } : { target: linkTarget };

    if ( doLength( image ) && doLength( title ) ) {
        return (
            <div className={ 'featured-post-wrapper' + ( firstPanel ? ' color-white' : '' ) }>
                <Heading tag="h3" pretitle={ pretitle } title={ title } />
                <div className="featured-excerpt">{ doParse( description ) }</div>
                { doLength( url ) ?
                    <p className="featured-cta">
                        <CTA text={ ctaText } url={ url } classes={ firstPanel ? [ 'text-button' ] : [ 'solid-button' ] } { ...target } />
                    </p>
                : null }
            { firstPanel ?
                <MediaLoader media={ image  } size="cinema_600"/>
            : null }
            </div>
        );
    } else {
        return null;
    }
}
export default FeaturedPost;