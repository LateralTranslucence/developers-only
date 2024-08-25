import React from 'react';
const { useEffect, useState } = wp.element;
import { getFooterCTA } from 'src/utils/api';
import { doLength } from 'src/utils/helpers';
import CTA from 'src/components/shared/CTA';

const FooterCTA: React.FC = () => {
    // Get the posts
    const [ cta, setCTA ] = useState<Record<string, any>>( {} );   
    useEffect( () => {
        async function fetchData() {
            await getFooterCTA().then( ( data: any ) => {
                setCTA( data.json );
            } );
        }
        fetchData();
    }, [] );
    if ( doLength( cta ) ) {
        const text: string = cta.text;
        const url: string = cta.url;
        const modal: boolean = cta.modal;
        if ( doLength( text ) ) {
            return (
                <CTA url={ url } modal={ modal } id="footer-cta" classes={ [ 'solid-button' ] }>{ text }</CTA>
            )
        } else {
            return null;
        }
    } else {
        return null;
    }
}
export default FooterCTA;