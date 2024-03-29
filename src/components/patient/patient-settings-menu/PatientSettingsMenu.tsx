import { Menu, MenuTarget, ActionIcon, rem } from '@mantine/core'
import { IconDotsVertical, IconExternalLink, IconKey } from '@tabler/icons-react'
import React from 'react'

type PatientSettingsMenuProps = {
    link: string;
}
const PatientSettingsMenu: React.FC<PatientSettingsMenuProps> = ({ link }) => {
    return (
        <Menu>
            <MenuTarget>
                <ActionIcon variant="transparent">
                    <IconDotsVertical style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </MenuTarget>
            <Menu.Dropdown>
                {/* <Menu.Label>Aplicacion</Menu.Label> */}
                <Menu.Item
                    leftSection={<IconExternalLink style={{ width: rem(14), height: rem(14) }} />}
                    component='a'
                    href={`${link}`}>
                    Pedidos del paciente
                </Menu.Item>


                {/* <Menu.Label>Danger zone</Menu.Label>
                <Menu.Divider />
                <Menu.Item
                    color="red"
                    leftSection={<IconKey style={{ width: rem(14), height: rem(14) }} />}>
                    Generar contraseña
                </Menu.Item> */}
            </Menu.Dropdown>
        </Menu>
    )
}

export default PatientSettingsMenu