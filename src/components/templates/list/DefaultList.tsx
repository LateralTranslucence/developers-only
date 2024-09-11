import React from 'react';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import 'assets/styles/components/blocks.scss';
import 'assets/styles/components/list.scss';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';
import { CTASettings } from 'src/utils/types/CTASettings';

const DefaultList: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const ctaSettings: CTASettings = {
        url: post.permalink,
        title: post.post_title,
        classes: [ 'block-link' ],
    }

    return (
        <li key={ index } data-index={ index }>
            <CTA { ...ctaSettings }>
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name } title={ post.post_title } />
                </div>
            </CTA>
        </li>
    )
}
export default DefaultList;