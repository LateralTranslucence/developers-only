import React from 'react';
import { useEffect, useState } from 'react';
import { APIResult } from '@/utils/types/APIResult';
import { doGetHeadline } from '@/utils/api';
import { doLength } from '@/utils/helpers';
import CTA from '@/components/shared/CTA';
import '@/styles/components/header-promo.scss';

const HeaderPromo: React.FC = () => {
    // Get the posts
    const [ promo, setPromo ] = useState<Record<string, any>>( [] );   
    useEffect( () => {
        async function fetchData() {
            await doGetHeadline().then( ( data: APIResult ) => {
                setPromo( data.json );
            } );
        }
        fetchData();
    }, [] );
    if ( doLength( promo ) ) {
        const active: boolean = promo.active;
        const headline: string = promo.headline;
        const url: string = promo.url;
        const modal: boolean = promo.modal;
        if ( active && doLength( headline ) ) {
            return (
                <CTA url={ url } modal={ modal } classes={ [ 'text-button' ] }>{ headline }</CTA>
            )
        } else {
            return null;
        }
    } else {
        return null;
    }
}
export default HeaderPromo;