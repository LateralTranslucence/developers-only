import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/templates/Layout';
const rootElement = document.getElementById( 'root' );

if ( rootElement ) {
    ReactDOM.createRoot( rootElement ).render(
        <BrowserRouter basename={ window.relativeHomeURL || undefined }>
            <Routes>
                <Route path="/" element={ <Layout postType="landing-page" slug="home" /> } />
                <Route path="/:postType/:slug" element={ <Layout /> } />
                <Route path="/:slug" element={ <Layout postType="landing-page" /> } />
            </Routes>
        </BrowserRouter>
    );
} else {
    console.error( 'Failed to find the root element.' );
}
