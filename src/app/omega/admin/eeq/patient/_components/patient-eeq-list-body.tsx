import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { Patient, PatientEeq } from '@/lib/dtos/user/patient/base.response.dto'
import { Flex, Title, Text, MenuItem, MenuLabel, rem, Group, Stack } from '@mantine/core'
import React from 'react'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { IconBuilding, IconAt, IconBuildingCommunity, IconBriefcase } from '@tabler/icons-react'
import Link from 'next/link'
import AddQueryParam from '@/components/_base/add-query-param'
import ActionMenu from '@/components/_base/action-menu'

interface PatientEeqListBodyProps {
    active?: string;
    action?: boolean;
    patients: PatientEeq[];
}
const PatientEeqListBody: React.FC<PatientEeqListBodyProps> = ({
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
                            query='patient'>
                            <Stack justify='space-between' gap={rem(8)}>
                                <Title order={6}>{`${e.name} ${e.lastname}`}</Title>
                                <Group>
                                    <Text c='dimmed'>{e.role}</Text>
                                    <Text>{e.dni}</Text>
                                </Group>
                            </Stack>
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

export default PatientEeqListBody