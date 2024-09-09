import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { Patient } from '@/lib/dtos/user/patient/base.response.dto'
import { Flex, Title, Text, MenuItem, MenuLabel, rem } from '@mantine/core'
import React from 'react'
import AddQueryParam from './_base/add-query-param'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { IconBuilding, IconAt, IconBuildingCommunity, IconBriefcase } from '@tabler/icons-react'
import Link from 'next/link'
import ActionMenu from './_base/action-menu'

interface PatientListBodyProps {
    active?: string;
    action?: boolean;
    patients: Patient[];
}
const PatientListBody: React.FC<PatientListBodyProps> = ({
    active,
    action,
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
                        {
                            action
                                ? (
                                    <ActionMenuProvider>
                                        <ActionMenu>
                                            <MenuLabel>Aplicacion</MenuLabel>
                                            <MenuItem
                                                href={`/omega/admin/patient/${e.user}/company`}
                                                component={Link}
                                                leftSection={(
                                                    <IconBuilding style={{ width: rem(16), height: rem(16) }} />
                                                )}>
                                                Asignar empresa
                                            </MenuItem>
                                            <MenuItem
                                                href={`/omega/admin/patient/${e.dni}/email`}
                                                component={Link}
                                                leftSection={(
                                                    <IconAt style={{ width: rem(16), height: rem(16) }} />
                                                )}>
                                                Correos electronicos
                                            </MenuItem>
                                            <MenuItem
                                                href={`/omega/admin/patient/${e.dni}/area`}
                                                component={Link}
                                                leftSection={(
                                                    <IconBuildingCommunity style={{ width: rem(16), height: rem(16) }} />
                                                )}>
                                                Asignar gerencia y area
                                            </MenuItem>
                                            <MenuItem
                                                href={`/omega/admin/patient/${e.dni}/job/position`}
                                                component={Link}
                                                leftSection={(
                                                    <IconBriefcase style={{ width: rem(16), height: rem(16) }} />
                                                )}>
                                                Asignar puesto de trabajo
                                            </MenuItem>
                                        </ActionMenu>
                                    </ActionMenuProvider>
                                )
                                : null
                        }
                    </Flex>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default PatientListBody