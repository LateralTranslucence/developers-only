import React from 'react';
import FieldError from '@/components/forms/FieldError';
import RequiredMarker from '@/components/forms/RequiredMarker';
import { getFieldOptionsArray, getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Select: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const required: boolean = field.required;
    return (
        <>
        <label htmlFor={ field.name }>
            { field.label }
            { required ? <RequiredMarker /> : null }
        </label>
        <FieldError error={ error } label={ field.label } />
        <select aria-required={ required || undefined } name={ field.name } id={ field.name } defaultValue={ currentValue } >
            <option value="">Select</option>
            { getFieldOptionsArray( field.options ).map( ( option, index: number ) => {
                return <option key={ index } value={ option.value ?? option.name ?? '' }>{ option.label }</option>;
            } ) }
        </select>
        </>
    );
};
export default Select;
