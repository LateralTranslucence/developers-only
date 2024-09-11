import React, { Suspense, lazy } from 'react';
import { ComponentLoaderMap } from 'src/utils/types/ComponentLoaderMap';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';
// Block
const DefaultBlock = lazy( () => import( 'src/components/templates/block/DefaultBlock' ) );
const DoCompanyBlock = lazy( () => import( 'src/components/templates/block/DOCompanyBlock' ) );
const DoEventBlock = lazy( () => import( 'src/components/templates/block/DOEventBlock' ) );
const DoStaffBlock = lazy( () => import( 'src/components/templates/block/DOStaffBlock' ) );
const DoMediaCoverageBlock = lazy( () => import( 'src/components/templates/block/DOMediaCoverageBlock' ) );
const DoPodcastBlock = lazy( () => import( 'src/components/templates/block/DOPodcastBlock' ) );
const DoPressReleaseBlock = lazy( () => import( 'src/components/templates/block/DOPressReleaseBlock' ) );
// List
const DefaultList = lazy( () => import( 'src/components/templates/list/DefaultList' ) );
const DoGlossaryTermList = lazy( () => import( 'src/components/templates/list/DOGlossaryTermList' ) );
const DoTimelineList = lazy( () => import( 'src/components/templates/list/DOTimelineList' ) );
// Simple
const DefaultSimple = lazy( () => import( 'src/components/templates/simple/DefaultSimple' ) );
const DoCompanySimple = lazy( () => import( 'src/components/templates/simple/DOCompanySimple' ) );

const templates: Record<string, ComponentLoaderMap> = {
    block: {
        default: DefaultBlock,
        do_company: DoCompanyBlock,
        do_event: DoEventBlock,
        do_staff: DoStaffBlock,
        do_media_coverage: DoMediaCoverageBlock,
        do_podcast: DoPodcastBlock,
        do_press_release: DoPressReleaseBlock,
    },
    list: {
        default: DefaultList,
        do_glossary_term: DoGlossaryTermList,
        do_timeline: DoTimelineList,
    },
    simple: {
        default: DefaultSimple,
        do_company: DoCompanySimple,
    },

}

const PartialTemplateLoader: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type = '',
} ) => {
    // Select the correct template type. Default is block
    const finalType = templates[ type ] ? templates[ type ] : templates.block;
    const TemplateName =  finalType[ post.post_type ] ? finalType[ post.post_type ] : finalType.default;

    return (
        <Suspense fallback="">
            <TemplateName index={ index } panelSlider={ panelSlider } perRow={ perRow } post={ post } type={ type } />
        </Suspense>
    );
}
export default PartialTemplateLoader;