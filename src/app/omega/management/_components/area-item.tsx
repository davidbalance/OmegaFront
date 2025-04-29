import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { Group, MenuLabel, MenuItem, rem } from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import AreaActionDelete from './area-action-delete'
import Title from '@/components/_base/mantine/title'
import { Area } from '@/server/area/server-types'

type AreaItemProps = Area;
const AreaItem: React.FC<AreaItemProps> = ({
    areaId,
    areaName
}) => {
    return (
        <ListRow
            hoverable={true}
            key={areaId}>
            <Group justify='space-between' align='center' wrap='nowrap'>
                <Title order={6}>{areaName}</Title>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MenuLabel>Administracion</MenuLabel>
                        <MenuItem
                            component={Link}
                            href={`/omega/area/${areaId}/update`}
                            leftSection={(
                                <IconPencil style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Modificacion
                        </MenuItem>
                        <AreaActionDelete areaId={areaId} />
                    </ActionMenu>
                </ActionMenuProvider>
            </Group>
        </ListRow>
    )
}

export default AreaItem