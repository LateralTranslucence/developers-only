import { doParse } from 'src/utils/helpers.js';

export default function DOTimelineList( props ) {
    const timelineYear = props.post.fields.timeline_year;
    const timelineEvent = props.post.fields.timeline_event;

    return (
        <li>
            <b>{ timelineYear }</b><br />
            { doParse( timelineEvent ) }
        </li>
    );
}
