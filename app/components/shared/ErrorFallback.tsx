import React from 'react';
import '@/styles/components/error-boundary.scss';

// Shown in place of a page that failed to load or render. Deliberately plain
// markup (no CTA/Heading/etc.): if those are implicated in a crash, this must
// still render.
const ErrorFallback: React.FC = () => {
    return (
        <div className="error-boundary" role="alert">
            <p className="error-boundary__message">Something went wrong loading this page.</p>
            <a className="error-boundary__link" href={ ( window.relativeHomeURL || '' ) + '/' }>Return home</a>
        </div>
    );
};
export default ErrorFallback;
