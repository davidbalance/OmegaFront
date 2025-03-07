import ListTbody from '@/components/_base/list/list-tbody'
import { ApiKey } from '@/server/apikey/server_types'
import React from 'react'
import ApiKeyItem from './api_key_item'

interface ApiKeyListProps {
    apikeys: ApiKey[]
}
const ApiKeyList: React.FC<ApiKeyListProps> = ({
    apikeys
}) => {
    return (
        <ListTbody>
            {apikeys.map((e) => <ApiKeyItem key={e.apiKeyId} {...e} />)}
        </ListTbody>
    )
}

export default ApiKeyList