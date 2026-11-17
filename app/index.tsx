import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/templates/Layout';
import SiteShell from '@/components/templates/SiteShell';
const rootElement = document.getElementById( 'root' );

if ( rootElement ) {
    ReactDOM.createRoot( rootElement ).render(
        <BrowserRouter basename={ window.relativeHomeURL || undefined }>
            <Routes>
                { /* A page alone, for display in a modal's <iframe> (see CTA.tsx).
                     PHP has matching rewrite rules for these URLs. */ }
                <Route path="/iframe/:slug" element={ <Layout iframe postType="landing-page" /> } />
                <Route path="/iframe/:postType/:slug" element={ <Layout iframe /> } />
                <Route element={ <SiteShell /> }>
                    <Route path="/" element={ <Layout postType="landing-page" slug="home" /> } />
                    <Route path="/:postType/:slug" element={ <Layout /> } />
                    <Route path="/:slug" element={ <Layout postType="landing-page" /> } />
                    { /* Three or more segments: no post type uses them */ }
                    <Route path="*" element={ <Layout notFound /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    );
} else {
    console.error( 'Failed to find the root element.' );
}
