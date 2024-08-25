import React from 'react';
import { doLength, doParse } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Image from 'src/components/shared/Image';
import SliderNav from 'src/components/shared/SliderNav';
import 'assets/styles/components/content-slider.scss';
import PanelLoaderProps from 'src/utils/types/PanelLoaderProps';

const ContentSlider:React.FC<PanelLoaderProps> = ( { 
    data, 
    pageID = '', 
    panelID = '', 
    panelNumber, 
    panelPrefix = '', 
    panelSuffix = ''
} ): JSX.Element => {
    const contentSliderFieldKeys: Record<string, any> = {
        'content_slider': panelPrefix + '_content_slider' + panelSuffix,
    };
    const contentSliderItems: Array<Record<string, any>> = data.fields[ contentSliderFieldKeys.content_slider ] ? data.fields[ contentSliderFieldKeys.content_slider ] : [];

    return (
        <div className="panel-slider-wrapper" uk-slider="center: true">
            <ul className="panel-content-slider blocks uk-slider-items">
                { contentSliderItems.map( ( contentSliderItem, index ) => {
                    return (
                        <li key={ index }>
                            <CTA url={ contentSliderItem.url } classes={ contentSliderItem.cta_class }>
                            <div className="content-slider-inner-wrapper">
                                <div className={ 'content-slider-details' + ( contentSliderItem.stat ? ' stat' : '' ) }>
                                    <div className={ 'quote-content-wrapper' }>
                                        { doParse( contentSliderItem.quote ) }
                                        <div className="attribution">
                                            { doLength( contentSliderItem.logo ) ? 
                                            <Image image={ contentSliderItem.logo } size="logo"/>
                                            : null }
                                            <p className="author">{ contentSliderItem.author }</p>
                                            <p className="job-title">{ contentSliderItem.author_company_title }</p>
                                        </div>
                                    </div>
                                    { contentSliderItem.stat ?
                                        <div className={ 'stat-content-wrapper' + ( contentSliderItem.image ? ' has-image' : ''  ) }>
                                            <span className="stat">{ contentSliderItem.stat }</span>
                                            <p>{ contentSliderItem.stat_description }</p>
                                            <CTA { ...{
                                                url: contentSliderItem.cta_url,
                                                classes: [ 'text-button' ],
                                                text: contentSliderItem.cta_text,
                                            } }/>
                                        </div>
                                    : null }
                                </div>
                            </div>
                            </CTA>
                        </li>
                    );
                } ) }
            </ul>
            <SliderNav dotNav={ true } length={ doLength( contentSliderItems ) } />
        </div>
    );
}
export default ContentSlider;