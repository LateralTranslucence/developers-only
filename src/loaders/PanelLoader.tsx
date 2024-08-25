import React from 'react';
import { Suspense, lazy } from 'react';
import { ComponentLoaderMap } from 'src/utils/types/ComponentLoaderMap';
import { PanelLoaderProps } from 'src/utils/types/PanelLoaderProps';
const Accordion = lazy( () => import( 'src/components/panels/Accordion' ) );
const Archive = lazy( () => import( 'src/components/panels/Archive' ) );
const Blocks = lazy( () => import( 'src/components/panels/Blocks' ) );
const Callout = lazy( () => import( 'src/components/panels/Callout' ) );
const ContentSlider = lazy( () => import( 'src/components/panels/ContentSlider' ) );
const CTA = lazy( () => import( 'src/components/panels/CTA' ) );
const Custom = lazy( () => import( 'src/components/panels/Custom' ) );
const DecisionTree = lazy( () => import( 'src/components/panels/DecisionTree' ) );
const Download = lazy( () => import( 'src/components/panels/Download' ) );
const FeaturedMedia = lazy( () => import( 'src/components/panels/FeaturedMedia' ) );
const FeaturedPost = lazy( () => import( 'src/components/panels/FeaturedPost' ) );
const Form = lazy( () => import( 'src/components/panels/Form' ) );
const Gallery = lazy( () => import( 'src/components/panels/Gallery' ) );
const Iframe = lazy( () => import( 'src/components/panels/Iframe' ) );
const LinearContent = lazy( () => import( 'src/components/panels/LinearContent' ) );
const LogoGallery = lazy( () => import( 'src/components/panels/LogoGallery' ) );
const MediaTabs = lazy( () => import( 'src/components/panels/MediaTabs' ) );
const Posts = lazy( () => import( 'src/components/panels/Posts' ) );
const Report = lazy( () => import( 'src/components/panels/Report' ) );
const Search = lazy( () => import( 'src/components/panels/Search' ) );
const SectionIntro = lazy( () => import( 'src/components/panels/SectionIntro' ) );
const StaffBios = lazy( () => import( 'src/components/panels/StaffBios' ) );
const Stats = lazy( () => import( 'src/components/panels/Stats' ) );
const Tabs = lazy( () => import( 'src/components/panels/Tabs' ) );
const TestimonialCarousel = lazy( () => import( 'src/components/panels/TestimonialCarousel' ) );
const Text = lazy( () => import( 'src/components/panels/Text' ) );
const TextMedia = lazy( () => import( 'src/components/panels/TextMedia' ) );
const Timeline = lazy( () => import( 'src/components/panels/Timeline' ) );
const Videos = lazy( () => import( 'src/components/panels/Videos' ) );

const components: ComponentLoaderMap = {
    'accordion': Accordion,
    'archive': Archive,
    'blocks': Blocks,
    'callout': Callout,
    'content-slider': ContentSlider,
    'cta': CTA,
    'custom': Custom,
    'decision-tree': DecisionTree,
    'download': Download,
    'featured-media': FeaturedMedia,
    'featured-post': FeaturedPost,
    'form': Form,
    'gallery': Gallery,
    'iframe': Iframe,
    'linear-content': LinearContent,
    'logo-gallery': LogoGallery,
    'media-tabs': MediaTabs,
    'posts': Posts,
    'report': Report,
    'search': Search,
    'section-intro': SectionIntro,
    'staff-bios': StaffBios,
    'stats': Stats,
    'tabs': Tabs,
    'testimonial-carousel': TestimonialCarousel,
    'text': Text,
    'text-media': TextMedia,
    'timeline': Timeline,
    'videos': Videos,
}
const PanelLoader: React.FC<PanelLoaderProps> = ( props ) => {
    const ComponentName: React.FC<any> | null = props.name ? components[ props.name ] : null;

    if ( ComponentName ) {
        return (
            <Suspense fallback="">
                <ComponentName { ...props } />
            </Suspense>
        );    
    } else {
        return null;
    }
}
export default PanelLoader;