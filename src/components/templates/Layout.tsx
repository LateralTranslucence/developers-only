import React from 'react';
const { useEffect, useState } = wp.element;
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
const Layout: React.FC<LayoutProps> = ( { iframe = false, postType: propPostType = '', slug: propSlug = '' } ) => {
    const { postType: paramPostType, slug: paramSlug } = useParams();
    const finalPostType: string = propPostType || paramPostType || '';
    const finalSlug: string = propSlug || paramSlug || '';
    const finalIframe: boolean = iframe || false;
    const [ mainElementClasses, setMainElementClasses ] = useState<string>( '' );
    const layoutClasses = ( classes: Array<string> ) => {
        if ( finalIframe ) {
            classes.push( 'iframe' );
        }
        setMainElementClasses( classes.join( ' ' ) );
    }
    
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
                        queryString={ window.location.search.replace( '?', '' ) } />
                </main>
            : <>
                <Header />
                <main id="content" className={ mainElementClasses }>
                    <TemplateLoader 
                        postType={ finalPostType } 
                        slug={ finalSlug } 
                        layoutClassesFunction={ layoutClasses }
                        queryString={ window.location.search.replace( '?', '' ) } />
                </main>
                <Footer />
            </> }
        </>
    )
};
export default Layout;