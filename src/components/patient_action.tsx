import ActionMenuProvider from '@/contexts/action-menu.context'
import React from 'react'
import ActionMenu from './_base/action-menu'
import { MenuItem, MenuLabel, rem } from '@mantine/core'
import Link from 'next/link'
import { IconAt, IconBriefcase, IconBuildingCommunity } from '@tabler/icons-react'

type PatientActionProps = {
    patientDni: string
}
const PatientAction: React.FC<PatientActionProps> = ({
    patientDni
}) => {
    return (
        <ActionMenuProvider>
            <ActionMenu>
                <MenuLabel>Aplicacion</MenuLabel>
                <MenuItem
                    href={`/omega/admin/patient/${patientDni}/email`}
                    component={Link}
                    leftSection={(
                        <IconAt style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Correos electronicos
                </MenuItem>
                <MenuItem
                    href={`/omega/admin/patient/${patientDni}/area`}
                    component={Link}
                    leftSection={(
                        <IconBuildingCommunity style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Asignar area
                </MenuItem>
                <MenuItem
                    href={`/omega/admin/patient/${patientDni}/management`}
                    component={Link}
                    leftSection={(
                        <IconBuildingCommunity style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Asignar gerencia
                </MenuItem>
                <MenuItem
                    href={`/omega/admin/patient/${patientDni}/job-position`}
                    component={Link}
                    leftSection={(
                        <IconBriefcase style={{ width: rem(16), height: rem(16) }} />
                    )}>
                    Asignar puesto de trabajo
                </MenuItem>
            </ActionMenu>
        </ActionMenuProvider>
    )
}

export default PatientAction