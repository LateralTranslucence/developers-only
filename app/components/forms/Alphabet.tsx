import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { getFieldListValue, getFieldOptionsMap } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Alphabet: React.FC<FormFieldProps> = ( { field, callback, error = false } ) => {
    const currentValue = getFieldListValue( field.current_value );
    const hasCurrentValue = Array.isArray( currentValue ) ? currentValue.length > 0 : currentValue.length > 0;
    const optionMap = getFieldOptionsMap( field.options );
    const selectedKey: string = Array.isArray( currentValue ) ? currentValue[0] ?? '' : currentValue;
    const selectedOption = selectedKey && optionMap[ selectedKey ] ? optionMap[ selectedKey ] : undefined;
    const options = Object.keys( optionMap ).map( ( key ) => optionMap[ key ] );
    const activeOptions = options.filter( ( optionDetails ) => ( optionDetails.count ? optionDetails.count : 0 ) > 0 );

    const updateFieldValue = ( value: string ) => {
        const fieldValueElement: HTMLInputElement | null = document.getElementById( field.name ) as HTMLInputElement | null;
        if ( ! fieldValueElement || ! value ) {
            return;
        }
        const selected = options.find( ( optionDetails ) => optionDetails.name === value );
        if ( ! selected ) {
            return;
        }
        fieldValueElement.value = selected.query_string ?? '';
        callback?.();
    };

    return (
        <>
        <input type="hidden" value={ Array.isArray( currentValue ) && currentValue.length > 0 ? field.name + '=' + currentValue.join( ',' ) : ( hasCurrentValue ? field.name + '=' + currentValue : '' ) } name={ field.name } id={ field.name } />
        <FieldError error={ error } label={ field.label } name={ field.name } />
        <select className="select-list-toggle mobile-toggle" value={ selectedOption?.name ?? '' } onChange={ ( event ) => updateFieldValue( event.target.value ) }>
            <option value="">Filter by { field.label }</option>
            { activeOptions.map( ( optionDetails, index: number ) => (
                <option key={ index } value={ optionDetails.name }>{ optionDetails.label }</option>
            ) ) }
        </select>
        <ul className="alphabet" id={ field.name + '-alphabet-list' }>
            { Object.keys( optionMap ).map( ( key, index ) => {
                const optionDetails = optionMap[ key ];
                const active: boolean = !! optionDetails.name && ( Array.isArray( currentValue ) ? currentValue.includes( optionDetails.name ) : currentValue === optionDetails.name );
                const optionCount: number = optionDetails.count ? optionDetails.count : 0;
                return (
                    <li key={ index } className={ 'alphabet__item' + ( active ? ' alphabet__item--active' : '' ) + ( optionCount <= 0 ? ' alphabet__item--disabled' : '' ) }>
                        { ! active && optionCount > 0 ?
                            <button type="button" value={ optionDetails.query_string } data-value={ optionDetails.query_string } onClick={ () => updateFieldValue( optionDetails.name ?? '' ) }>
                                <span className="alphabet__label">
                                    { optionDetails.label }
                                </span>
                            </button>
                        : <span className="alphabet__label">
                            { optionDetails.label }
                        </span> }
                    </li>
                );
            } ) }
        </ul>
        </>
    );
};
export default Alphabet;
