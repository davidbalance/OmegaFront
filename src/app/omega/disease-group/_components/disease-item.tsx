import ActionMenu from '@/components/_base/action-menu'
import ListRow from '@/components/_base/list/list-row'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { Group, MenuLabel, MenuItem, rem, Text } from '@mantine/core'
import { IconEdit, IconExchange } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import { Disease } from '@/server/disease/server-types'
import DiseaseDelete from './disease-delete'

type DiseaseItemProps = Disease & {
    groupId: string;
};
const DiseaseItem: React.FC<DiseaseItemProps> = ({
    groupId,
    diseaseId,
    diseaseName
}) => {
    return (
        <ListRow
            hoverable
            key={diseaseId}>
            <Group justify='space-between' align='center' wrap='nowrap'>
                <Text>{diseaseName}</Text>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MenuLabel>Administracion</MenuLabel>
                        <MenuItem
                            component={Link}
                            href={`/omega/disease/${groupId}/${diseaseId}/update`}
                            leftSection={(
                                <IconEdit style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Editar morbilidad
                        </MenuItem>
                        <MenuItem
                            href={`/omega/disease/${groupId}/${diseaseId}/change`}
                            component={Link}
                            leftSection={(
                                <IconExchange style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Cambiar grupo
                        </MenuItem>
                        <DiseaseDelete
                            diseaseId={diseaseId}
                            groupId={groupId} />
                    </ActionMenu>
                </ActionMenuProvider>
            </Group>
        </ListRow>)
}

export default DiseaseItem