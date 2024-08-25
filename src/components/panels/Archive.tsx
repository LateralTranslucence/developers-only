import React from 'react';
const { useEffect, useState } = wp.element;
import { doConvertNumberToWords, doLength } from 'src/utils/helpers';
import { getArchivePosts } from 'src/utils/api';
import PartialTemplateLoader from 'src/loaders/PartialTemplateLoader';
import SliderNav from 'src/components/shared/SliderNav';
import 'assets/styles/components/posts.scss';
import 'assets/styles/components/blocks.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const Archive:React.FC<PanelLoaderProps> = ( { 
    data, 
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
    const panelPostType: string = data.fields[ archiveFieldKeys.postType ] ? data.fields[ archiveFieldKeys.postType ] : 'any';
    const panelPostSubject: Array<string> = data.fields[ archiveFieldKeys.subject ];
    const panelPostRegion: Array<string> = data.fields[ archiveFieldKeys.region ];
    const panelPostsViewType: string = data.fields[ archiveFieldKeys.viewType ] ? data.fields[ archiveFieldKeys.viewType ] : 'block';
    const panelPostsModal: boolean = Boolean( data.fields[ archiveFieldKeys.modal ] );
    const panelPostsOrderbys: string = data.fields[ archiveFieldKeys.postOrder ];
    const panelPerRow: number = data.fields[ archiveFieldKeys.perRow ] && typeof data.fields[ archiveFieldKeys.perRow ] === 'number' ? Number( data.fields[ archiveFieldKeys.perRow ] ) : 3;
    const panelPostsMax: number = data.fields[ archiveFieldKeys.maxPosts ] ? data.fields[ archiveFieldKeys.maxPosts ] : panelPerRow * 3;
    const panelPostArgs: Record<string, any> = {
        post_type: panelPostType,
        posts_per_page: panelPostsMax,
        orderby: panelPostsOrderbys,
    };
    // Subject Filter
    if ( panelPostSubject ) {
        panelPostArgs.subject = panelPostSubject;
    }
    // Region Filter
    if ( panelPostRegion ) {
        panelPostArgs.region = panelPostRegion;
    }
    // Get the posts
    const [ posts, setPosts ] = useState<Object>( [] );   
    useEffect( () => {
        async function fetchData() {
            await getArchivePosts( panelPostArgs ).then( ( data: any ) => {
                setPosts( data.json );
            } );
        }
        fetchData();
    }, [] );

    
    // Slider
    const panelSlider: boolean = Boolean( data.fields[ archiveFieldKeys.slider ] );

    // Post list
    const PostList: React.FC<Record<string, any>> = ( { posts } )  => {
        return (
            <ul className={ 'blocks post ' + ( panelSlider ? 'uk-slider-items ' : '' ) + doConvertNumberToWords( panelPerRow ) + ( panelPostsViewType == 'block' ? '' :  ' ' + panelPostsViewType + '-block' ) + ( panelPostsModal ? ' do-modals' : '' ) }>
                { posts.map( ( post: Record<string, any>, index: number ) => {
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