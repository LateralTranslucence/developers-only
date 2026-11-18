import React from 'react';
import Alphabet from '@/components/forms/Alphabet';
import Binary from '@/components/forms/Binary';
import Button from '@/components/forms/Button';
import ButtonSelect from '@/components/forms/ButtonSelect';
import Checkbox from '@/components/forms/Checkbox';
import Email from '@/components/forms/Email';
import Hidden from '@/components/forms/Hidden';
import Phone from '@/components/forms/Phone';
import PrivacyPolicy from '@/components/forms/PrivacyPolicy';
import Radio from '@/components/forms/Radio';
import Range from '@/components/forms/Range';
import Search from '@/components/forms/Search';
import Select from '@/components/forms/Select';
import SelectList from '@/components/forms/SelectList';
import Text from '@/components/forms/Text';
import Textarea from '@/components/forms/Textarea';
import Toggle from '@/components/forms/Toggle';
import { ComponentLoaderMap } from '@/utils/types/ComponentLoaderMap';
import { FormFieldProps } from '@/utils/types/FormFieldProps';

interface FieldLoaderProps extends FormFieldProps {
    type: string;
}
const formFields: ComponentLoaderMap<FieldLoaderProps> = {
    'alphabet': Alphabet,
    'binary': Binary,
    'button': Button,
    'button_select': ButtonSelect,
    'checkbox': Checkbox,
    'email': Email,
    'hidden': Hidden,
    'phone': Phone,
    'privacy_policy': PrivacyPolicy,
    'radio': Radio,
    'range_slider': Range,
    'search': Search,
    'select': Select,
    'select_list': SelectList,
    'text': Text,
    'textarea': Textarea,
    'toggle': Toggle,
};
const FormFieldLoader: React.FC<FieldLoaderProps> = ( props ) => {
    const FieldType = props.type ? formFields[ props.type ] : undefined;
    if ( FieldType ) {
        return <FieldType { ...props } />;    
    } else {
        return null;
    }
};
export default FormFieldLoader;
