import React from 'react';
import FieldError from '@/components/forms/FieldError';
import RequiredMarker from '@/components/forms/RequiredMarker';
import { fieldAriaProps, fieldLabelClass } from '@/components/forms/fieldAria';
import { getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Textarea: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const required: boolean = field.required;
    return (
        <>
            <label htmlFor={ field.name } className={ fieldLabelClass( field ) }>
                { field.label }
                { required ? <RequiredMarker /> : null }
            </label>
            <FieldError error={ error } label={ field.label } name={ field.name } />
            <textarea name={ field.name } id={ field.name } className={ field.name } defaultValue={ currentValue } { ...fieldAriaProps( field, error ) } />
        </>
    );
};
export default Textarea;
