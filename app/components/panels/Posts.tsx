import React, { JSX, useEffect, useRef, useState } from 'react';
import { getArrayField, getBooleanField, getStringField } from '@/utils/helpers';
import SliderNav from '@/components/shared/SliderNav';
import PartialTemplateLoader from '@/loaders/PartialTemplateLoader';
import { PanelProps } from '@/utils/types/PanelProps';
import { Post } from '@/utils/types/Post';
import '@/styles/components/blocks.scss';
import '@/styles/components/posts.scss';
import { CTASettings } from '@/utils/types/CTASettings';
import CTAs from '../shared/CTAs';

const Posts: React.FC<PanelProps> = ( { 
    post, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element | null => {
    const posts = getArrayField<Post>( post.fields, panelPrefix + '_posts' + panelSuffix );
    const panelSlider: boolean = posts.length > 3;
    const panelPostsModal: boolean = getBooleanField( post.fields, panelPrefix + '_modal' + panelSuffix );
    const panelPostsViewType = getStringField( post.fields, panelPrefix + '_view_type' + panelSuffix, 'block' );
    const ctas = getArrayField<CTASettings>( post.fields, panelPrefix + '_ctas' + panelSuffix );

    const sliderRef = useRef<HTMLUListElement | null>( null );
    const [currentPage, setCurrentPage] = useState( 0 );
    const [pageCount, setPageCount] = useState( posts.length );

    useEffect( () => {
        const calculate = () => {
            if ( !sliderRef.current ) return;
            const firstSlide = sliderRef.current.querySelector( 'li' );
            if ( !( firstSlide instanceof HTMLElement ) ) return;
            const computedStyles = window.getComputedStyle( sliderRef.current );
            const gap = parseFloat( computedStyles.columnGap || computedStyles.gap || '0' );
            const itemsPerPage = Math.max( 1, Math.round( sliderRef.current.clientWidth / ( firstSlide.offsetWidth + gap ) ) );
            setPageCount( Math.ceil( posts.length / itemsPerPage ) );
        };
        calculate();
        window.addEventListener( 'resize', calculate );
        return () => window.removeEventListener( 'resize', calculate );
    }, [posts.length] );

    const handleSliderNav = ( direction: 'prev' | 'next' ): void => {
        if ( !sliderRef.current ) return;
        const pageWidth = sliderRef.current.clientWidth;
        sliderRef.current.scrollBy( {
            left: direction === 'next' ? pageWidth : -pageWidth,
            behavior: 'smooth',
        } );
        setCurrentPage( prev =>
            direction === 'next' ? Math.min( prev + 1, pageCount - 1 ) : Math.max( prev - 1, 0 )
        );
    };

    const handleGoTo = ( page: number ): void => {
        if ( !sliderRef.current ) return;
        sliderRef.current.scrollTo( {
            left: page * sliderRef.current.clientWidth,
            behavior: 'smooth',
        } );
        setCurrentPage( page );
    };

    const postListClass = `blocks blocks--post blocks--three${panelSlider ? ' blocks--slider' : ''}${panelPostsViewType !== 'block' ? ' blocks--' + panelPostsViewType : ''}${panelPostsModal ? ' blocks--modals' : ''}`;

    if ( posts.length > 0 ) {
        return (
            <>
            { panelSlider ? (
                <>
                { ctas.length > 0 ?
                    <CTAs ctas={ ctas } />
                : null }
                <div className="panelSliderWrapper">
                    <ul ref={ sliderRef } className={ postListClass }>
                        { posts.map( ( post: Post, index: number ) => (
                            <PartialTemplateLoader key={ index } index={ index } type={ panelPostsViewType } post={ post } panelSlider={ panelSlider } />
                        ) ) }
                    </ul>
                    <SliderNav
                        length={ pageCount }
                        currentIndex={ currentPage }
                        onPrev={ () => handleSliderNav( 'prev' ) }
                        onNext={ () => handleSliderNav( 'next' ) }
                        onGoTo={ handleGoTo }
                    />
                </div>
                </>
            ) : (
                <>
                { ctas.length > 0 ?
                    <CTAs ctas={ ctas } />
                : null }
                <ul className={ postListClass }>
                    { posts.map( ( post: Post, index: number ) => (
                        <PartialTemplateLoader key={ index } index={ index } type={ panelPostsViewType } post={ post } panelSlider={ panelSlider } />
                    ) ) }
                </ul>
                </>
            )}
            </>
        );
    } else {
        return null;
    }
};
export default Posts;
