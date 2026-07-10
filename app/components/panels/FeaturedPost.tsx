import React from 'react';
import { CustomAttributes } from '@/utils/types/CustomAttributes';
import { Media } from '@/utils/types/Media';
import { PanelProps } from '@/utils/types/PanelProps';
import { Post } from '@/utils/types/Post';
import { getMediaField, getObjectField, getStringField, length, parse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import '@/styles/components/featured-post.scss';

const FeaturedPost: React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element | null => {
    // Featured Post
    const featuredPost: Post = getObjectField<Post>( post.fields, panelPrefix + '_post' + panelSuffix );

    // Overrides
    const overrideImage: Media = getMediaField( post.fields, panelPrefix + '_override_image' + panelSuffix );
    const overridePretitle: string = getStringField( post.fields, panelPrefix + '_override_pretitle' + panelSuffix );
    const overrideTitle: string = getStringField( post.fields, panelPrefix + '_override_title' + panelSuffix );
    const overrideDescription: string = getStringField( post.fields, panelPrefix + '_override_description' + panelSuffix );
    const overrideCTAText: string = getStringField( post.fields, panelPrefix + '_override_cta_text' + panelSuffix );
    const overrideURL: string = getStringField( post.fields, panelPrefix + '_override_url' + panelSuffix );

    // Set up the content
    const postImage: Media = featuredPost.post_thumbnail;
    const image: Media = length( overrideImage ) ? overrideImage : postImage;
    const pretitle: string = length( overridePretitle ) ? overridePretitle : ( featuredPost.post_type_details && featuredPost.post_type_details.post_type_display_name ? featuredPost.post_type_details.post_type_display_name : '' );
    const title: string = length( overrideTitle ) ? overrideTitle : featuredPost.post_title;
    const description: string = length( overrideDescription ) ? overrideDescription : featuredPost.post_excerpt;
    const ctaText: string = length( overrideCTAText ) ? overrideCTAText : 'Read More';
    const url: string = length( overrideURL ) ? overrideURL : ( featuredPost.permalink ? featuredPost.permalink : '' );
    const linkTarget: string = getStringField( post.fields, panelPrefix + '_link_target' + panelSuffix, '_self' );
    const target: CustomAttributes = linkTarget === 'modal' ? { modal: true } : { target: linkTarget };
    if ( length( image ) && length( title ) ) {
        return (
            <div className="featured-post">
                <Heading tag="h3" pretitle={ pretitle } title={ title } />
                <div className="featured-post__excerpt">{ parse( description ) }</div>
                { length( url ) ?
                    <p className="featured-post__cta">
                        <CTA text={ ctaText } url={ url } classes={ [ 'solid-button' ] } { ...target } />
                    </p>
                : null }
            </div>
        );
    } else {
        return null;
    }
};
export default FeaturedPost;