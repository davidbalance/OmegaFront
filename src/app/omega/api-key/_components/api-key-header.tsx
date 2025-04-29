import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import { Text } from '@mantine/core'
import React from 'react'

const ApiKeyHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <Text>Apikey</Text>
            </ListTh>
        </ListThead>
    )
}

export default ApiKeyHeader