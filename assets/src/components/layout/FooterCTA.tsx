import React from 'react';
import { useEffect, useState } from 'react';
import { APIResult } from '@/utils/types/APIResult';
import { doGetFooterCTA } from '@/utils/api';
import { doLength } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';

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