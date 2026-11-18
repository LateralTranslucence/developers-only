import React from 'react';
import { fieldErrorId } from '@/components/forms/fieldAria';

interface FieldErrorProps {
    error: boolean;
    label: string;
    // The field's name: the message's id is derived from it, so the input
    // can point at it with aria-describedby (see fieldAriaProps)
    name: string;
}
// A text span, not a <label>: a second label with no for= labels nothing,
// and the input's aria-describedby is what ties this message to it
const FieldError: React.FC<FieldErrorProps> = ( { error = false, label = '', name } ) => {
    if ( error ) {
        return (
            <ul className="form-field__error-list inputs-list">
                <li>
                    <span className="form-field__error" id={ fieldErrorId( name ) }>{ label } is a required field</span>
                </li>
            </ul>
        );
    } else {
        return null;
    }
};
export default FieldError;
