import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { FieldOption, getFieldListValue, getFieldOptionsMap } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const SelectList: React.FC<FormFieldProps> = ( { field, error = false, callback } ) => {
    const currentValue: string | Array<string> = getFieldListValue( field.current_value );
    const hasCurrentValue = Array.isArray( currentValue ) ? currentValue.length > 0 : currentValue.length > 0;
    const optionMap = getFieldOptionsMap( field.options );
    const selectedKey: string = Array.isArray( currentValue ) ? currentValue[0] : currentValue;
    const selectedOption = selectedKey && optionMap[ selectedKey ] ? optionMap[ selectedKey ] : undefined;
    const options = Object.keys( optionMap ).map( ( key: string ) => optionMap[ key ] ).filter( ( optionDetails ) => optionDetails.count !== 0 );

    const updateFieldValue = ( value: string ) => {
        const fieldValueElement: HTMLInputElement | null = document.getElementById( field.name ) as HTMLInputElement | null;
        if ( ! fieldValueElement || ! value ) {
            return;
        }
        const selected = options.find( ( option ) => option.name === value );
        if ( ! selected ) {
            return;
        }
        fieldValueElement.value = selected?.query_string ?? '';
        callback?.();
    };

    const optionLabel = ( optionDetails: FieldOption ): string => {
        return optionDetails.count !== undefined ? `${ optionDetails.label } (${ optionDetails.count })` : optionDetails.label;
    };

    return (
        <>
        <input type="hidden" value={ Array.isArray( currentValue ) && currentValue.length > 0 ? field.name + '=' + currentValue.join( ',' ) : ( hasCurrentValue ? field.name + '=' + currentValue : '' ) } name={ field.name } id={ field.name } />
        <FieldError error={ error } label={ field.label } name={ field.name } />
        <select className="select-list-toggle" value={ selectedOption?.name ?? '' } onChange={ ( event ) => updateFieldValue( event.target.value ) }>
            <option value="">Filter by { field.label }</option>
            { options.map( ( optionDetails, index: number ) => (
                <option key={ index } value={ optionDetails.name }>{ optionLabel( optionDetails ) }</option>
            ) ) }
        </select>
        </>
    );
};
export default SelectList;
