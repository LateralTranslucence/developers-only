import React from 'react';
import { doLength, doParse } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';
import { Media } from 'src/utils/types/Media';

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
            <CTA url={ clientLink } title={ title } classes={ [ 'block-link' ] }>
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