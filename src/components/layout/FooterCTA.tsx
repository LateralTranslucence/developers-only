import React from 'react';
const { useEffect, useState } = wp.element;
import { APIResult } from 'src/utils/types/APIResult';
import { doGetFooterCTA } from 'src/utils/api';
import { doLength } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';

const FooterCTA: React.FC = () => {
    // Get the posts
    const [ cta, setCTA ] = useState<Record<string, any>>( {} );   
    useEffect( () => {
        async function fetchData() {
            await doGetFooterCTA().then( ( data: APIResult ) => {
                setCTA( data.json );
            } );
        }
        fetchData();
    }, [] );
    if ( doLength( cta ) ) {
        if ( doLength( cta.text ) ) {
            return (
                <CTA url={ cta.url } modal={ cta.modal } id="footer-cta" classes={ [ 'solid-button' ] }>{ cta.text }</CTA>
            )
        } else {
            return null;
        }
    } else {
        return null;
    }
}
export default FooterCTA;