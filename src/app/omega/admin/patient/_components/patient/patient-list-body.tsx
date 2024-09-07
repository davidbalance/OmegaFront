import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { Patient } from '@/lib/dtos/user/patient/base.response.dto'
import { Flex, Title, Text, MenuItem, rem, MenuLabel } from '@mantine/core'
import React from 'react'
import { IconAt, IconBriefcase, IconBuilding, IconBuildingCommunity } from '@tabler/icons-react'
import Link from 'next/link'
import AddQueryParam from '../../../../../../components/_base/add-query-param'
import ActionMenuProvider from '@/contexts/action-menu.context'
import PatientMenu from './patient-menu'

interface PatientListBodyProps {
    active?: string;
    patients: Patient[]
}
const PatientListBody: React.FC<PatientListBodyProps> = ({
    active,
    patients
}) => {
    return (
        <ListTbody>
            {patients.map((e, index) => (
                <ListRow
                    active={active === e.dni}
                    hoverable={true}
                    key={index}>
                    <Flex justify='space-between' align='center'>
                        <AddQueryParam
                            value={e.dni}
                            query='patient'
                            removeQueries={['medicalOrder']}>
                            <Title order={6}>{`${e.name} ${e.lastname}`}</Title>
                            <Text>{e.dni}</Text>
                        </AddQueryParam>
                        <ActionMenuProvider>
                            <PatientMenu {...e} />
                        </ActionMenuProvider>
                    </Flex>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default PatientListBody