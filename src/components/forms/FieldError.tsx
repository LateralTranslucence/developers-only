import React from 'react';

interface FieldErrorProps {
    error: boolean;
    label: string;
}
const FieldError: React.FC<FieldErrorProps> = ( { error = false, label = '' } ) => {
    if ( error ) {
        return (
            <ul className="do-error-message inputs-list">
                <li>
                    <label className="field-required">{ label } is a required field</label>
                </li>
            </ul>
        )
    } else {
        return null;
    }
}
export default FieldError;