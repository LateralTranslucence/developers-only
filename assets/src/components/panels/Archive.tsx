import React from 'react';
import { useEffect, useState } from 'react';
import { doConvertNumberToWords, doLength } from '@/utils/helpers';
import { doGetArchivePosts } from '@/utils/api';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import SliderNav from '@/components/shared/SliderNav';
import '@/styles/components/posts.scss';
import '@/styles/components/blocks.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { Post } from '@/utils/types/Post';
import { APIResult } from '@/utils/types/APIResult';
import { SearchQueryArgs } from '@/utils/types/SearchQueryArgs';

const Archive:React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const archiveFieldKeys: Record<string, string> = {
        postType: panelPrefix + '_post_type' + panelSuffix,
        subject: panelPrefix + '_subject' + panelSuffix,
        region: panelPrefix + '_region' + panelSuffix,
        perRow: panelPrefix + '_posts_per_row' + panelSuffix,
        slider: panelPrefix + '_slider' + panelSuffix,
        viewType: panelPrefix + '_view_type' + panelSuffix,
        postOrder: panelPrefix + '_post_order' + panelSuffix,
        maxPosts: panelPrefix + '_max_posts' + panelSuffix,
        modal: panelPrefix + '_modal' + panelSuffix,
    };
    // Post type posts
    const panelPostType: string = post.fields[ archiveFieldKeys.postType ] ? post.fields[ archiveFieldKeys.postType ] : 'any';
    // const panelPostSubject: Array<string> = post.fields[ archiveFieldKeys.subject ];
    // const panelPostRegion: Array<string> = post.fields[ archiveFieldKeys.region ];
    const panelPostsViewType: string = post.fields[ archiveFieldKeys.viewType ] ? post.fields[ archiveFieldKeys.viewType ] : 'block';
    const panelPostsModal: boolean = Boolean( post.fields[ archiveFieldKeys.modal ] );
    const panelPostsOrderbys: string = post.fields[ archiveFieldKeys.postOrder ];
    const panelPerRow: number = post.fields[ archiveFieldKeys.perRow ] && typeof post.fields[ archiveFieldKeys.perRow ] === 'number' ? Number( post.fields[ archiveFieldKeys.perRow ] ) : 3;
    const panelPostsMax: number = post.fields[ archiveFieldKeys.maxPosts ] ? post.fields[ archiveFieldKeys.maxPosts ] : panelPerRow * 3;
    const panelPostArgs: SearchQueryArgs = {
        post_type: panelPostType,
        posts_per_page: panelPostsMax,
        orderby: panelPostsOrderbys, 
    };
    // // Subject Filter
    // if ( panelPostSubject ) {
    //     panelPostArgs.subject = panelPostSubject;
    // }
    // // Region Filter
    // if ( panelPostRegion ) {
    //     panelPostArgs.region = panelPostRegion;
    // }
    // Get the posts
    const [ posts, setPosts ] = useState<Array<Post>>( [] );   
    useEffect( () => {
        async function fetchData() {
            await doGetArchivePosts( panelPostArgs ).then( ( data: APIResult ) => {
                setPosts( data.json as Array<Post> );
            } );
        }
        fetchData();
    }, [] );

    
    // Slider
    const panelSlider: boolean = Boolean( post.fields[ archiveFieldKeys.slider ] );

    // Post list
    const PostList: React.FC<{ posts: Array<Post> }> = ( { posts } )  => {
        return (
            <ul className={ 'blocks post ' + ( panelSlider ? 'uk-slider-items ' : '' ) + doConvertNumberToWords( panelPerRow ) + ( panelPostsViewType == 'block' ? '' :  ' ' + panelPostsViewType + '-block' ) + ( panelPostsModal ? ' do-modals' : '' ) }>
                { posts.map( ( post: Post, index: number ) => {
                    return <PartialTemplateLoader key={ index } index={ index } type={ panelPostsViewType } post={ post } perRow={ panelPerRow } panelSlider = { panelSlider } />
                } ) }
            </ul>
        );
    }

    if ( doLength( posts ) ) {
        return (
            <>
            { panelSlider ?
                <div className="panel-slider-wrapper" uk-slider="finite: true">
                    <PostList posts={ posts } />
                    <SliderNav dotNav={ false } length={ doLength( posts ) } />
                </div>
            : <PostList posts={ posts } /> }
            </>
        );
    } else {
        return null;
    }
}
export default Archive;