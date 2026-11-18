import React from 'react';
import FieldError from '@/components/forms/FieldError';
import RequiredMarker from '@/components/forms/RequiredMarker';
import { fieldAriaProps, fieldLabelClass } from '@/components/forms/fieldAria';
import { getFieldOptionsArray, getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

// A group of checkboxes, named by a fieldset legend: there is no single input
// for a <label htmlFor> to point at, so a label left the group unnamed. ARIA
// doesn't allow aria-required on a fieldset (a group), so the legend's marker
// says "required" to assistive technology instead.
const Checkbox: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const required: boolean = field.required;
    return (
        <fieldset className="form-field__group">
            <legend className={ fieldLabelClass( field ) }>
                { field.label }
                { required ? <RequiredMarker spoken /> : null }
            </legend>
            <FieldError error={ error } label={ field.label } name={ field.name } />
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
                    // Not aria-required: the group needs one box checked,
                    // not each of them
                    ...fieldAriaProps( field, error, false ),
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
        </fieldset>
    );
};
export default Checkbox;
