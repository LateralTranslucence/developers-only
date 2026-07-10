import React from 'react';

interface FieldErrorProps {
    error: boolean;
    label: string;
}
const FieldError: React.FC<FieldErrorProps> = ( { error = false, label = '' } ) => {
    if ( error ) {
        return (
            <ul className="form-field__error-list inputs-list">
                <li>
                    <label className="form-field__error">{ label } is a required field</label>
                </li>
            </ul>
        );
    } else {
        return null;
    }
};
export default FieldError;