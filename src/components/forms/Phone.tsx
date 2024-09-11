import React from 'react';
import { doLength } from 'src/utils/helpers';
import FieldError from 'src/components/forms/FieldError';
import { FormFieldProps } from 'src/utils/types/FormFieldProps';

const Phone: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = doLength( field.current_value ) ? field.current_value : '';
    const required = field.required;
    return (
        <>
            <label htmlFor={ field.name }>
                { field.label }
                { required ?
                    <span className="field-required">*</span>
                : null }
            </label>
            <FieldError error={ error } label={ field.label } />
            <input type="tel" name={ field.name } id={ field.name } className={ field.name } autoComplete="off" defaultValue={ currentValue } />
        </>
    );
}
export default Phone;