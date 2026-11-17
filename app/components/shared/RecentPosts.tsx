import React, { JSX } from 'react';
import { useEffect, useState } from 'react';
import { APIResult } from '@/utils/types/APIResult';
import { Post } from '@/utils/types/Post';
import { SearchQueryArgs } from '@/utils/types/SearchQueryArgs';
import { getArchivePosts } from '@/utils/api';
import { getPostTitle, parse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import '@/styles/components/posts.scss';
import '@/styles/components/blocks.scss';

interface RecentPostsProps {
    count?: number;
    postID: number;
    postType?: string;
    type?: string;
}

// The latest posts of a type, excluding the current one. Not used by a core
// template; available to extensions.
const RecentPosts: React.FC<RecentPostsProps> = ( {
    count = 10,
    postID,
    postType = '',
    type = 'block',
} ): JSX.Element | null => {
    const [ recentPosts, setRecentPosts ] = useState<Array<Post>>( [] );

    useEffect( () => {
        let cancelled = false;
        const postsArgs: SearchQueryArgs = {
            post_type: postType,
            posts_per_page: count,
            orderby: 'date_desc',
            post__not_in: postID ? [ postID ] : [],
            nopaging: true,
        };
        getArchivePosts( postsArgs )
            .then( ( data: APIResult ) => {
                if ( ! cancelled && Array.isArray( data.json ) ) {
                    setRecentPosts( data.json as Array<Post> );
                }
            } )
            .catch( () => {} );
        return () => {
            cancelled = true;
        };
    }, [ count, postID, postType ] );

    if ( recentPosts.length === 0 ) {
        return null;
    }

    return (
        <ul id="recent-posts" className={ 'blocks blocks--' + postType + ' ' + ( type === 'block' ? 'blocks--post blocks--three' : 'blocks--' + type ) }>
            { recentPosts.map( ( post: Post, index: number ) => {
                if ( type === 'text' ) {
                    return (
                        <li key={ index } className=" --has-link">
                            <CTA url={ post.permalink } text={ getPostTitle( post ) } classes={ [ 'blocks__link' ] }>
                                { parse( getPostTitle( post ) ) }
                            </CTA>
                        </li>
                    );
                }
                return <PartialTemplateLoader key={ index } index={ index } type={ type } post={ post } perRow={ 3 } />;
            } ) }
        </ul>
    );
};
export default RecentPosts;
