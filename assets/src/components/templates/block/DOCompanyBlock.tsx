import React from 'react';
import { doLength, doParse } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import Heading from '@/components/shared/Heading';
import Image from '@/components/shared/Image';
import { PartialTemplateProps } from '@/utils/types/PartialTemplateProps';
import { Media } from '@/utils/types/Media';

const DOCompanyBlock: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const metaPrefix: string = post.post_type_details.meta_prefix;
    const title: string = post.fields[ metaPrefix + '_company_name' ];
    const description: string = post.fields[ metaPrefix + '_description' ];
    const clientLink: string = post.fields[ metaPrefix + '_url' ];
    const image: Media = post.fields[ metaPrefix + '_white_logo' ];

    return (
        <li key={ index }>
            <CTA url={ clientLink } text={ title } classes={ [ 'block-link' ] }>
                <span>
                    <Image image={ image } size="logo" />
                    <Heading tag="h3" title={ title } classes={ [ 'screen-reader-text' ] } />
                    { description ?
                        doParse( description )
                    : null }
                </span>
            </CTA>
        </li>
    );

}
export default DOCompanyBlock;