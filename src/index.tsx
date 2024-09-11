import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from 'src/components/templates/Layout';

const rootElement = document.getElementById( 'do-root' );

if ( rootElement ) {
    const router = createBrowserRouter( [
        {
            path: `${relativeHomeURL}/`,
            element: <Layout postType="landing-page" slug="home" />,
        },
        {
            path: `${relativeHomeURL}/iframe/:postType/:slug`,
            element: <Layout iframe={ true } />,
        },
        {
            path: `${relativeHomeURL}/iframe/:slug`,
            element: <Layout postType="landing-page" iframe={ true } />,
        },
        {
            path: `${relativeHomeURL}/:postType/:slug`,
            element: <Layout />,
        },
        {
            path: `${relativeHomeURL}/:slug`,
            element: <Layout postType="landing-page" />,
        },
    ] );

    ReactDOM.createRoot( rootElement ).render(
        <RouterProvider router={ router } />
    );
} else {
    console.error( 'Failed to find the root element.' );
}