const { useEffect, useState } = wp.element;
import { getPosts } from 'src/utils/api.js';

export default function Solutions( props ) {
    const solutions = props.solutions;
    const [ allSolutions, setAllSolutions ] = useState( [] );

    useEffect( () => {
        async function fetchData() {
            await getPosts( 'solutions' ).then( ( data ) => {
                setAllSolutions( data.json );
            } )
        }
        fetchData();
    }, [] );

    return (
        <>
        { allSolutions.map( ( solution, index ) => { 
            if ( solutions.indexOf( solution.post_name ) > -1 ) {
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