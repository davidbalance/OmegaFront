import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { Patient } from '@/lib/dtos/user/patient/base.response.dto'
import { Flex, Title, Text, MenuItem, rem, MenuLabel } from '@mantine/core'
import React from 'react'
import { IconAt, IconBriefcase, IconBuilding, IconBuildingCommunity } from '@tabler/icons-react'
import Link from 'next/link'
import AddQueryParam from '../../../../../../components/_base/add-query-param'

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
                            queryKey='patient'
                            removeQueries={['medicalOrder']}>
                            <Title order={6}>{`${e.name} ${e.lastname}`}</Title>
                            <Text>{e.dni}</Text>
                        </AddQueryParam>
                        <ActionMenu>
                            <MenuLabel>Aplicacion</MenuLabel>
                            <MenuItem
                                href={`patient/action/${e.user}/company`}
                                component={Link}
                                leftSection={(
                                    <IconBuilding style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Asignar empresa
                            </MenuItem>
                            <MenuItem
                                href={`patient/action/${e.dni}/email`}
                                component={Link}
                                leftSection={(
                                    <IconAt style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Correos electronicos
                            </MenuItem>
                            <MenuItem
                                href={`patient/action/${e.dni}/area`}
                                component={Link}
                                leftSection={(
                                    <IconBuildingCommunity style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Asignar gerencia y area
                            </MenuItem>
                            <MenuItem
                                href={`patient/action/${e.dni}/job/position`}
                                component={Link}
                                leftSection={(
                                    <IconBriefcase style={{ width: rem(16), height: rem(16) }} />
                                )}>
                                Asignar puesto de trabajo
                            </MenuItem>
                        </ActionMenu>
                    </Flex>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default PatientListBody