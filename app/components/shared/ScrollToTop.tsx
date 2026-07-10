import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = (): null => {
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect( () => {
        window.scrollTo( { top: 0, left: 0, behavior: 'instant' } );
    }, [ pathname ] );

    return null;
};
export default ScrollToTop;