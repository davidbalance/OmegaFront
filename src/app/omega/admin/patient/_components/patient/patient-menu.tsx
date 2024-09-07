import ActionMenu from '@/components/_base/action-menu'
import { MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconBuilding, IconAt, IconBuildingCommunity, IconBriefcase } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

interface PatientMenuProps {
    dni: string,
    user: number
}
const PatientMenu: React.FC<PatientMenuProps> = ({
    dni,
    user
}) => {
    return (
        <ActionMenu>
            <MenuLabel>Aplicacion</MenuLabel>
            <MenuItem
                href={`patient/action/${user}/company`}
                component={Link}
                leftSection={(
                    <IconBuilding style={{ width: rem(16), height: rem(16) }} />
                )}>
                Asignar empresa
            </MenuItem>
            <MenuItem
                href={`patient/action/${dni}/email`}
                component={Link}
                leftSection={(
                    <IconAt style={{ width: rem(16), height: rem(16) }} />
                )}>
                Correos electronicos
            </MenuItem>
            <MenuItem
                href={`patient/action/${dni}/area`}
                component={Link}
                leftSection={(
                    <IconBuildingCommunity style={{ width: rem(16), height: rem(16) }} />
                )}>
                Asignar gerencia y area
            </MenuItem>
            <MenuItem
                href={`patient/action/${dni}/job/position`}
                component={Link}
                leftSection={(
                    <IconBriefcase style={{ width: rem(16), height: rem(16) }} />
                )}>
                Asignar puesto de trabajo
            </MenuItem>
        </ActionMenu>
    )
}

export default PatientMenu