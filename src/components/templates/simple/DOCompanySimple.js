import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';

export default function DOCompanySimple( props ) {
    const index = props.index;
    const metaPrefix = props.post.post_type_details.meta_prefix;
    const post = props.post;
    const image = post.fields[ metaPrefix + '_logo' ];

    return (
        <li key={ index }>
            <Image image={ image } size="logo" />
            <Heading tag="h3" title={ post.post_title } classes="screen-reader-text"/>
        </li>
    );
}