import React from 'react';
import { doLength } from 'src/utils/helpers';
import FieldError from 'src/components/forms/FieldError';
import FormFieldProps from 'src/utils/types/FormFieldProps';

const SelectList: React.FC<FormFieldProps> = ( { field, error = false, callback } ) => {
    const currentValue: string | Array<string> = doLength( field.current_value ) ? field.current_value : [];
    const updateFieldValue = ( e: Event ) => {
        const fieldValueElement: HTMLFormElement = document.getElementById( field.name ) as HTMLFormElement;
        const currentTarget: HTMLFormElement = e.currentTarget as HTMLFormElement;
        fieldValueElement.value = currentTarget.value;
        callback( e );
    }
    const allActive: boolean = ! doLength( currentValue ) || currentValue.indexOf( 'all' ) > -1;

    return (
        <>
        <input type="hidden" value={ Array.isArray( currentValue ) && doLength( currentValue ) ? field.name + '=' + currentValue.join( ',' ) : ( doLength( currentValue ) ? field.name + '=' + currentValue : '' ) } name={ field.name } id={ field.name } />
        <FieldError error={ error } label={ field.label } />
        <span className="select-list-toggle" data-toggle={ field.name + '-select-list' }>
            { allActive ?
                <>Filter by { field.label }</>
            : null }
            { doLength( currentValue ) ?
                field.options[ currentValue[0] ].label
            : null }
        </span>
        <ul className="select-list" id={ field.name + '-select-list' }>
            { Object.keys( field.options ).map( ( key: string, index: number ) => {
                const optionDetails: Record<string, any> = field.options[ key ];
                const active: boolean = Array.isArray( currentValue ) ? currentValue.indexOf( optionDetails.name ) > -1 : currentValue === optionDetails.name;
                const optionCount: number | undefined = optionDetails.count ? optionDetails.count : undefined;
                if ( optionCount !== 0 ) {
                    return (
                        <li key={ index } className={ optionDetails.name + ( active ? ' active' : '' ) }>
                            { ! active ? 
                                <button type="button" value={ optionDetails.query_string } data-value={ optionDetails.query_string } onClick={ ( e ) => updateFieldValue }>
                                    <span className="field-label">
                                        { optionDetails.label } 
                                        { optionCount !== undefined ? 
                                            <span className="field-count">({ optionCount })</span>
                                        : null }
                                    </span>
                                </button>
                            : <span className="field-label">
                                { optionDetails.label } 
                                { optionCount !== undefined ? 
                                    <span className="field-count">({ optionCount })</span>
                                : null }
                            </span> }
                        </li>
                    );
                } else {
                    return null;
                }
            } ) }
        </ul>
        </>
    );
}
export default SelectList;