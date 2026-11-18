import React, { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { submitForm, getForm, isAbortError } from '@/utils/api';
import { isSafeURL, parse } from '@/utils/helpers';
import FormFieldLoader from '@/loaders/FormFieldLoader';
import { Form, FormField } from '@/utils/types/Form';
import '@/styles/components/forms.scss';

const FormWrapper: React.FC<{ field: FormField, error: boolean }> = ( { field, error } ): JSX.Element => {
    if ( field.field_type !== 'hidden' ) {
        return(
            <div className={ 'form-field form-field--' + field.field_type }>
                <FormFieldLoader field={ field } type={ field.field_type } error={ error } />
            </div>
        );
    } else {
        return <FormFieldLoader field={ field } type={ field.field_type } error={ error } />;
    }
};

// The thank-you redirect: an absolute URL as given, else a path under home
const redirectURL = ( redirect: string ): string => {
    if ( /^https?:\/\//i.test( redirect ) ) {
        return redirect;
    }
    return `${ window.homeURL }/${ redirect.replace( /^\/+|\/+$/g, '' ) }/`;
};

const RenderForm: React.FC<{ formID: number; panelID: string }> = ( { formID, panelID = '' } ): JSX.Element | null => {
    // Keyed by form ID, so a form loaded for a previous ID is never shown
    const [ loaded, setLoaded ] = useState<{ formID: number; form: Form } | null>( null );
    const [ submitError, setSubmitError ] = useState<boolean>( false );
    // The form ID whose load failed, so a later ID starts clean
    const [ loadFailedFor, setLoadFailedFor ] = useState<number | null>( null );
    const submittingRef = useRef<boolean>( false );
    const submitControllerRef = useRef<AbortController | null>( null );
    const form: Form | undefined = loaded?.formID === formID ? loaded.form : undefined;

    useEffect( () => {
        const controller = new AbortController();
        getForm( formID, { signal: controller.signal } )
            .then( ( data ) => setLoaded( { formID, form: data.json } ) )
            .catch( ( error: unknown ) => {
                if ( ! isAbortError( error ) ) {
                    setLoadFailedFor( formID );
                }
            } );
        return () => controller.abort();
    }, [ formID ] );

    // A submission in flight when the form goes away is abandoned
    useEffect( () => {
        return () => submitControllerRef.current?.abort();
    }, [] );

    const redirect: string = form && form.submitted && ! form.error ? form.thank_you_redirect : '';
    useEffect( () => {
        if ( redirect ) {
            const url: string = redirectURL( redirect );
            if ( isSafeURL( url ) ) {
                window.location.assign( url );
            }
        }
    }, [ redirect ] );

    // Handle form submit
    const formSubmit = async ( e: React.FormEvent<HTMLFormElement> ): Promise<void> => {
        e.preventDefault();
        // One submission at a time
        if ( submittingRef.current ) {
            return;
        }
        // Create form data
        const formData: FormData = new FormData( e.currentTarget );
        // Update the query based on current form data
        const formValues: Record<string, string> = {};
        for ( const [ key, value ] of formData.entries() ) {
            // If the key already exists, tack on
            formValues[ key ] = formValues[ key ] ? formValues[ key ] + ',' + String( value ) : String( value );
        }
        // Convert formValues into a string
        const formValuesString: string = new URLSearchParams( formValues ).toString();
        // Loading indicator
        const panel: HTMLElement | null = document.getElementById( panelID );
        const controller = new AbortController();
        submitControllerRef.current = controller;
        submittingRef.current = true;
        setSubmitError( false );
        panel?.classList.add( 'loading' );
        try {
            const data = await submitForm( formValuesString, { signal: controller.signal } );
            setLoaded( { formID, form: data.json } );
        } catch ( error ) {
            if ( ! isAbortError( error ) ) {
                setSubmitError( true );
            }
        } finally {
            submittingRef.current = false;
            panel?.classList.remove( 'loading' );
        }
    };

    if ( ! form ) {
        // Nothing while it loads; a message, not a silent gap, if it can't
        return loadFailedFor === formID ? <p className="form__notice" role="alert">Sorry, this form couldn't be loaded. Please reload the page to try again.</p> : null;
    }

    const formSubmitted: boolean = form.submitted;
    const autoupdate: boolean = form.autoupdate && formSubmitted;
    const honeypotField: string = form.honeypot_field || 'devo-form-website';
    const missingFields: Array<string> = Array.isArray( form.missing_fields ) ? form.missing_fields : [];

    // If the form has been submitted, process it and
    if ( formSubmitted && ! form.error ) {
        // either redirect (see the effect above)
        if ( form.thank_you_redirect ) {
            return null;
        }
        // or show the thank-you message
        else if ( form.thank_you_message ) {
            return <span>{ parse( form.thank_you_message ) }</span>;
        }
        else {
            return null;
        }
    }

    // Otherwise show the form
    return(
        <form id={ form.id } className={ 'form' + ( autoupdate ? ' autoupdate' : '' ) } method="post" onSubmit={ formSubmit }>
        { form.notice ? <p className="form__notice" role="alert">{ form.notice }</p> : null }
        { submitError ? <p className="form__notice" role="alert">Sorry, the form couldn't be sent. Please try again.</p> : null }
        { /* Honeypot. Named to look like a real field so bots fill it in;
             hidden from sight and from assistive tech, and skipped by the
             tab order, so nobody else ever sees it. The submit route
             discards any payload that arrives with this set. The name
             comes from the server so it stays in step with the
             devo_form_honeypot_field filter. */ }
        <div className="form__hp" aria-hidden="true">
            { /* Labelled with an instruction rather than a field name:
                 "Website"/"Company" and friends are exactly what browser
                 autofill matches on, and an autofilled honeypot would
                 silently bin a real submission. */ }
            <label htmlFor={ honeypotField }>Leave this field empty</label>
            <input type="text" id={ honeypotField } name={ honeypotField } tabIndex={ -1 } autoComplete="off" defaultValue="" />
        </div>
        { Object.entries( form.items ?? {} ).map( ( [ formItemKey, formItem ]: [ string, FormField ], index ) => {
            // If this item is a fieldset
            if ( formItem.item_type === 'fieldset' ) {
                return(
                    <fieldset key={ index }>
                        <legend>{ formItem.label }</legend>
                        { Object.entries( formItem.fields ?? {} ).map( ( [ fieldKey, fieldDetails ]: [ string, FormField ], index ) => {
                            return <FormWrapper key={ index } field={ fieldDetails } error={ missingFields.indexOf( fieldKey ) > -1 } />;
                        } ) }
                    </fieldset>
                );
            }
            // If this item is a field
            else if ( formItem.item_type === 'field' ) {
                return <FormWrapper key={ index } field={ formItem } error={ missingFields.indexOf( formItemKey ) > -1 } />;
            } else {
                return null;
            }
        } ) }
        </form>
    );
};
export default RenderForm;
