import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { fieldAriaProps } from '@/components/forms/fieldAria';
import { getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Text: React.FC<FormFieldProps> = ( { field, error = false } ) => {
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
            <FieldError error={ error } label={ field.label } name={ field.name } />
            { /* No autocomplete token: a text field could hold anything, so the
                 browser's own heuristics (name, company, ...) do better than
                 "off", which blocks autofill outright */ }
            <input type="text" name={ field.name } id={ field.name } className={ field.name } defaultValue={ currentValue } { ...fieldAriaProps( field, error ) } />
        </>
    );
};
export default Text;
