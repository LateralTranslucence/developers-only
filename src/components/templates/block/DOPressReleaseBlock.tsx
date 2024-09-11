import React from 'react';
import { doLength, doStripTags } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';
import Heading from 'src/components/shared/Heading';
import Image from 'src/components/shared/Image';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';

const DOPressReleaseBlock: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    const title: string = doLength( post.fields.press_long_title ) ? doStripTags( post.fields.press_long_title ) : post.fields.press_title;
    return (
        <li className="has-block-link">
            <CTA classes={ [ 'block-link' ] } url={ post.permalink } title={ title }>
                <Image image={ post.post_thumbnail } size="cinema_600" classes={ [ 'block-thumbnail' ] } />
                <div className="block-content-wrapper">
                    <Heading tag="h3" pretitle={ post.post_type_details.post_type_display_name } title={ title } />
                </div>
            </CTA>
        </li>
    )
}
export default DOPressReleaseBlock;