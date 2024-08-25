import { doLength, doStripTags } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';

export default function DOPressReleaseBlock( props ) {
    const post = props.post;
    const postThumbnail = post.post_thumbnail;
    const title = doLength( post.fields.press_long_title ) ? doStripTags( post.fields.press_long_title ) : post.fields.press_title;
    return (
        <li className="has-block-link">
            <CTA classes={ [ 'block-link' ] } url={ post.permalink } title={ title }>
                <Image image={ postThumbnail } size="cinema_600" classes="block-thumbnail" />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name } title={ title } />
                </div>
            </CTA>
        </li>
    );
}