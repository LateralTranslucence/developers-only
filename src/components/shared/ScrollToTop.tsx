import React from 'react';

const ScrollToTop: React.FC = (): JSX.Element | null => {
    // Automatically scrolls to top whenever pathname changes
    window.scrollTo( { top: 0, left: 0, behavior: "instant" } );
    return null;
}
export default ScrollToTop;