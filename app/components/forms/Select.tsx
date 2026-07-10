import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { getFieldOptionsArray, getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Select: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const required: boolean = field.required;
    return (
        <>
        <label htmlFor={ field.name }>
            { field.label }
            { required ?
                <span className="form-field__required">*</span>
            : null }
        </label>
        <FieldError error={ error } label={ field.label } />
        <select name={ field.name } id={ field.name } defaultValue={ currentValue } >
            <option value="">Select</option>
            { getFieldOptionsArray( field.options ).map( ( option, index: number ) => {
                return <option key={ index } value={ option.value ?? option.name ?? '' }>{ option.label }</option>;
            } ) }
        </select>
        </>
    );
};
export default Select;
