import React from 'react';

interface RequiredMarkerProps {
    /*
     * Also say "required" to assistive technology. For a field whose control
     * can't carry aria-required - a checkbox group, which ARIA doesn't allow
     * it on - so the word goes into the group's name instead. A single
     * control sets aria-required and leaves this off, or it is said twice.
     */
    spoken?: boolean;
}

// The "*" after a required field's label. It is visual only: read aloud it
// was just "star".
const RequiredMarker: React.FC<RequiredMarkerProps> = ( { spoken = false } ) => (
    <>
        <span className="form-field__required" aria-hidden="true">*</span>
        { spoken ?
            <span className="screenReader"> required</span>
        : null }
    </>
);
export default RequiredMarker;
