import React, { useState } from 'react';
import FieldError from '@/components/forms/FieldError';
import { fieldAriaProps, fieldLabelClass } from '@/components/forms/fieldAria';
import { getFieldNumberSetting, getFieldStringValue } from '@/utils/types/Form';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

/* Range Slider: a native range input with the field's min, max and step (see
 * DO_Form_Builder::range_settings()), and its value shown beside it.
 *
 * It starts at the minimum, as in the form builder's preview, rather than the
 * browser's default of halfway. A range always sends a value, so "required"
 * is always met: there's no asterisk, and no aria-required, which a slider
 * doesn't support. */
const Range: React.FC<FormFieldProps> = ( { field, error = false } ) => {
    const min: number = getFieldNumberSetting( field, 'min', 0 );
    const max: number = Math.max( min, getFieldNumberSetting( field, 'max', 100 ) );
    const step: number = Math.max( 1, getFieldNumberSetting( field, 'step', 1 ) );
    const current: number = Number( getFieldStringValue( field.current_value ) );
    const initial: number = getFieldStringValue( field.current_value ) !== '' && current >= min && current <= max ? current : min;
    const [ value, setValue ] = useState<number>( initial );
    return (
        <>
            <label htmlFor={ field.name } className={ fieldLabelClass( field ) }>{ field.label }</label>
            <FieldError error={ error } label={ field.label } name={ field.name } />
            <input
                type="range"
                name={ field.name }
                id={ field.name }
                className="form-field__range"
                min={ min }
                max={ max }
                step={ step }
                defaultValue={ initial }
                onChange={ ( event ) => setValue( Number( event.currentTarget.value ) ) }
                { ...fieldAriaProps( field, error, false ) }
            />
            { /* The slider announces its own value, so this isn't a live
                 region as well (an <output> is a status by default) */ }
            <output htmlFor={ field.name } className="form-field__range-value" aria-live="off">{ value }</output>
        </>
    );
};
export default Range;
