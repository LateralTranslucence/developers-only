import React from 'react';
import { doLength } from '@/utils/helpers';
import FieldError from '@/components/forms/FieldError';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Button: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = doLength( field.current_value ) ? field.current_value : '';
    return (
        <>
        <button name={ field.name } id={ field.name } value={ currentValue } className="solid-button large">
            <span>{ field.label }</span>
        </button>
        <FieldError error={ error } label={ field.label } />
        </>
    );
}
export default Button;