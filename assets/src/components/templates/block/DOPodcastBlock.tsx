import React from 'react';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';

const DOPodcastBlock: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const podcastExternalURL: string = post.fields.podcast_external_url;
    const podcastLink: string = post.fields.podcast_external_url ? post.fields.podcast_external_url : post.permalink;

    return (
        <li className="has-block-link">
            <CTA url={ podcastLink } text={ post.fields.podcast_title } classes={ [ 'block-link' + ( post.fields.podcast_format ? ' icon ' + post.fields.podcast_format.PartialTemplateProps.toLowerCase.toLowerCase() : '' ) ] }>
                <Image image={ post.fields.podcast_image } size="cinema_600" classes={ [ 'block-thumbnail' ] } />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name } title={ post.fields.podcast_title } />
                    { podcastExternalURL ?
                        <p className="read-time">External Link</p>
                    : null }
                </div>
            </CTA>
        </li>
    )
}
export default DOPodcastBlock;