const { useEffect, useContext } = wp.element;
import { PageSlugContext } from 'src/loaders/TemplateLoader.js';
import { doLength } from 'src/utils/helpers.js';
import 'assets/styles/components/forms.scss';

export default function RenderHubspotForm( props ) {
    const hubspotFormOptions = doLength( props.options ) ? ( typeof props.options === 'string' ? JSON.parse( props.options ) : props.options ) : {} ;
    const slug = useContext( PageSlugContext );
    useEffect( () => {
        const script = document.createElement( 'script' );
        script.src = 'https://js.hsforms.net/forms/embed/v2.js';
        document.head.appendChild( script );

        script.addEventListener( 'load', () => {
            if ( window.hbspt ) {
                window.hbspt.forms.create( { ...hubspotFormOptions, ...{ target: '#' + props.formID } } )
            }
        } );
    }, [ slug ] );

    return (
        <div id={ props.formID }></div>
    );
}
