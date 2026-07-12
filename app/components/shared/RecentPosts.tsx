import React from 'react';
import { useEffect, useState } from 'react';
import { APIResult } from '@/utils/types/APIResult';
import { CTASettings } from '@/utils/types/CTASettings';
import { Post } from '@/utils/types/Post';
import { SearchQueryArgs } from '@/utils/types/SearchQueryArgs';
import { getArchivePosts } from '@/utils/api';
import { length, parse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import SliderNav from '@/components/shared/SliderNav';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import '@/styles/components/posts.scss';
import '@/styles/components/blocks.scss';

interface RecentPostsProps {
    count?: number;
    postID: number;
    postType?: string;
    slider?: boolean,
    type?: string;
}

const RecentPosts: React.FC<RecentPostsProps> = ( {
    count = 10,
    postID,
    postType = '',
    slider = true,
    type = 'block',
    
} ): JSX.Element | null => {
    const [ recentPosts, setRecentPosts ] = useState<Array<Post>>( [] );

    useEffect( () => {
        const postsArgs: SearchQueryArgs = {
            post_type: postType,
            posts_per_page: count,
            orderby: 'date_desc',
            post__not_in: postID ? [ postID ] : [],
            nopaging: true,
        };
        async function fetchData() {
            await getArchivePosts( postsArgs ).then( ( data: APIResult ) => {
                setRecentPosts( data.json as Array<Post> );
            } );
        }
        fetchData();
    }, [ count, postID, postType ] );

    function Posts() {
        return (
            <ul id="recent-posts" className={ 'blocks blocks--' + postType + ' ' + ( type === 'block' ? 'blocks--post blocks--three' : 'blocks--' + type ) + ' ' + ( slider ?  'blocks--slider' : '' ) }>
                { recentPosts.map( ( post: Post, index: number ) => {
                    if ( type == 'text' ) {
                        // CTA settings
                        const ctaSettings: CTASettings = {
                            url: post.permalink,
                            text: post.post_title,
                            classes: [ 'blocks__link' ],
                        };
                        return (
                            <li key={ index } className=" --has-link">
                                <CTA { ...ctaSettings }>
                                    { parse( post.post_title ) }
                                </CTA>
                            </li>
                        );
                    } else {
                        return <PartialTemplateLoader key={ index } index={ index } type={ type } post={ post } perRow={ 3 } panelSlider= { slider } />;
                    }
                } ) }
            </ul>
        );
    }

    if ( length( recentPosts ) ) {
        return (
            <>
                { slider ?
                    <div className="panel-slider-wrapper" uk-slider="finite: true">
                        <Posts />
                        <SliderNav dotNav={ false } length={ length( recentPosts ) } />
                    </div>
                : <Posts /> }
            </>
        );
    } else {
        return null;
    }
};
export default RecentPosts;