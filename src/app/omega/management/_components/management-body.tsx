import ActionMenu from '@/components/_base/action-menu'
import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { Management } from '@/lib/dtos/location/management/base.response.dto'
import { Group, Title, MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import ManagementActionDelete from './management-action-delete'

interface ManagementBodyProps {
    active: number | undefined;
    managements: Management[];
}
const ManagementBody: React.FC<ManagementBodyProps> = ({ active, managements }) => {
    return (
        <ListTbody>
            {managements.map(e => (
                <ListRow
                    active={active === e.id}
                    hoverable={true}
                    key={e.id}>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                        <AddQueryParam
                            value={e.id.toString()}
                            query='management'>
                            <Title order={6}>{e.name}</Title>
                        </AddQueryParam>
                        <ActionMenuProvider>
                            <ActionMenu>
                                <MenuLabel>Administracion</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`management/${e.id}/update`}
                                    leftSection={(
                                        <IconPencil style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Modificacion
                                </MenuItem>
                                <ManagementActionDelete id={e.id} />
                            </ActionMenu>
                        </ActionMenuProvider>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default ManagementBody