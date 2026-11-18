import React from 'react';
import FieldError from '@/components/forms/FieldError';
import RequiredMarker from '@/components/forms/RequiredMarker';
import { getFieldOptionsArray, getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const Checkbox: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const required: boolean = field.required;
    // No control has the id field.name, so the label below names nothing on
    // its own. It names the options as a group instead, which is how a screen
    // reader hears which options belong together - and, through the spoken
    // marker, that one of them is required (aria-required isn't allowed on a
    // group).
    const labelId: string = field.name + '-label';
    return (
        <>
            <label htmlFor={ field.name } id={ labelId }>
                { field.label }
                { required ? <RequiredMarker spoken /> : null }
            </label>
            <FieldError error={ error } label={ field.label } />
            <div role="group" aria-labelledby={ labelId }>
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
            </div>
        </>
    );
};
export default Checkbox;
