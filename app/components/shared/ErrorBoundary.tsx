import React from 'react';
import ErrorFallback from '@/components/shared/ErrorFallback';

interface ErrorBoundaryProps {
    children: React.ReactNode;
    // What to render instead of the crashed subtree. Defaults to the page-level
    // ErrorFallback; null renders nothing.
    fallback?: React.ReactNode;
    // Called once when an error is caught - e.g. to clear a "loading" state
    // that would otherwise never resolve since the crashed subtree never
    // gets to call its own onLoad.
    onError?: () => void;
    // Remount the subtree (clearing any caught error) whenever this changes -
    // e.g. pass the current route so navigating away from a broken page recovers.
    resetKey?: string;
}
interface ErrorBoundaryState {
    hasError: boolean;
}

// Class component: getDerivedStateFromError/componentDidCatch have no hook
// equivalent. Catches render/lifecycle errors in the subtree below it (not
// event handlers). Layout wraps each page in one, so a broken template can't
// blank the whole app (Header/Footer are siblings, outside it), and Panel
// wraps each panel in one, so a broken panel can't blank the page.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor( props: ErrorBoundaryProps ) {
        super( props );
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch( error: Error, info: React.ErrorInfo ): void {
        console.error( 'ErrorBoundary caught an error:', error, info.componentStack );
        this.props.onError?.();
    }

    componentDidUpdate( prevProps: ErrorBoundaryProps ): void {
        if ( this.state.hasError && prevProps.resetKey !== this.props.resetKey ) {
            this.setState( { hasError: false } );
        }
    }

    render(): React.ReactNode {
        if ( this.state.hasError ) {
            return this.props.fallback !== undefined ? this.props.fallback : <ErrorFallback />;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
