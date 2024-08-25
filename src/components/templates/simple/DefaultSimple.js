import { doMetaFieldKey } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';

export default function DefaultSimple( props ) {
    const index = props.index;
    const post = props.post;
    const image = post.post_type_details.post_thumbnail ? post.fields[ doMetaFieldKey( post.post_type_details.post_thumbnail, post.post_type_details.meta_prefix ) ] : [];

    // CTA settings
    const ctaSettings = {
        url: post.permalink,
        title: post.post_title,
        classes: [ 'block-link' ],
    }

    return (
        <li key={ index }>
            <CTA { ...ctaSettings }>
                <Image image={ image } size="cinema_600" />
                <Heading tag="h3" title={ post.post_title } />
            </CTA>
        </li>
    );
}