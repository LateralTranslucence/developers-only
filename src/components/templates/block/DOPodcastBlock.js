import { doDecimalFromDivision } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';

export default function DOPodcastBlock( props ) {
    const image = props.post.fields.podcast_image;
    const title = props.post.fields.podcast_title;
    const podcastFormat = props.post.fields.podcast_format ? props.post.fields.podcast_format.toLowerCase() : false;
    const podcastExternalURL = props.post.fields.podcast_external_url;
    const podcastLink = props.post.fields.podcast_external_url ? props.post.fields.podcast_external_url : props.post.permalink;

    return (
        <li className="has-block-link">
            <CTA url={ podcastLink } title={ title } classes={ [ 'block-link' + ( podcastFormat ? ' icon ' + podcastFormat : '' ) ] }>
                <Image image={ image } size="cinema_600" classes="block-thumbnail" />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ props.post.post_type_details.post_type_display_name } title={ title } />
                    { podcastExternalURL ?
                        <p className="read-time">External Link</p>
                    : null }
                </div>
            </CTA>
        </li>
    );
}