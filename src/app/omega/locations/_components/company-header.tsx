import ListTh from '@/components/_base/list/list-th'
import ListThead from '@/components/_base/list/list-thead'
import OrderableButton from '@/components/_base/orderable-button/orderable-button'
import { Text } from '@mantine/core'
import React from 'react'

const CompanyHeader: React.FC = () => {
    return (
        <ListThead>
            <ListTh>
                <OrderableButton
                    owner='company'
                    field='companyName'>
                    <Text>Empresa</Text>
                </OrderableButton>
            </ListTh>
            <ListTh>
                <OrderableButton
                    owner='company'
                    field='companyRuc'>
                    <Text>Ruc</Text>
                </OrderableButton>
            </ListTh>
        </ListThead>
    )
}

export default CompanyHeader