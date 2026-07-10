import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Binary: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: number = field.current_value ? field.current_value as number : 0;
    const optionAttrs: Record<string, any> = {
        type: 'checkbox',
        name: field.name,
        id: field.name,
        value: 1,
        className: 'form-field__checkbox',
        defaultChecked: currentValue,
    };
    return (
        <ul className="field-list">
            <li className="form-field__multi-field">
                <label htmlFor={ field.name } className="form-field__checkbox-label">
                    <input { ...optionAttrs } /> 
                    <span>{ field.label }</span>
                </label>
                <FieldError error={ error } label={ field.label } />
            </li>
        </ul>
    );
};
export default Binary;
