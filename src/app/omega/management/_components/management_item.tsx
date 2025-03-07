import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { Group, Title, MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import ManagementActionDelete from './management-action-delete'
import { Management } from '@/server/management/server_types'

type ManagementItemProps = Management & {
    active?: boolean;
}
const ManagementItem: React.FC<ManagementItemProps> = ({
    active,
    managementId,
    managementName
}) => {
    return (
        <ListRow
            active={active}
            hoverable={true}>
            <Group justify='space-between' align='center' wrap='nowrap'>
                <Title order={6}>{managementName}</Title>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MenuLabel>Administracion</MenuLabel>
                        <MenuItem
                            component={Link}
                            href={`management/${managementId}/update`}
                            leftSection={(
                                <IconPencil style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Modificacion
                        </MenuItem>
                        <ManagementActionDelete managementId={managementId} />
                    </ActionMenu>
                </ActionMenuProvider>
            </Group>
        </ListRow>
    )
}

export default ManagementItem