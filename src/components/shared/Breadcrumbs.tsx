import React from 'react';
import { doLength } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import 'assets/styles/components/breadcrumbs.scss';
import { Post } from 'src/utils/types/Post';

const Breadcrumbs: React.FC<{ post: Post }> = ( { post } ): JSX.Element | null => {
    let breadcrumbs: Array<Record<string, string>>;
    // Set in post type
    if ( post.post_type_details.breadcrumbs && doLength( post.post_type_details.breadcrumbs ) ) {
        breadcrumbs = post.post_type_details.breadcrumbs;
    }
    // Set in admin
    else {
        const metaPrefix: string = post.post_type_details.meta_prefix;
        breadcrumbs = post.fields[ metaPrefix + '_breadcrumbs' ] ? post.fields[ metaPrefix + '_breadcrumbs' ] : [];
    }

    if ( doLength( breadcrumbs ) ) {
        return (
            <ul id="breadcrumbs">
                { breadcrumbs.map( ( crumb: Record<string, string>, index: number ) => {
                    const text: string = crumb.text;
                    const url: string = crumb.url;
                    return (
                        <li key={ index }>
                            <CTA key={ index } url={ url }>
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
export default Breadcrumbs;