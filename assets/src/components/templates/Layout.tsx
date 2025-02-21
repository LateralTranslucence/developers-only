import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DoBackToTop } from '@/utils/display';
import TemplateLoader from '@/loaders/TemplateLoader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/components/to-top.scss';

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