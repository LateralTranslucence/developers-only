const { useEffect, useState } = wp.element;
import { doFormSubmit, getDOForm } from 'src/utils/api.js';
import { doLength, doParse, doTrimChar } from 'src/utils/helpers.js';
import FormFieldLoader from 'src/loaders/FormFieldLoader.js';
import 'assets/styles/components/forms.scss';

export default function RenderDOForm( props ) {
    const [ form, setForm ] = useState( [] );
    useEffect( () => {
        async function fetchData() {
            await getDOForm( props.formID ).then( ( data ) => {
                setForm( data.json );
            } );
        }
        fetchData();
    }, [] );

    // Handle form submit
    async function formSubmit ( e ) {
        e.preventDefault();
        // Get the currentTarget
        const form = e.currentTarget.tagName === 'FORM' ? e.currentTarget : e.currentTarget.form;
        // Create form data
        const formData = new FormData( form );
        // Update the query based on current form data
        let formValues = {};
        for ( const field of formData.entries() ) {
            const [ key, value ] = field;
            // If the key already exists, tack on
            if ( formValues[ key ] ) {
                formValues[ key ] = formValues[ key ] + ',' + value;
            } 
            // otherwise add it
            else {
                formValues[ key ] = value;
            }
        };
        // Convert formValues into a string
        let formValuesString = '';
        Object.keys( formValues ).forEach( ( key, index ) => {
            formValuesString += key + '=' + formValues[ key ] + '&';
        } );
        formValuesString = doTrimChar( formValuesString, '&' );
        // Loading indicator
        const panel = document.getElementById( props.panelID );
        if ( panel ) {
            panel.classList.add( 'loading' );
        }
        doFormSubmit( formValuesString ).then( ( data ) => {
            // Set searchResults
            setForm( data.json );
            // Remove the loading indicator
            if ( panel ) {
                panel.classList.remove( 'loading' );
            }
        } );
    }

    if ( doLength( form ) ) {
        const formSubmitted = form.submitted;
        const autoupdate = form.autoupdate && formSubmitted;
        const error = form.error;

        function FormWrapper( props ) {
            if ( props.field.field_type !== 'hidden' ) {
                return(
                    <div className={ 'do-form-field-wrapper' + ' ' + props.field.field_type }>
                        <FormFieldLoader { ...props } />
                    </div>
                )
            } else {
                return <FormFieldLoader { ...props } /> 
            }
        }

        // If the form has been submitted, process it and
        if ( formSubmitted && ! error ) {
            // either redirect
            if ( doLength( form.thank_you_redirect ) ) {
                window.location = homeURL + '/' + form.thank_you_redirect + '/';
            }
            // or show the thank-you message
            else if ( doLength( form.thank_you_message ) ) {
                return doParse( form.thank_you_message );
            }
        }
        // Otherwise show the form
        else {
            const formItems = form.items;
            return(
                <form id={ form.id } className={ 'do-form' + ( autoupdate ? ' autoupdate' : '' ) } onSubmit={ formSubmit }>
                { Object.keys( formItems ).map( ( formItemKey, index ) => {
                    const formItem = formItems[ formItemKey ];
                    // If this item is a fieldset
                    if ( formItem.item_type === 'fieldset' ) {
                        const fieldsetTitle = formItem.label;
                        return(
                            <fieldset key={ index }>
                                <legend>{ fieldsetTitle }</legend>
                                { Object.keys( formItem.fields ).map( ( fieldKey, index ) => {
                                    const fieldDetails = formItem.fields[ fieldKey ];
                                    return <FormWrapper key={ index } type={ fieldDetails.field_type } field={ fieldDetails } error={ form.missing_fields.indexOf( fieldKey ) > -1 } />
                                } ) }
                            </fieldset>
                        )
                    }
                    // If this item is a field
                    else if ( formItem.item_type === 'field' ) {
                        return <FormWrapper key={ index } type={ formItem.field_type } field={ formItem } error={ form.missing_fields.indexOf( formItemKey ) > -1 } />
                    }
                } ) }
                </form>
            )
        }
    } else {
        return null;
    }
}