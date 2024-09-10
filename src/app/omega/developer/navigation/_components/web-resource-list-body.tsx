import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import { NavIcon } from '@/components/navbar/NavIcon'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { OmegaWebResource } from '@/lib/dtos/omega/web/resource/base.response.dto'
import { Group, MenuItem, MenuLabel, rem, Stack, Text } from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import WebResourceDeleteButton from './web-resource-delete-button'

interface WebResourceListBodyProps {
    resources: OmegaWebResource[]
}
const WebResourceListBody: React.FC<WebResourceListBodyProps> = ({
    resources
}) => {
    return (
        <ListTbody height={400}>
            {resources.map(e => {
                const Icon = NavIcon[e.icon];
                return (
                    <ListRow key={e.id} hoverable>
                        <Group
                            gap={rem(16)}
                            align='center'
                            wrap='nowrap'>
                            <Icon />
                            <Stack gap={rem(8)} w='100%'>
                                <Text fw={500}>{e.label}</Text>
                                <Text>{e.address}</Text>
                            </Stack>
                            <ActionMenuProvider>
                                <ActionMenu>
                                    <MenuLabel>Administracion</MenuLabel>
                                    <MenuItem
                                        component={Link}
                                        href={`/omega/developer/navigation/${e.id}/update`}
                                        leftSection={(
                                            <IconPencil style={{ width: rem(16), height: rem(16) }} />
                                        )}>
                                        Modificar recurso
                                    </MenuItem>
                                    <WebResourceDeleteButton {...e} />
                                </ActionMenu>
                            </ActionMenuProvider>
                        </Group>
                    </ListRow>
                )
            })}
        </ListTbody>
    )
}

export default WebResourceListBody