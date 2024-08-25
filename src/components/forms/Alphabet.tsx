import React from 'react';
import { doLength } from 'src/utils/helpers';
import FieldError from 'src/components/forms/FieldError';
import FormFieldProps from 'src/utils/types/FormFieldProps';

const Alphabet: React.FC<FormFieldProps> = ( { field, callback, error = false } ) => {
    const currentValue = doLength( field.current_value ) ? field.current_value : [];
    const updateFieldValue = ( e: Event ) => {
        const currentTarget: HTMLFormElement = e.currentTarget as HTMLFormElement;
        const fieldValueElement: HTMLFormElement | null = document.getElementById( field.name ) as HTMLFormElement;
        if ( fieldValueElement ) {
            fieldValueElement.value = currentTarget.value;
            callback( e );
        }
    }

    return (
        <>
        <input type="hidden" value={ Array.isArray( currentValue ) && doLength( currentValue ) ? field.name + '=' + currentValue.join( ',' ) : ( doLength( currentValue ) ? field.name + '=' + currentValue : '' ) } name={ field.name } id={ field.name } />
        <FieldError error={ error } label={ field.label } />
        <span className="select-list-toggle mobile-toggle" data-toggle={ field.name + '-alphabet-list' }>
            { doLength( currentValue ) ?
                field.options[ currentValue[0] ].label
            : <>Filter by { field.label }</> 
            }
        </span>
        <ul className="alphabet-list" id={ field.name + '-alphabet-list' }>
            { Object.keys( field.options ).map( ( key, index ) => {
                const optionDetails: Record<string, any> = field.options[ key ];
                const active: boolean = Array.isArray( currentValue ) ? currentValue.indexOf( optionDetails.name ) > -1 : currentValue === optionDetails.name;
                const optionCount: number = optionDetails.count ? optionDetails.count : 0;
                return (
                    <li key={ index } className={ optionDetails.name + ( active ? ' active' : '' ) + ( optionCount <= 0 ? ' disabled' : '' ) }>
                        { ! active && optionCount > 0 ? 
                            <button type="button" value={ optionDetails.query_string } data-value={ optionDetails.query_string } onClick={ ( e ) => updateFieldValue }>
                                <span className="field-label">
                                    { optionDetails.label } 
                                </span>
                            </button>
                        : <span className="field-label">
                            { optionDetails.label } 
                        </span> }
                    </li>
                );
            } ) }
        </ul>
        </>
    );
}
export default Alphabet;