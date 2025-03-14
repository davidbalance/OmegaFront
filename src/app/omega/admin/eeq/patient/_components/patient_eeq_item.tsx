import ListRow from '@/components/_base/list/list-row'
import { Flex, Text, rem, Group, Stack } from '@mantine/core'
import React from 'react'
import AddQueryParam from '@/components/_base/add-query-param'
import { MedicalClient } from '@/server/medical_client/server_types'
import PatientAction from '@/components/patient_action'
import Title from '@/components/_base/mantine/title'

type PatientEeqItemProps = MedicalClient & {
    active?: boolean;
    action?: boolean;
    removeQueries?: string[];
}
const PatientEeqItem: React.FC<PatientEeqItemProps> = ({
    patientDni,
    patientName,
    patientLastname,
    patientRole,
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
                    <Stack justify='space-between' gap={rem(8)}>
                        <Title order={6}>{`${patientName} ${patientLastname}`}</Title>
                        <Group>
                            <Text c='dimmed'>{patientRole ?? 0}</Text>
                            <Text>{patientDni}</Text>
                        </Group>
                    </Stack>
                </AddQueryParam>
                {action
                    ? <PatientAction patientDni={patientDni} />
                    : null}
            </Flex>
        </ListRow>
    )
}

export default PatientEeqItem