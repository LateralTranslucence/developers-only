import React, { JSX } from 'react';
import { useEffect, useState } from 'react';
import { submitForm, getForm } from '@/utils/api';
import { parse } from '@/utils/helpers';
import FormFieldLoader from '@/loaders/FormFieldLoader';
import { Form, FormField } from '@/utils/types/Form';
import { APIResult } from '@/utils/types/APIResult';
import '@/styles/components/forms.scss';

const RenderForm: React.FC<{ formID: number; panelID: string; hiddenValues?: Record<string, any> }> = ( { formID, panelID = '', hiddenValues = {} } ): JSX.Element | null => {
    const [ form, setForm ] = useState<Form>();
    useEffect( () => {
        async function fetchData() {
            await getForm( formID ).then( ( data: APIResult ) => {
                setForm( data.json as Form );
            } );
        }
        fetchData();
    }, [] );

    // Handle form submit
    const formSubmit: ( e: React.BaseSyntheticEvent ) => Promise<void> = async ( e ): Promise<void> => {
        e.preventDefault();
        // Get the currentTarget
        const target: HTMLFormElement = e.currentTarget as HTMLFormElement;
        const form: HTMLFormElement = target && target.tagName === 'FORM' ? e.currentTarget : ( target ? target.form : null );
        // Create form data
        const formData: FormData = new FormData( form );
        // Update the query based on current form data
        const formValues: Record<string, any> = {};
        for ( const field of formData.entries() ) {
            const [ key, value ]: [ string, any ] = field;
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
        const error: Record<string, any> = form.error;

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
