import React from 'react';
import { doParse } from 'src/utils/helpers';

interface PostDetailsProps {
    author?: string;
    podcastSeries?: string;
    description?: string;
}

// Post Details Display Component
const PostDetails: React.FC<PostDetailsProps> = ( {
    author,
    podcastSeries,
    description,
} ): JSX.Element => {
    console.log('here');
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
export default PostDetails;