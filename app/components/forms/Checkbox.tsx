import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { getFieldOptionsArray, getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Checkbox: React.FC<FormFieldProps> = ( { field, error = false } ) => {
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
            <ul className="field-list">
            { getFieldOptionsArray( field.options ).map( ( option, index: number ) => {
                const optionValue = option.value ?? option.name ?? '';
                const id: string = field.name + '_' + optionValue.replace( ' ', '-' ).toLowerCase();
                const optionAttrs: React.InputHTMLAttributes<HTMLInputElement> = {
                    type: 'checkbox',
                    name: field.name,
                    id: id,
                    value: optionValue,
                    className: 'form-field__checkbox',
                    defaultChecked: undefined,
                };
                if ( currentValue === optionValue ) {
                    optionAttrs.defaultChecked = true;
                }
                return (
                    <li key={ index } className="form-field__multi-field">
                        <label htmlFor={ id } className="form-field__checkbox-label">
                            <input { ...optionAttrs } /> 
                            <span>{ option.label }</span>
                        </label>
                    </li>
                );
            } ) }
            </ul>
        </>
    );
};
export default Checkbox;
