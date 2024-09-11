import React from 'react';
import { PartialTemplateProps } from 'src/utils/types/PartialTemplateProps';
import { doParse } from 'src/utils/helpers';

const DOTimelineList: React.FC<PartialTemplateProps> = ( {
    index,
    panelSlider,
    perRow,
    post,
    type,
} ): JSX.Element => {
    return (
        <li>
            <b>{ post.fields.timeline_year }</b><br />
            { doParse( post.fields.timeline_event ) }
        </li>
    )
}
export default DOTimelineList;