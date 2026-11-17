import { APIEndpoint } from '@/globalVariables';
import { APIResult } from '@/utils/types/APIResult';
import { Form } from '@/utils/types/Form';
import fetchJSON from '@/utils/api/fetchJSON';

const getForm = ( formID: number, init: RequestInit = {} ): Promise<APIResult<Form>> => {
    return fetchJSON<Form>( 'getForm', `${ APIEndpoint }/devo-form/?formID=${ encodeURIComponent( formID ) }`, init );
};
export default getForm;
