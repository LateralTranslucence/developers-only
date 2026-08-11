import React, { JSX } from 'react';
import { useEffect, useState } from 'react';
import { submitForm, getForm } from '@/utils/api';
import { parse } from '@/utils/helpers';
import FormFieldLoader from '@/loaders/FormFieldLoader';
import { Form, FormField } from '@/utils/types/Form';
import { APIResult } from '@/utils/types/APIResult';
import '@/styles/components/forms.scss';

const RenderForm: React.FC<{ formID: number; panelID: string }> = ( { formID, panelID = '' } ): JSX.Element | null => {
    const [ form, setForm ] = useState<Form>();
    useEffect( () => {
        async function fetchData() {
            await getForm( formID ).then( ( data: APIResult ) => {
                setForm( data.json as Form );
            } );
        }
        fetchData();
    }, [formID] );

    // Handle form submit
    const formSubmit: ( e: React.BaseSyntheticEvent ) => Promise<void> = async ( e ): Promise<void> => {
        e.preventDefault();
        // Get the currentTarget
        const target: HTMLFormElement = e.currentTarget as HTMLFormElement;
        const form: HTMLFormElement = target && target.tagName === 'FORM' ? e.currentTarget : ( target ? target.form : null );
        // Create form data
        const formData: FormData = new FormData( form );
        // Update the query based on current form data
        const formValues: Record<string, string> = {};
        for ( const field of formData.entries() ) {
            const [ key, value ]: [ string, FormDataEntryValue ] = field;
            // If the key already exists, tack on
            if ( formValues[ key ] ) {
                formValues[ key ] = formValues[ key ] + ',' + String( value );
            }
            // otherwise add it
            else {
                formValues[ key ] = String( value );
            }
        };
        // Convert formValues into a string
        const formValuesString: string = new URLSearchParams( formValues ).toString();
        // Loading indicator
        const panel: HTMLElement | null = document.getElementById( panelID );
        if ( panel ) {
            panel.classList.add( 'loading' );
        }
        submitForm( formValuesString ).then( ( data: APIResult ) => {
            // Set searchResults
            setForm( data.json as Form );
            // Remove the loading indicator
            if ( panel ) {
                panel.classList.remove( 'loading' );
            }
        } );
    };

    if ( form ) {
        const formSubmitted: boolean = form.submitted;
        const autoupdate: boolean = form.autoupdate && formSubmitted;
        const error: Record<string, unknown> = form.error;
        const honeypotField: string = form.honeypot_field || 'devo-form-website';

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

        // If the form has been submitted, process it and
        if ( formSubmitted && ! error ) {
            // either redirect
            if ( form.thank_you_redirect ) {
                window.location.href = `${window.homeURL}/${form.thank_you_redirect}/`;
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
        else {
            return(
                <form id={ form.id } className={ 'form' + ( autoupdate ? ' autoupdate' : '' ) } method="post" onSubmit={ formSubmit }>
                { form.notice ? <p className="form__notice" role="alert">{ form.notice }</p> : null }
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
                { Object.entries( form.items ).map( ( [ formItemKey, formItem ]: [ string, FormField ], index ) => {
                    // If this item is a fieldset
                    if ( formItem.item_type === 'fieldset' ) {
                        return(
                            <fieldset key={ index }>
                                <legend>{ formItem.label }</legend>
                                { Object.entries( formItem.fields as Record<string, FormField> ).map( ( [ fieldKey, fieldDetails ]: [ string, FormField ], index ) => {
                                    return <FormWrapper key={ index } field={ fieldDetails } error={ form.missing_fields.indexOf( fieldKey ) > -1 } />;
                                } ) }
                            </fieldset>
                        );
                    }
                    // If this item is a field
                    else if ( formItem.item_type === 'field' ) {
                        return <FormWrapper key={ index } field={ formItem } error={ form.missing_fields.indexOf( formItemKey ) > -1 } />;
                    } else {
                        return null;
                    }
                } ) }
                </form>
            );
        }
    } else {
        return null;
    }
};
export default RenderForm;
