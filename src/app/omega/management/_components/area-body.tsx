import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { Area } from '@/lib/dtos/location/area/base.response.dto'
import { Group, MenuLabel, MenuItem, rem, Text, Title } from '@mantine/core'
import { IconPencil, IconExchange } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import AreaActionDelete from './area-action-delete'

interface AreaBodyProps {
    areas: Area[]
}
const AreaBody: React.FC<AreaBodyProps> = ({ areas }) => {
    return (
        <ListTbody>
            {areas.map(e => (
                <ListRow
                    hoverable={true}
                    key={e.id}>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                        <Title order={6}>{e.name}</Title>
                        <ActionMenuProvider>
                            <ActionMenu>
                                <MenuLabel>Administracion</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`area/${e.id}/update`}
                                    leftSection={(
                                        <IconPencil style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Modificacion
                                </MenuItem>
                                <AreaActionDelete id={e.id} />
                            </ActionMenu>
                        </ActionMenuProvider>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default AreaBody