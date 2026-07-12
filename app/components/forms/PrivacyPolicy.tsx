import React from 'react';
import CTA from '@/components/shared/CTA';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

const PrivacyPolicy: React.FC<FormFieldProps> = () => {
    return <p>View the { '{DevelopersOnly}' } <CTA url={ '/legal/' } classes={ [] } target="_blank">Privacy Policy</CTA></p>;
};
export default PrivacyPolicy;