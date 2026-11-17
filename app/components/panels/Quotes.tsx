import React, { JSX } from 'react';
import { getArrayField, parse } from '@/utils/helpers';
import { PanelProps } from '@/utils/types/PanelProps';
import { Quote } from '@/utils/types/Quote';
import '@/styles/components/blocks.scss';
import '@/styles/components/quotes.scss';

const QuoteList: React.FC<{ items: Array<Quote> }> = ( { items } ): JSX.Element => {
    return (
        <ul className="panel-testimonial-carousel blocks blocks--card">
            { items.map( ( item: Quote, index: number ) => {
                return (
                    <li key={ index }>
                        <div className="quote">
                            { parse( item.quote ) }
                        </div>
                        <p className="attribution">{ item.attribution }</p>
                    </li>
                );
            } ) }
        </ul>
    );
};

const Quotes: React.FC<PanelProps> = ( {
    post,
    panelPrefix = '',
    panelSuffix = ''
} ): JSX.Element => {
    const testimonialCarouselItems = getArrayField<Quote>( post.fields, panelPrefix + '_testimonial_carousel' + panelSuffix );

    return testimonialCarouselItems.length > 1 ?
        <div className="panelSliderWrapper">
            <QuoteList items={ testimonialCarouselItems } />
        </div>
    : <QuoteList items={ testimonialCarouselItems } />;
};
export default Quotes;
