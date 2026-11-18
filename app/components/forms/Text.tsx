import React from 'react';
import FieldError from '@/components/forms/FieldError';
import RequiredMarker from '@/components/forms/RequiredMarker';
import { fieldAriaProps, fieldLabelClass } from '@/components/forms/fieldAria';
import { getFieldStringSetting, getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Text: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const autocomplete: string = getFieldStringSetting( field, 'autocomplete' );
    const required: boolean = field.required;
    return (
        <>
            <label htmlFor={ field.name } className={ fieldLabelClass( field ) }>
                { field.label }
                { required ? <RequiredMarker /> : null }
            </label>
            <FieldError error={ error } label={ field.label } name={ field.name } />
            { /* The token picked in the form builder's Autocomplete setting
                 ("name", "organization", ...; WCAG 1.3.5). Without one there's
                 no attribute: a text field could hold anything, so the
                 browser's own heuristics do better than "off", which blocks
                 autofill outright */ }
            <input type="text" name={ field.name } id={ field.name } className={ field.name } autoComplete={ autocomplete || undefined } defaultValue={ currentValue } { ...fieldAriaProps( field, error ) } />
        </>
    );
};
export default Text;
