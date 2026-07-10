import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Textarea: React.FC<FormFieldProps> = ( { field, error = false } ) => {
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
            <textarea name={ field.name } id={ field.name } className={ field.name } defaultValue={ currentValue } />
        </>
    );
};
export default Textarea;
