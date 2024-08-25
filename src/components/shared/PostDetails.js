import { doParse } from 'src/utils/helpers.js';

// Post Details Display Component
export default function PostDetails( props ) {
    const author = props.author;
    const podcastSeries = props.seriesName;
    const description = props.description;

    return (
        <div id="post-details">
            { author ? 
                <p className="author"><span>By </span>{ author }</p>
            : null }
            { podcastSeries ? 
                <p className="podcast-series">{ podcastSeries }</p>
            : null }
            { description ? 
                doParse( description )
            : null }
        </div>
    );
}