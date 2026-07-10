import React, { Suspense, lazy } from 'react';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';

// Block
const DefaultBlock = lazy( () => import( '@/components/templates/block/DefaultBlock' ) );

// List
const DefaultList = lazy( () => import( '@/components/templates/list/DefaultList' ) );

// Simple
const DefaultSimple = lazy( () => import( '@/components/templates/simple/DefaultSimple' ) );

const templates: Record<string, ComponentLoaderMap> = {
    block: {
        default: DefaultBlock,
    },
    list: {
        default: DefaultList,
    },
    simple: {
        default: DefaultSimple,
    },
};

const PartialTemplateLoader: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    showFeatured = false,
    type = '',
} ) => {
    // Select the correct template type. Default is block
    const finalType = templates[ type ] ? templates[ type ] : templates.block;
    const TemplateName = finalType[ post.post_type ] ? finalType[ post.post_type ] : finalType.default;

    return (
        <Suspense fallback="">
            <TemplateName index={ index } panelSlider={ panelSlider } perRow={ perRow } post={ post } type={ type } showFeatured={ showFeatured } />
        </Suspense>
    );
};
export default PartialTemplateLoader;