import React from 'react';
import { useEffect, useContext } from 'react';
import { PageSlugContext } from '@/loaders/TemplateLoader';
import { doLength } from '@/utils/helpers';
import '@/styles/components/forms.scss';

const RenderHubspotForm: React.FC<{ options: string | Record<string, any>; formID: string; }> = ( { options, formID } ) => {
    const hubspotFormOptions: Record<string, any> = doLength( options ) ? ( typeof options === 'string' ? JSON.parse( options ) : options ) : {} ;
    const slug: string = useContext( PageSlugContext );
    useEffect( () => {
        const script: HTMLScriptElement = document.createElement( 'script' );
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        document.head.appendChild( script );
        script.addEventListener( 'load', () => {
            if ( window.hbspt ) {
                window.hbspt.forms.create( { ...hubspotFormOptions, ...{ target: '#' + formID } } )
            }
        } );
    }, [ slug ] );

    return (
        <div id={ formID }></div>
    );
}
export default RenderHubspotForm;