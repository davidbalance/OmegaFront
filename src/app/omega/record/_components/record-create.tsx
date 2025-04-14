import { Menu, MenuTarget, ActionIcon, MenuDropdown, MenuItem } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

type RecordCreateProps = {
    patientDni: string
}
const RecordCreate: React.FC<RecordCreateProps> = ({
    patientDni
}) => {
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon
                    size='sm'
                    variant='light'>
                    <IconPlus />
                </ActionIcon>
            </MenuTarget>
            <MenuDropdown>
                <MenuItem
                    href={`/omega/record/create/initial?patientDni=${patientDni}`}
                    component={Link}>
                    Inicial
                </MenuItem>
                <MenuItem
                    href={`/omega/record/create/periodic?patientDni=${patientDni}`}
                    component={Link}>
                    Periodico
                </MenuItem>
                <MenuItem
                    href={`/omega/record/create/reintegrate?patientDni=${patientDni}`}
                    component={Link}>
                    Reintegracion
                </MenuItem>
                <MenuItem
                    href={`/omega/record/create/retirement?patientDni=${patientDni}`}
                    component={Link}>
                    Retiro
                </MenuItem>
                <MenuItem
                    href={`/omega/record/create/certificate?patientDni=${patientDni}`}
                    component={Link}>
                    Certificado
                </MenuItem>
            </MenuDropdown>
        </Menu>
    )
}

export default RecordCreate