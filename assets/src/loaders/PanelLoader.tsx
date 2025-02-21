import React from 'react';
import { Suspense, lazy } from 'react';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
import { PanelProps } from '@/utils/types/PanelProps';
const Accordion = lazy( () => import( '@/components/panels/Accordion' ) );
const Archive = lazy( () => import( '@/components/panels/Archive' ) );
const Blocks = lazy( () => import( '@/components/panels/Blocks' ) );
const Callout = lazy( () => import( '@/components/panels/Callout' ) );
const ContentSlider = lazy( () => import( '@/components/panels/ContentSlider' ) );
const CTA = lazy( () => import( '@/components/panels/CTA' ) );
const Custom = lazy( () => import( '@/components/panels/Custom' ) );
const DecisionTree = lazy( () => import( '@/components/panels/DecisionTree' ) );
const Download = lazy( () => import( '@/components/panels/Download' ) );
const FeaturedMedia = lazy( () => import( '@/components/panels/FeaturedMedia' ) );
const FeaturedPost = lazy( () => import( '@/components/panels/FeaturedPost' ) );
const Form = lazy( () => import( '@/components/panels/Form' ) );
const Gallery = lazy( () => import( '@/components/panels/Gallery' ) );
const Iframe = lazy( () => import( '@/components/panels/Iframe' ) );
const LinearContent = lazy( () => import( '@/components/panels/LinearContent' ) );
const LogoGallery = lazy( () => import( '@/components/panels/LogoGallery' ) );
const MediaTabs = lazy( () => import( '@/components/panels/MediaTabs' ) );
const Posts = lazy( () => import( '@/components/panels/Posts' ) );
const Search = lazy( () => import( '@/components/panels/Search' ) );
const SectionIntro = lazy( () => import( '@/components/panels/SectionIntro' ) );
const StaffBios = lazy( () => import( '@/components/panels/StaffBios' ) );
const Stats = lazy( () => import( '@/components/panels/Stats' ) );
const Tabs = lazy( () => import( '@/components/panels/Tabs' ) );
const TestimonialCarousel = lazy( () => import( '@/components/panels/TestimonialCarousel' ) );
const Text = lazy( () => import( '@/components/panels/Text' ) );
const TextMedia = lazy( () => import( '@/components/panels/TextMedia' ) );
const Timeline = lazy( () => import( '@/components/panels/Timeline' ) );
const Videos = lazy( () => import( '@/components/panels/Videos' ) );

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
const PanelLoader: React.FC<PanelProps> = ( props ) => {
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