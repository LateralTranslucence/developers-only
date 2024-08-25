import React from 'react';
import Alphabet from 'src/components/forms/Alphabet';
import Button from 'src/components/forms/Button';
import Checkbox from 'src/components/forms/Checkbox';
import Email from 'src/components/forms/Email';
import Hidden from 'src/components/forms/Hidden';
import Phone from 'src/components/forms/Phone';
import PrivacyPolicy from 'src/components/forms/PrivacyPolicy';
import Search from 'src/components/forms/Search';
import Select from 'src/components/forms/Select';
import SelectList from 'src/components/forms/SelectList';
import Text from 'src/components/forms/Text';
import { ComponentLoaderMap } from 'src/utils/types/ComponentLoaderMap';

interface FieldLoaderProps {
    callback: ( e:Event ) => void;
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