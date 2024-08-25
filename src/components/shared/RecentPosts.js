const { useEffect, useState } = wp.element;
import { getArchivePosts } from 'src/utils/api.js';
import { doLength, doParse } from 'src/utils/helpers.js';
import CTA from 'src/components/shared/CTA.js';
import PartialTemplateLoader from 'src/loaders/PartialTemplateLoader.js';
import SliderNav from 'src/components/shared/SliderNav.js';
import 'assets/styles/components/posts.scss';
import 'assets/styles/components/blocks.scss';

export default function RecentPosts( props ) {
    const currentPostID = props.postID ? props.postID : '';
    const postType = props.postType ? props.postType : '';
    const postCount = props.count ? props.count : 10;
    const excludeCurrent = currentPostID ? [ currentPostID ] : [];
    const type = props.type ? props.type : 'block';
    const slider = props.slider !== undefined ? Boolean( props.slider ) : true;

    const postsArgs = {
        post_type: postType,
        posts_per_page: postCount,
        orderby: 'date_desc',
        post__not_in: excludeCurrent,
        nopaging: true,
    };

    const [ recentPosts, setRecentPosts ] = useState( [] );

    useEffect( () => {
        async function fetchData() {
            await getArchivePosts( postsArgs ).then( ( data ) => {
                setRecentPosts( data.json );
            } );
        }
        fetchData();
    }, [] );

    function Posts() {
        return (
            <ul id="recent-posts" className={ 'blocks ' + postType + ' ' + ( type === 'block' ? 'post three' : type ) + ' ' + ( slider ?  'uk-slider-items' : '' ) }>
                { recentPosts.map( ( post, index ) => {
                    if ( type == 'text' ) {
                        // CTA settings
                        const ctaSettings = {
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
                        return <PartialTemplateLoader key={ index } index={ index } type={ type } post={ post } perRow="three" panelSlider= { slider } />
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
        null;
    }

}