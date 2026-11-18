import React from 'react';
import FieldError from '@/components/forms/FieldError';
import RequiredMarker from '@/components/forms/RequiredMarker';
import { fieldAriaProps, fieldLabelClass } from '@/components/forms/fieldAria';
import { getFieldOptionsArray, getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

interface RadioGroupProps extends FormFieldProps {
    // 'button-select' renders each radio before its label, so the theme can
    // hide the radio and style the label as a button (see forms.scss)
    variant: 'radio' | 'button-select';
}

/* A single choice from a set of native radios sharing one name, named by a
 * fieldset legend (the same structure as Checkbox). Used by Radio and
 * ButtonSelect.
 *
 * The fieldset is a radiogroup so it can carry aria-required: the requirement
 * is "pick one", which belongs to the group, not to each radio. The radios
 * carry aria-invalid, so RenderForm's focus-the-first-invalid-field lands on
 * one. The first radio's id is the field's name, which is what the error
 * summary links to. */
const RadioGroup: React.FC<RadioGroupProps> = ( { field, error = false, variant } ) => {
    const currentValue: string = getFieldStringValue( field.current_value );
    const required: boolean = field.required;
    const buttonSelect: boolean = variant === 'button-select';
    return (
        <fieldset className={ 'form-field__group' + ( buttonSelect ? ' form-field__button-select' : '' ) } role="radiogroup" aria-required={ required ? true : undefined }>
            <legend className={ fieldLabelClass( field ) }>
                { field.label }
                { required ? <RequiredMarker /> : null }
            </legend>
            <FieldError error={ error } label={ field.label } name={ field.name } />
            <ul className="field-list">
            { getFieldOptionsArray( field.options ).map( ( option, index: number ) => {
                const optionValue: string = option.value ?? option.name ?? '';
                const id: string = index === 0 ? field.name : `${ field.name }_option-${ index }`;
                const description: string = buttonSelect ? option.description ?? '' : '';
                const descriptionId: string = `${ id }-description`;
                const aria = fieldAriaProps( field, error, false );
                // The option's own description, then the field's error
                const describedBy: string | undefined = [ description ? descriptionId : '', aria[ 'aria-describedby' ] ?? '' ].filter( Boolean ).join( ' ' ) || undefined;
                const input = (
                    <input
                        type="radio"
                        name={ field.name }
                        id={ id }
                        value={ optionValue }
                        className={ buttonSelect ? 'form-field__button-select-input' : 'form-field__radio' }
                        defaultChecked={ currentValue !== '' && currentValue === optionValue }
                        { ...aria }
                        aria-describedby={ describedBy }
                    />
                );
                if ( buttonSelect ) {
                    return (
                        <li key={ index } className="form-field__multi-field form-field__button-select-option">
                            { input }
                            <label htmlFor={ id } className="form-field__button-select-label">{ option.label }</label>
                            { description ?
                                <span className="form-field__button-select-description" id={ descriptionId }>{ description }</span>
                            : null }
                        </li>
                    );
                }
                return (
                    <li key={ index } className="form-field__multi-field">
                        <label htmlFor={ id } className="form-field__radio-label">
                            { input }
                            <span>{ option.label }</span>
                        </label>
                    </li>
                );
            } ) }
            </ul>
        </fieldset>
    );
};
export default RadioGroup;
