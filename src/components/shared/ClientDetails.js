const { useEffect, useState } = wp.element;
import { doAddCommas, doLength, doParse, doStripTags } from 'src/utils/helpers.js'; 
import { getPost } from 'src/utils/api.js';
import CTA from 'src/components/shared/CTA.js';
import Heading from 'src/components/shared/Heading.js';
import Image from 'src/components/shared/Image.js';
import Solutions from 'src/components/shared/Solutions.js';
import 'assets/styles/components/client-details.scss';

export default function ClientDetails( props ) {
    const client = props.client;
    const [ clientDetails, setClientDetails ] = useState( [] );
    useEffect( () => {
        async function fetchData() {
            await getPost( 'company', client ).then( ( data ) => {
                setClientDetails( data.json[0] );
            } )
        }
        fetchData();
    }, []  );

    if ( doLength( clientDetails ) ) {
        const postID = clientDetails.postID;
        const name = clientDetails.fields.company_name;
        const url = clientDetails.fields.company_url;
        const logo = clientDetails.fields.company_logo;
        const size = clientDetails.fields.company_size;
        const aboutClient = clientDetails.fields.company_about;
        const solutions = clientDetails.fields.company_solutions;
        const solutionsList = doParse( <Solutions solutions={ solutions } /> );

        return (
            <div className="client-details">
            { name ? 
                <Heading tag={ 'h2' } title={ name } id={ postID }/>
            : null }
            { logo ?
                <CTA url={ url } classes={ false }>
                    <Image image={ logo } size={ 'cinema_400' } classes="block-thumbnail" />
                </CTA>
            : null }
            { size ?
                <p>
                    <span className="company-stat">Company Size</span><br />
                    { doAddCommas( size ) }
                </p>
            : null }
            { aboutClient ?
                <p>
                    <span className="company-stat">About</span><br />
                    { doStripTags( aboutClient ) }
                </p>
            : null }
            { doLength( solutionsList ) ? 
                <p>
                    <span className="company-stat">Solution</span><br />
                    { solutionsList }
                </p>
            : null }
            </div>
        );
    } else {
        return null;
    }
}