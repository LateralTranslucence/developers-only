import React from 'react';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import '@/styles/components/blocks.scss';
import '@/styles/components/list.scss';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';
import { CTASettings } from '@/utils/types/CTASettings';

const DefaultList: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const ctaSettings: CTASettings = {
        url: post.permalink,
        text: post.post_title,
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