import React from 'react';
import Alphabet from '@/components/forms/Alphabet';
import Button from '@/components/forms/Button';
import Checkbox from '@/components/forms/Checkbox';
import Email from '@/components/forms/Email';
import Hidden from '@/components/forms/Hidden';
import Phone from '@/components/forms/Phone';
import PrivacyPolicy from '@/components/forms/PrivacyPolicy';
import Search from '@/components/forms/Search';
import Select from '@/components/forms/Select';
import SelectList from '@/components/forms/SelectList';
import Text from '@/components/forms/Text';
import Textarea from '@/components/forms/Textarea';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';

interface FieldLoaderProps {
    callback?: ( e: Event ) => void;
    error?: boolean;
    field: Record<string, any>;
    type: string;
}
const formFields: ComponentLoaderMap = {
    'alphabet': Alphabet,
    'button': Button,
    'checkbox': Checkbox,
    'email': Email,
    'hidden': Hidden,
    'phone': Phone,
    'privacy_policy': PrivacyPolicy,
    'search': Search,
    'select': Select,
    'select_list': SelectList,
    'text': Text,
    'textarea': Textarea,
}
const FormFieldLoader: React.FC<FieldLoaderProps> = ( props ) => {
    const FieldType = props.type ? formFields[ props.type ] : undefined;
    if ( FieldType ) {
        return <FieldType { ...props } />;    
    } else {
        return null;
    }
}
export default FormFieldLoader;