
import React from 'react';
import { doLength, doParse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Image from '@/components/shared/Image';
import SliderNav from '@/components/shared/SliderNav';
import { PanelProps } from '@/utils/types/PanelProps';
import { MetaFieldKeyMap } from '@/utils/types/MetaFieldKeyMap';
import { Media } from '@/utils/types/Media';
import { CTASettings } from '@/utils/types/CTASettings';
import { Testimonial } from '@/utils/types/Testimonial';
import '@/styles/components/blocks.scss';
import '@/styles/components/testimonial-carousel.scss';

const TestimonialCarousel: React.FC<PanelProps> = ( { 
    post, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const testimonialCarouselFieldKeys: MetaFieldKeyMap = {
        testimonial_carousel: panelPrefix + '_testimonial_carousel' + panelSuffix,
    };
    const testimonialCarouselItems: Array<Testimonial> = post.fields[ testimonialCarouselFieldKeys.testimonial_carousel ] ? post.fields[ testimonialCarouselFieldKeys.testimonial_carousel ] : [];

    // Testimonial Carousel List
    const TestimonialCarouselList: React.FC = (): JSX.Element => {
        return (
            <ul className="panel-testimonial-carousel blocks uk-slider-items card">
                { testimonialCarouselItems.map( ( item: Testimonial, index: number ) => {
                    const testimonialCTASettings: CTASettings = {
                        url: item.cta_url,
                        classes: [ 'text-button' ],
                        text: item.cta_text,
                    }
                    return (
                        <li key={ index }>
                            <CTA url={ item.url } classes={ [ item.cta_class ] }>
                                <div className={ 'testimonial-carousel-details' + ( item.stat ? ' stat' : '' ) }>
                                    <div className="quote-content-wrapper">
                                        <div className="quote">
                                            { doParse( item.quote ) }
                                        </div>
                                        <div className="attribution">
                                            { doLength( item.logo ) ? 
                                                <Image image={ item.logo } size="logo" />
                                            : null }
                                            <p className="author">{ item.author }</p>
                                            <p className="job-title">{ item.author_company_title }</p>
                                        </div>
                                    </div>
                                    { item.stat ?
                                        <div className="stat-content-wrapper color-navy">
                                            <span className="stat">{ item.stat }</span>
                                            { doParse( item.stat_description ) }
                                            <CTA { ...testimonialCTASettings } />
                                        </div>
                                    : null }
                                </div>
                            </CTA>
                        </li>
                    )
                } ) }
            </ul>
        );
    }

    return (
        <>
        { doLength( testimonialCarouselItems ) > 1 ?
            <div className="panel-slider-wrapper" uk-slider="finite: true">
                <TestimonialCarouselList />
                <SliderNav dotNav={ true } length={ doLength( testimonialCarouselItems ) } />
            </div>
        : <TestimonialCarouselList /> }
        </>
    )
}
export default TestimonialCarousel;

