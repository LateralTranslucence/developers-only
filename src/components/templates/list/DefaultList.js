import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/list.scss';

export default function DefaultList( props ) {
    const post = props.post;
    // CTA settings
    const ctaSettings = {
        url: post.permalink,
        title: post.post_title,
        classes: [ 'block-link' ],
    }

    return (
        <li key={ props.index } data-index={ props.index }>
            <CTA { ...ctaSettings }>
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name } title={ post.post_title } />
                </div>
            </CTA>
        </li>
    );
}