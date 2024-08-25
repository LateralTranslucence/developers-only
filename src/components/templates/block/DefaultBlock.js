import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';

export default function DefaultBlock( props ) {
    const post = props.post;
    const postThumbnail = post.post_thumbnail;
    return (
        <li className="has-block-link">
            <CTA classes={ [ 'block-link' ] } url={ post.permalink } title={ post.post_title }>
                <Image image={ postThumbnail } size="cinema_600" classes="block-thumbnail" />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name } title={ post.post_title } />
                </div>
            </CTA>
        </li>
    );
}