import React from 'react';
import CTA from '@/components/shared/CTA';
import { privacyPolicyURL, siteName } from '@/globalVariables';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

// Links to the privacy policy page set under Settings > Privacy. Renders
// nothing until one is set, rather than a link to a page that may not exist.
const PrivacyPolicy: React.FC<FormFieldProps> = () => {
    if ( ! privacyPolicyURL ) {
        return null;
    }
    return <p>View { siteName ? 'the ' + siteName : 'our' } <CTA url={ privacyPolicyURL } target="_blank">Privacy Policy</CTA></p>;
};
export default PrivacyPolicy;
