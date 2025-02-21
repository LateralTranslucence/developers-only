import React from 'react';
import { doConvertNumberToWords, doLength } from '@/utils/helpers';
import SliderNav from '@/components/shared/SliderNav';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';
import { PanelProps } from '@/utils/types/PanelProps';
import { Post } from '@/utils/types/Post';

const Posts: React.FC<PanelProps> = ( { 
    post, 
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
    const posts: Array<Post> = post.fields[ postsFieldKeys.posts ];
    const panelPerRow: number = post.fields[ postsFieldKeys.perRow ] ? Number( post.fields[ postsFieldKeys.perRow ] ) : 3;
    const panelSlider: boolean = Boolean( post.fields[ postsFieldKeys.slider ] );
    const panelPostsModal: boolean = Boolean( post.fields[ postsFieldKeys.modal ] );
    const panelPostsViewType: string = post.fields[ postsFieldKeys.viewType ] ? post.fields[ postsFieldKeys.viewType ] : 'block';

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