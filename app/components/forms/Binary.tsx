import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { fieldAriaProps } from '@/components/forms/fieldAria';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Binary: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: number = field.current_value ? field.current_value as number : 0;
    const optionAttrs: React.InputHTMLAttributes<HTMLInputElement> = {
        type: 'checkbox',
        name: field.name,
        id: field.name,
        value: 1,
        className: 'form-field__checkbox',
        defaultChecked: Boolean( currentValue ),
        ...fieldAriaProps( field, error ),
    };
    return (
        <ul className="field-list">
            <li className="form-field__multi-field">
                <label htmlFor={ field.name } className="form-field__checkbox-label">
                    <input { ...optionAttrs } /> 
                    <span>{ field.label }</span>
                </label>
                <FieldError error={ error } label={ field.label } name={ field.name } />
            </li>
        </ul>
    );
};
export default Binary;
