import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Email: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue:string = getFieldStringValue( field.current_value );
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
            <input type="email" name={ field.name } id={ field.name } className={ field.name } autoComplete="off" defaultValue={ currentValue } />
        </>
    );
};
export default Email;
