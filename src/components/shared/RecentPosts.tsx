import React from 'react';
const { useEffect, useState } = wp.element;
import { APIResult } from 'src/utils/types/APIResult';
import { CTASettings } from 'src/utils/types/CTASettings';
import { Post } from 'src/utils/types/Post';
import { SearchQueryArgs } from 'src/utils/types/SearchQueryArgs';
import { doGetArchivePosts } from 'src/utils/api';
import { doLength, doParse } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import SliderNav from 'src/components/shared/SliderNav';
import PartialTemplateLoader from 'src/loaders/PartialTemplateLoader';
import 'assets/styles/components/posts.scss';
import 'assets/styles/components/blocks.scss';

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
    const postsArgs: SearchQueryArgs = {
        post_type: postType,
        posts_per_page: count,
        orderby: 'date_desc',
        post__not_in: postID ? [ postID ] : [],
        nopaging: true,
    };

    const [ recentPosts, setRecentPosts ] = useState<Array<Post>>( [] );

    useEffect( () => {
        async function fetchData() {
            await doGetArchivePosts( postsArgs ).then( ( data: APIResult ) => {
                setRecentPosts( data.json as Array<Post> );
            } );
        }
        fetchData();
    }, [] );

    function Posts() {
        return (
            <ul id="recent-posts" className={ 'blocks ' + postType + ' ' + ( type === 'block' ? 'post three' : type ) + ' ' + ( slider ?  'uk-slider-items' : '' ) }>
                { recentPosts.map( ( post: Post, index: number ) => {
                    if ( type == 'text' ) {
                        // CTA settings
                        const ctaSettings: CTASettings = {
                            url: post.permalink,
                            title: post.post_title,
                            classes: [ 'block-link' ],
                        }
                        return (
                            <li key={ index }>
                                <CTA { ...ctaSettings }>
                                    { doParse( post.post_title ) }
                                </CTA>
                            </li>
                        );
                    } else {
                        return <PartialTemplateLoader key={ index } index={ index } type={ type } post={ post } perRow={ 3 } panelSlider= { slider } />
                    }
                } ) }
            </ul>
        );
    }

    if ( doLength( recentPosts ) ) {
        return (
            <>
                { slider ?
                    <div className="panel-slider-wrapper" uk-slider="finite: true">
                        <Posts />
                        <SliderNav dotNav={ false } length={ doLength( recentPosts ) } />
                    </div>
                : <Posts /> }
            </>
        );
    } else {
        return null;
    }
}
export default RecentPosts;