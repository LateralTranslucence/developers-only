//import { doDecimalFromDivision } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';

export default function DOMediaCoverageBlock( props ) {
    const image = props.post.fields.media_image;
    const title = props.post.fields.media_title;
    const mediaExternalURL = props.post.fields.media_url;
    const mediaLink = mediaExternalURL ? mediaExternalURL : props.post.permalink;

    return (
        <li className="has-block-link">
            <CTA classes="block-link" url={ mediaLink } title={ title }>
                <Image image={ image } size="cinema_600" classes="block-thumbnail" />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ props.post.post_type_details.post_type_display_name } title={ title } />
                </div>
            </CTA>
        </li>
    );

}