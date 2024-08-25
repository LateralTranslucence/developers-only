import React, { Suspense, lazy } from 'react';
import ComponentLoaderMap from 'src/utils/types/ComponentLoaderMap';
import PartialTemplateProps from 'src/utils/types/PartialTemplateProps';
// Block
const DefaultBlock = lazy( () => import( 'src/templates/block/DefaultBlock' ) );
const DoCompanyBlock = lazy( () => import( 'src/templates/block/DoCompanyBlock' ) );
const DoEventBlock = lazy( () => import( 'src/templates/block/DoEventBlock' ) );
const DoStaffBlock = lazy( () => import( 'src/templates/block/DoStaffBlock' ) );
const DoMediaCoverageBlock = lazy( () => import( 'src/templates/block/DoMediaCoverageBlock' ) );
const DoPodcastBlock = lazy( () => import( 'src/templates/block/DoPodcastBlock' ) );
const DoPressReleaseBlock = lazy( () => import( 'src/templates/block/DoPressReleaseBlock' ) );
// List
const DefaultList = lazy( () => import( 'src/templates/list/DefaultList' ) );
const DoGlossaryTermList = lazy( () => import( 'src/templates/list/DoGlossaryTermList' ) );
const DoTimelineList = lazy( () => import( 'src/templates/list/DoTimelineList' ) );
// Simple
const DefaultSimple = lazy( () => import( 'src/templates/simple/DefaultSimple' ) );
const DoCompanySimple = lazy( () => import( 'src/templates/simple/DoCompanySimple' ) );

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

const PartialTemplateLoader: React.FC<PartialTemplateProps> = ( props ) => {
    // Select the correct template type. Default is block
    const type = templates[ props.type ] ? templates[ props.type ] : templates.block;
    const TemplateName =  type[ props.post.post_type ] ? type[ props.post.post_type ] : type.default;

    return (
        <Suspense fallback="">
            <TemplateName { ...props } />
        </Suspense>
    );
}
export default PartialTemplateLoader;