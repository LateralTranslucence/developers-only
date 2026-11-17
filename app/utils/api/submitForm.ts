import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Form } from '@/utils/types/Form';
import fetchJSON from '@/utils/api/fetchJSON';

// Posts a urlencoded form body; resolves with the form as the server re-renders
// it (errors, notice, or the submitted state)
const submitForm = ( queryString: string = '', init: RequestInit = {} ): Promise<APIResult<Form>> => {
    return fetchJSON<Form>( 'submitForm', `${ APIEndpoint }/devo-form-submit/`, {
        ...init,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString,
    } );
};
export default submitForm;
