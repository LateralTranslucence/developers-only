import { Helmet } from 'react-helmet';
import { doLength } from 'src/utils/helpers.js';

export default function StructuredData( props ) {
    const post = props.post
    if ( doLength( post ) && post.schema ) {
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
}