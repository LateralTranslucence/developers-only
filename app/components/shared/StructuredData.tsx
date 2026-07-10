import React from 'react';
import { Helmet } from 'react-helmet';
import { Post } from '@/utils/types/Post';

const StructuredData: React.FC<{ post: Post; }> = ( { post } ) => {
    if ( post && post.schema ) {
        return (
            <Helmet>
                <script type="application/ld+json">
                    { JSON.stringify( post.schema ) }
                </script>
            </Helmet>
        );
    } else {
        return null;
    }
};
export default StructuredData;
