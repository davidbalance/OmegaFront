import { Menu, MenuTarget, ActionIcon, MenuDropdown, MenuItem } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'

const values: {
    label: string,
    name: string
}[] = [{
    label: "FEMO",
    name: "femo"
}]

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
                {values.map(e => (
                    <MenuItem
                        key={e.name}
                        href={`/omega/record/create/${e.name}?patientDni=${patientDni}`}
                        component={Link}>
                        {e.label}
                    </MenuItem>))}
            </MenuDropdown>
        </Menu>
    )
}

export default RecordCreate