import React from 'react';
import FieldError from '@/components/forms/FieldError';
import { getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Button: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    return (
        <>
        <button name={ field.name } id={ field.name } value={ currentValue } className="solid-button color-white">
            <span>{ field.label }</span>
        </button>
        <FieldError error={ error } label={ field.label } />
        </>
    );
};
export default Button;
