import React from 'react';
import { Post } from '@/utils/types/Post';

// Renders JSON-LD inline (valid anywhere in the document; crawlers get the
// server-rendered copy from header.php on first load).
const StructuredData: React.FC<{ post: Post; }> = ( { post } ) => {
    if ( post && post.schema ) {
        return (
            <script type="application/ld+json">
                { JSON.stringify( post.schema ) }
            </script>
        );
    } else {
        return null;
    }
};
export default StructuredData;
