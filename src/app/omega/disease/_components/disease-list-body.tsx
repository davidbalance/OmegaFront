import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { Disease } from '@/lib/dtos/disease/base.response.dto'
import { Group, MenuLabel, MenuItem, rem, Text } from '@mantine/core'
import { IconEdit, IconExchange } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import DiseaseActionDelete from './disease-action-delete'

interface DiseaseListBodyProps {
    diseases: Disease[]
}
const DiseaseListBody: React.FC<DiseaseListBodyProps> = ({
    diseases
}) => {
    return (
        <ListTbody>
            {diseases.map(e => (
                <ListRow
                    hoverable
                    key={e.id}>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                        <Text>{e.name}</Text>
                        <ActionMenuProvider>
                            <ActionMenu>
                                <MenuLabel>Administracion</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`disease/${e.id}/update`}
                                    leftSection={(
                                        <IconEdit style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Editar morbilidad
                                </MenuItem>
                                <MenuItem
                                    href={`disease/${e.id}/change`}
                                    component={Link}
                                    leftSection={(
                                        <IconExchange style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Cambiar grupo
                                </MenuItem>
                                <DiseaseActionDelete id={e.id} />
                            </ActionMenu>
                        </ActionMenuProvider>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>)
}

export default DiseaseListBody