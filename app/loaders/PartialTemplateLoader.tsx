import React, { Suspense, lazy } from 'react';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';
import { getPostType } from '@/utils/helpers';

// Block
const DefaultBlock = lazy( () => import( '@/components/templates/block/DefaultBlock' ) );

// Simple
const DefaultSimple = lazy( () => import( '@/components/templates/simple/DefaultSimple' ) );

const templates: Record<string, ComponentLoaderMap> = {
    block: {
        default: DefaultBlock,
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
    const TemplateName = finalType[ getPostType( post ) ] ?? finalType.default;

    return (
        <Suspense fallback="">
            <TemplateName index={ index } panelSlider={ panelSlider } perRow={ perRow } post={ post } type={ type } showFeatured={ showFeatured } />
        </Suspense>
    );
};
export default PartialTemplateLoader;