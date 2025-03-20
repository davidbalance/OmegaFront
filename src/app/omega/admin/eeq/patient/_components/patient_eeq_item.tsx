import ListRow from '@/components/_base/list/list-row'
import { Flex, Text, rem, Group, Stack, Menu, MenuTarget, ActionIcon, MenuDropdown, MenuItem } from '@mantine/core'
import React from 'react'
import AddQueryParam from '@/components/_base/add-query-param'
import { MedicalClient } from '@/server/medical_client/server_types'
import PatientAction from '@/components/patient_action'
import Title from '@/components/_base/mantine/title'
import { IconDotsVertical, IconHash, IconNumber } from '@tabler/icons-react'
import PatientMenuItems from '@/components/patient-menu-items'
import Link from 'next/link'

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
                    ? <Menu>
                        <MenuTarget>
                            <ActionIcon variant="transparent">
                                <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </MenuTarget>
                        <MenuDropdown>
                            <PatientMenuItems patientDni={patientDni} />
                            <MenuItem
                                href={`/omega/admin/eeq/patient/${patientDni}/role`}
                                component={Link}
                                leftSection={(
                                    <IconHash style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Modificar rol
                            </MenuItem>
                        </MenuDropdown>
                    </Menu>
                    : null}
            </Flex>
        </ListRow>
    )
}

export default PatientEeqItem