import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import { NavIcon } from '@/components/navbar/NavIcon'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { Group, MenuItem, MenuLabel, rem, Stack, Text } from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import WebResourceDeleteButton from './resource_delete_button'
import { Resource } from '@/server/resource/server-types'

type ResourceItemProps = Resource;
const ResourceItem: React.FC<ResourceItemProps> = ({
    resourceId,
    resourceIcon,
    resourceLabel,
    resourceAddress
}) => {
    const Icon = NavIcon[resourceIcon];
    return (
        <ListRow key={resourceId} hoverable>
            <Group
                gap={rem(16)}
                align='center'
                wrap='nowrap'>
                <Icon />
                <Stack gap={rem(8)} w='100%'>
                    <Text fw={500}>{resourceLabel}</Text>
                    <Text>{resourceAddress}</Text>
                </Stack>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MenuLabel>Administracion</MenuLabel>
                        <MenuItem
                            component={Link}
                            href={`/omega/developer/navigation/${resourceId}/update`}
                            leftSection={(
                                <IconPencil style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Modificar recurso
                        </MenuItem>
                        <WebResourceDeleteButton resourceId={resourceId} />
                    </ActionMenu>
                </ActionMenuProvider>
            </Group>
        </ListRow>
    )
}

export default ResourceItem