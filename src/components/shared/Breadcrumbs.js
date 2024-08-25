import { doLength, doPluralize } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import 'assets/styles/components/breadcrumbs.scss';

export default function Breadcrumbs( props ) {
    const post = props.post;
    let breadcrumbs;
    // Set in post type
    if ( post.post_type_details.breadcrumbs && doLength( post.post_type_details.breadcrumbs ) ) {
        breadcrumbs = post.post_type_details.breadcrumbs;
    }
    // Set in admin
    else {
        const metaPrefix = post.post_type_details.meta_prefix;
        breadcrumbs = post.fields[ metaPrefix + '_breadcrumbs' ] ? post.fields[ metaPrefix + '_breadcrumbs' ] : [];
    }

    if ( doLength( breadcrumbs ) ) {
        return (
            <ul id="breadcrumbs">
                { breadcrumbs.map( ( crumb, index ) => {
                    const text = crumb.text;
                    const url = crumb.url;
                    return (
                        <li key={ index }>
                            <CTA key={ index } url={ url } classes={ false }>
                                { text }
                            </CTA>
                        </li>
                    )
                } ) }
            </ul>
        );
    } else {
        return null;
    }
}