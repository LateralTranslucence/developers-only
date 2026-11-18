import React, { useState } from 'react';
import FieldError from '@/components/forms/FieldError';
import RequiredMarker from '@/components/forms/RequiredMarker';
import { fieldAriaProps, fieldLabelClass } from '@/components/forms/fieldAria';
import { getFieldStringValue, getToggleState } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

/* Toggle: a native checkbox with the switch role. It starts off, sends the
 * field's "off" value (its first option) while off and its "on" value (its
 * second) when on; see DO_Form_Builder::toggle_settings().
 *
 * Off is sent from a hidden input that is only there while the switch is off.
 * RenderForm joins repeated names with commas, so a hidden input left in
 * place beside the checked box would send "off,on". When the off value is
 * empty nothing is sent, so a required toggle has to be switched on. When
 * it isn't, the toggle always sends a value and "required" is always met, so
 * like Range it shows no asterisk and has no aria-required.
 *
 * The option labels show either side of the switch. They're hidden from
 * assistive tech there, which reads the switch as on or off, and given to it
 * as the switch's description instead: both states when both have a label,
 * else only the one that does. A single-option consent switch is described
 * by its option, "I agree", not "Off: off. On: I agree.". */
const Toggle: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const off = getToggleState( field, 'off' );
    const on = getToggleState( field, 'on' );
    const [ checked, setChecked ] = useState<boolean>( getFieldStringValue( field.current_value ) === on.value );
    const required: boolean = field.required && off.value === '';
    const aria = fieldAriaProps( field, error, required );
    const statesId: string = `${ field.name }-states`;
    const statesDescription: string = off.label && on.label ? `Off: ${ off.label }. On: ${ on.label }.` : off.label ? `Off: ${ off.label }.` : on.label;
    const hasStateLabels: boolean = statesDescription !== '';
    const describedBy: string | undefined = [ hasStateLabels ? statesId : '', aria[ 'aria-describedby' ] ?? '' ].filter( Boolean ).join( ' ' ) || undefined;
    return (
        <>
            <label htmlFor={ field.name } className={ fieldLabelClass( field ) }>
                { field.label }
                { required ? <RequiredMarker /> : null }
            </label>
            <FieldError error={ error } label={ field.label } name={ field.name } />
            { ! checked && off.value !== '' ?
                <input type="hidden" name={ field.name } value={ off.value } />
            : null }
            <span className="form-field__toggle-control">
                { off.label ?
                    <span className="form-field__toggle-state form-field__toggle-state--off" aria-hidden="true">{ off.label }</span>
                : null }
                <input
                    type="checkbox"
                    role="switch"
                    name={ field.name }
                    id={ field.name }
                    value={ on.value }
                    className="form-field__toggle"
                    checked={ checked }
                    onChange={ ( event ) => setChecked( event.currentTarget.checked ) }
                    { ...aria }
                    aria-describedby={ describedBy }
                />
                { on.label ?
                    <span className="form-field__toggle-state form-field__toggle-state--on" aria-hidden="true">{ on.label }</span>
                : null }
            </span>
            { hasStateLabels ?
                <span className="screenReader" id={ statesId }>{ statesDescription }</span>
            : null }
        </>
    );
};
export default Toggle;
