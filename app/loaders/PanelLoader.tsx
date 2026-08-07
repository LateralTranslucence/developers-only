import React from 'react';
import { Suspense, lazy } from 'react';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
import { PanelProps } from '@/utils/types/PanelProps';
import { pascalToKebab } from '@/utils/helpers';
const Accordion = lazy( () => import( '@/components/panels/Accordion' ) );
const Blocks = lazy( () => import( '@/components/panels/Blocks' ) );
const CTA = lazy( () => import( '@/components/panels/CTA' ) );
const DecisionTree = lazy( () => import( '@/components/panels/DecisionTree' ) );
const FeaturedMedia = lazy( () => import( '@/components/panels/FeaturedMedia' ) );
const FeaturedPost = lazy( () => import( '@/components/panels/FeaturedPost' ) );
const Form = lazy( () => import( '@/components/panels/Form' ) );
const Gallery = lazy( () => import( '@/components/panels/Gallery' ) );
const Posts = lazy( () => import( '@/components/panels/Posts' ) );
const Quotes = lazy( () => import( '@/components/panels/Quotes' ) );
const Search = lazy( () => import( '@/components/panels/Search' ) );
const Stats = lazy( () => import( '@/components/panels/Stats' ) );
const Tabs = lazy( () => import( '@/components/panels/Tabs' ) );
const Text = lazy( () => import( '@/components/panels/Text' ) );
const TextMedia = lazy( () => import( '@/components/panels/TextMedia' ) );

const components: ComponentLoaderMap<PanelProps> = {
    'accordion': Accordion,
    'blocks': Blocks,
    'cta': CTA,
    'form': Form,
    'decision-tree': DecisionTree,
    'featured-media': FeaturedMedia,
    'featured-post': FeaturedPost,
    'gallery': Gallery,
    'posts': Posts,
    'quotes': Quotes,
    'search': Search,
    'stats': Stats,
    'tabs': Tabs,
    'text': Text,
    'text-media': TextMedia,
};

// Auto-discover extension panel components (extensions/app/components/panels/*.tsx)
// - see extensions/README.md. A file's PascalCase name becomes its kebab-case
// panel type key (e.g. CustomStats.tsx -> 'custom-stats'), matched against the
// 'devo_panel_types' key registered on the PHP side. Core panels above always
// win on a name collision.
const extensionPanels = import.meta.glob<{ default: React.ComponentType<PanelProps> }>( '/extensions/app/components/panels/*.tsx' );
for ( const path in extensionPanels ) {
    const name = path.replace( /^.*\//, '' ).replace( /\.tsx$/, '' );
    const key = pascalToKebab( name );
    if ( ! ( key in components ) ) {
        components[ key ] = lazy( extensionPanels[ path ] );
    }
}

const PanelLoader: React.FC<PanelProps> = ( props ) => {
    const ComponentName = props.name ? components[ props.name ] : null;

    if ( ComponentName ) {
        return (
            <Suspense fallback="">
                <ComponentName { ...props } />
            </Suspense>
        );    
    } else {
        return null;
    }
};
export default PanelLoader;
