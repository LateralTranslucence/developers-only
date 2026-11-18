import React, { JSX } from 'react';
import { useEffect, useRef, useState } from 'react';
import { submitForm, getForm, isAbortError } from '@/utils/api';
import { isSafeURL, parse } from '@/utils/helpers';
import FormFieldLoader from '@/loaders/FormFieldLoader';
import { Form, FormField, getFieldStringValue } from '@/utils/types/Form';
import '@/styles/components/forms.scss';

const FormWrapper: React.FC<{ field: FormField, error: boolean }> = ( { field, error } ): JSX.Element | null => {
    // The form builder's Hide Field. Not rendered; the server never makes
    // such a field required. A value it does have still goes with the form.
    if ( field.hidden ) {
        const value: string = getFieldStringValue( field.current_value );
        return value !== '' ? <input type="hidden" name={ field.name } defaultValue={ value } /> : null;
    }
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

// Every field's label by name, fieldsets included, for the error summary
const fieldLabels = ( items: Record<string, FormField> ): Record<string, string> => {
    const labels: Record<string, string> = {};
    Object.entries( items ).forEach( ( [ key, item ] ) => {
        if ( item.item_type === 'fieldset' ) {
            Object.assign( labels, fieldLabels( item.fields ?? {} ) );
        } else {
            labels[ key ] = item.label;
        }
    } );
    return labels;
};

// The control to focus for a field: the one whose id is the field's name
// (every field's input, and the first radio or switch of the others), else
// the first visible input with the field's name (a checkbox group's boxes
// have their own ids). Never a hidden input: a toggle's "off" value shares
// its name, and can't take focus.
const fieldInput = ( form: HTMLFormElement | null, name: string ): HTMLElement | null => {
    if ( ! form ) {
        return null;
    }
    const byId: HTMLElement | null = form.querySelector<HTMLElement>( `#${ CSS.escape( name ) }` );
    if ( byId && ! ( byId instanceof HTMLInputElement && byId.type === 'hidden' ) ) {
        return byId;
    }
    return form.querySelector<HTMLElement>( `[name="${ CSS.escape( name ) }"]:not([type="hidden"])` );
};

const RenderForm: React.FC<{ formID: number; panelID: string }> = ( { formID, panelID = '' } ): JSX.Element | null => {
    // Keyed by form ID, so a form loaded for a previous ID is never shown
    const [ loaded, setLoaded ] = useState<{ formID: number; form: Form } | null>( null );
    const [ submitError, setSubmitError ] = useState<boolean>( false );
    // The form ID whose load failed, so a later ID starts clean
    const [ loadFailedFor, setLoadFailedFor ] = useState<number | null>( null );
    const submittingRef = useRef<boolean>( false );
    const submitControllerRef = useRef<AbortController | null>( null );
    // Set when a submission's response arrives, so the render that shows it
    // can move focus: to the first invalid field, or to the thank-you message
    const focusResponseRef = useRef<boolean>( false );
    const formRef = useRef<HTMLFormElement | null>( null );
    const thankYouRef = useRef<HTMLSpanElement | null>( null );
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

    // After a submission, focus would otherwise stay on the submit button, or
    // drop to <body> when the thank-you message replaces the form
    useEffect( () => {
        if ( ! focusResponseRef.current || ! form ) {
            return;
        }
        focusResponseRef.current = false;
        if ( form.submitted && ! form.error ) {
            thankYouRef.current?.focus();
        } else {
            formRef.current?.querySelector<HTMLElement>( '[aria-invalid="true"]' )?.focus();
        }
    }, [ form ] );

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
            focusResponseRef.current = true;
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
        // or show the thank-you message. It replaces the form, submit button
        // and all, so it takes focus (see the effect above), and is a status
        // so it's announced. A plain message when the form has none, rather
        // than nothing: an empty gap would leave the visitor wondering.
        return (
            <span className="form__thank-you" role="status" tabIndex={ -1 } ref={ thankYouRef }>
                { form.thank_you_message ? parse( form.thank_you_message ) : 'Thank you. Your form has been sent.' }
            </span>
        );
    }

    // On a submission with required fields left empty, a summary naming
    // them. Focus moves to the first of them; each link here goes to its field.
    const labels: Record<string, string> = missingFields.length ? fieldLabels( form.items ?? {} ) : {};
    const errorSummary: JSX.Element | null = missingFields.length ? (
        <div className="form__error-summary" role="alert">
            <p className="form__notice">{ form.notice || 'Some required fields are empty. Please fill them in and send the form again.' }</p>
            <ul>
                { missingFields.map( ( name ) => (
                    <li key={ name }>
                        <a href={ '#' + name } onClick={ ( e ) => {
                            e.preventDefault();
                            fieldInput( formRef.current, name )?.focus();
                        } }>{ labels[ name ] || name }</a>
                    </li>
                ) ) }
            </ul>
        </div>
    ) : null;

    // Otherwise show the form
    return(
        <form id={ form.id } className={ 'form' + ( autoupdate ? ' autoupdate' : '' ) } method="post" onSubmit={ formSubmit } ref={ formRef }>
        { errorSummary ?? ( form.notice ? <p className="form__notice" role="alert">{ form.notice }</p> : null ) }
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
