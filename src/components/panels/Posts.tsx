import React from 'react';
import { doConvertNumberToWords, doLength } from 'src/utils/helpers';
import SliderNav from 'src/components/shared/SliderNav';
import PartialTemplateLoader from 'src/loaders/PartialTemplateLoader';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/posts.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';
import Post from 'src/utils/types/Post';

const Posts: React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const postsFieldKeys: Record<string, string> = {
        postType: panelPrefix + '_post_type' + panelSuffix,
        posts: panelPrefix + '_posts' + panelSuffix,
        perRow: panelPrefix + '_posts_per_row' + panelSuffix,
        slider: panelPrefix + '_slider' + panelSuffix,
        modal: panelPrefix + '_modal' + panelSuffix,
        viewType: panelPrefix + '_view_type' + panelSuffix,
    };
    const posts: Array<Post> = data.fields[ postsFieldKeys.posts ];
    const panelPerRow: number = data.fields[ postsFieldKeys.perRow ] ? Number( data.fields[ postsFieldKeys.perRow ] ) : 3;
    const panelSlider: boolean = Boolean( data.fields[ postsFieldKeys.slider ] );
    const panelPostsModal: boolean = Boolean( data.fields[ postsFieldKeys.modal ] );
    const panelPostsViewType: string = data.fields[ postsFieldKeys.viewType ] ? data.fields[ postsFieldKeys.viewType ] : 'block';

    const PostList: React.FC<{ posts: Array<Post> }> = ( { posts = [] } ): JSX.Element => {
        return (
            <ul className={ 'panel-post-items post blocks ' + doConvertNumberToWords( panelPerRow ) + ( panelSlider ? ' uk-slider-items' : '' ) + ( panelPostsViewType !== 'block' ? ' ' + panelPostsViewType + '-block' : '' ) + ( panelPostsModal ? ' do-modals' : '' ) }>
                { posts.map( ( post: Post, index: number ) => {
                    return <PartialTemplateLoader key={ index } index={ index } type={ panelPostsViewType } post={ post } panelSlider={ panelSlider } />
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
                    <SliderNav length={ doLength( posts ) } />
                </div>
            : <PostList posts={ posts } /> }
            </>
        );
    } else {
        return null;
    }
}
export default Posts;