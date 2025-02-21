import React from 'react';
import { doLength } from '@/utils/helpers';
import FieldError from '@/components/forms/FieldError';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Textarea: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = doLength( field.current_value ) ? field.current_value : '';
    const required: boolean = field.required;
    return (
        <>
            <label htmlFor={ field.name }>
                { field.label }
                { required ?
                    <span className="field-required">*</span>
                : null }
            </label>
            <FieldError error={ error } label={ field.label } />
            <textarea name={ field.name } id={ field.name } className={ field.name } defaultValue={ currentValue } />
        </>
    );
}
export default Textarea;