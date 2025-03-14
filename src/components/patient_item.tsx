import ListRow from '@/components/_base/list/list-row'
import { Flex, Title, Text } from '@mantine/core'
import React from 'react'
import AddQueryParam from './_base/add-query-param'
import { MedicalClient } from '@/server/medical_client/server_types'
import PatientAction from './patient_action'

type PatientItemProps = MedicalClient & {
    active?: boolean;
    action?: boolean;
    removeQueries?: string[];
}
const PatientItem: React.FC<PatientItemProps> = ({
    patientDni,
    patientName,
    patientLastname,
    active,
    action,
    removeQueries = []
}) => {
    return (
        <ListRow
            active={active}
            hoverable={true}>
            <Flex
                justify='space-between'
                align='center'
                component='div'>
                <AddQueryParam
                    value={patientDni}
                    query='patient'
                    removeQueries={removeQueries}>
                    <Title order={6}>{`${patientName} ${patientLastname}`}</Title>
                    <Text>{patientDni}</Text>
                </AddQueryParam>
                {action
                    ? <PatientAction patientDni={patientDni} />
                    : null}
            </Flex>
        </ListRow>
    )
}

export default PatientItem