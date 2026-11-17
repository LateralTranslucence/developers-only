import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import ScrollToTop from '@/components/shared/ScrollToTop';

// Wraps every full-page route: the header stays mounted across navigation,
// and the matched route's Layout renders below it.
const SiteShell: React.FC = () => {
    return (
        <>
            <ScrollToTop />
            <Header />
            <Outlet />
        </>
    );
};
export default SiteShell;
