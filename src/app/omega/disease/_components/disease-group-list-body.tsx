import ActionMenu from '@/components/_base/action-menu';
import AddQueryParam from '@/components/_base/add-query-param';
import ListRow from '@/components/_base/list/list-row';
import ListTbody from '@/components/_base/list/list-tbody';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { DiseaseGroup } from '@/lib/dtos/disease/group/base.response.dto'
import { Group, Title, MenuLabel, MenuItem, rem } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'
import DiseaseGroupActionDelete from './disease-group-action-delete';

interface DiseaseGroupListBodyProps {
    active: number | undefined;
    groups: DiseaseGroup[];
}
const DiseaseGroupListBody: React.FC<DiseaseGroupListBodyProps> = ({
    active,
    groups
}) => {
    return (
        <ListTbody>
            {groups.map(e => (
                <ListRow
                    active={active === e.id}
                    hoverable={true}
                    key={e.id}>
                    <Group justify='space-between' align='center' wrap='nowrap'>
                        <AddQueryParam
                            value={e.id.toString()}
                            query='group'
                            removeQueries={['medicalOrder']}>
                            <Title order={6}>{e.name}</Title>
                        </AddQueryParam>
                        <ActionMenuProvider>
                            <ActionMenu>
                                <MenuLabel>Administracion</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`disease/group/${e.id}/update`}
                                    leftSection={(
                                        <IconEdit style={{ width: rem(16), height: rem(16) }}
                                        />)}>
                                    Editar grupo
                                </MenuItem>
                                <DiseaseGroupActionDelete id={e.id} />
                            </ActionMenu>
                        </ActionMenuProvider>

                    </Group>
                </ListRow>
            ))}
        </ListTbody>)
}

export default DiseaseGroupListBody