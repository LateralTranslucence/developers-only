import React from 'react';
const { useEffect, useState } = wp.element;
import { doGetPosts } from 'src/utils/api';
import { APIResult } from 'src/utils/types/APIResult';
import { Post } from 'src/utils/types/Post';

const Solutions: React.FC<{ solutions: Array<string> }> = ( { solutions } ): JSX.Element => {
    const [ allSolutions, setAllSolutions ] = useState<Array<Post>>( [] );

    useEffect( () => {
        async function fetchData() {
            await doGetPosts( 'solutions' ).then( ( data: APIResult ) => {
                setAllSolutions( data.json as Array<Post> );
            } )
        }
        fetchData();
    }, [] );

    return (
        <>
        { allSolutions.map( ( solution: Post, index: number ) => { 
            if ( solutions.includes( solution.post_name ) ) {
                return (
                    <span className="solution" key={ index }>{ solution.post_title }</span>
                );
                } else {
                    return null;
                }
        } ) }
        </>
    );
}
export default Solutions;