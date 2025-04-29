import ActionMenu from '@/components/_base/action-menu';
import AddQueryParam from '@/components/_base/add-query-param';
import ListRow from '@/components/_base/list/list-row';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { Group, Title, MenuLabel, MenuItem, rem } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import DiseaseGroupDelete from './disease-group-delete';
import { DiseaseGroup } from '@/server/disease-group/server-types';

type DiseaseGroupItemProps = DiseaseGroup & {
    active?: boolean;
    removeQueries?: string[];
}
const DiseaseGroupItem: React.FC<DiseaseGroupItemProps> = ({
    groupId,
    groupName,
    hasDiseases,
    active,
    removeQueries = []
}) => {
    return (
        <ListRow
            active={active}
            hoverable={true}>
            <Group
                justify='space-between'
                align='center'
                wrap='nowrap'>
                <AddQueryParam
                    value={groupId}
                    query='group'
                    removeQueries={removeQueries}>
                    <Title order={6}>
                        {groupName}
                    </Title>
                </AddQueryParam>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MenuLabel>Administracion</MenuLabel>
                        <MenuItem
                            component={Link}
                            href={`disease/group/${groupId}/update`}
                            leftSection={(
                                <IconEdit style={{ width: rem(16), height: rem(16) }}
                                />)}>
                            Editar grupo
                        </MenuItem>
                        <DiseaseGroupDelete
                            groupId={groupId}
                            canDelete={hasDiseases} />
                    </ActionMenu>
                </ActionMenuProvider>
            </Group>
        </ListRow>
    )
}

export default DiseaseGroupItem