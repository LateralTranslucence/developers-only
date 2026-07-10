import React, { JSX } from 'react';
import { parse } from '@/utils/helpers';

interface PostDetailsProps {
    author?: string;
    date?: string;
    podcastSeries?: string;
    description?: string;
}

// Post Details Display Component
const PostDetails: React.FC<PostDetailsProps> = ( {
    date,
    author,
    podcastSeries,
    description,
} ): JSX.Element => {
    return (
        <div id="post-details">
            { date ?
                <p className="post-details__date">{ date }</p>
            : null }
            { author ?
                <p className="post-details__author"><span>By </span>{ author }</p>
            : null }
            { podcastSeries ?
                <p className="post-details__podcast-series">{ podcastSeries }</p>
            : null }
            { description ?
                <div className="post-details__description">{ parse( description ) }</div>
            : null }
        </div>
    );
};
export default PostDetails;