const { useEffect, useState } = wp.element;
import React from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import { DoBackToTop } from 'src/utils/display';
import TemplateLoader from 'src/loaders/TemplateLoader';
import Header from 'src/components/layout/Header';
import Footer from 'src/components/layout/Footer';
import 'aos/dist/aos.css'; 
import 'assets/styles/components/to-top.scss';

interface LayoutProps {
    iframe?: boolean;
    postType?: string;
    slug?: string;
}
const Layout: React.FC<LayoutProps> = ( { iframe = false, postType = '', slug = '' } ) => {
    const { postTypeParam, slugParam } = useParams();
    const finalSlug: string = slug ? slug : ( slugParam ? slugParam : '' );
    const finalPostType: string = postType ? postType : ( postTypeParam ? postTypeParam : '' );
    const [ mainElementClasses, setMainElementClasses ] = useState<string>( '' );
    const finalIframe: boolean = iframe ? iframe : false;
    const layoutClasses = ( classes: Array<string> ) => {
        if ( finalIframe ) {
            classes.push( 'iframe' );
        }
        const classesString: string = classes.join( ' ' );
        setMainElementClasses( classesString );
    }
    
    const queryString: string = window.location.search.replace( '?', '' );

    useEffect( () => {
        new DoBackToTop();
        AOS.init( {
            offset: 150, 
            delay: 100, 
            duration: 1100,
            easing: 'ease',
            once: true, 
        } );
    }, [] );

    return (
        <>
            { iframe ? 
                <main id="content" className={ mainElementClasses }>
                    <TemplateLoader 
                        postType={ finalPostType } 
                        slug={ finalSlug } 
                        layoutClassesFunction={ layoutClasses }
                        queryString={ queryString } />
                </main>
            : <>
                <Header color={ finalSlug === 'home' ? 'dark' : 'light' } />
                <main id="content" className={ mainElementClasses }>
                    <TemplateLoader 
                        postType={ finalPostType } 
                        slug={ finalSlug } 
                        layoutClassesFunction={ layoutClasses }
                        queryString={ queryString } />
                </main>
                <Footer />
            </> }
        </>
    )
};
export default Layout;