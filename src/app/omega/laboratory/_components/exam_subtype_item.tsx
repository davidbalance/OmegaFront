import React from 'react'
import { ExamSubtype } from '@/server/exam-subtype/server-types'
import ActionMenu from '@/components/_base/action-menu';
import AddQueryParam from '@/components/_base/add-query-param';
import ListRow from '@/components/_base/list/list-row';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { Group, rem, Title, MenuLabel, MenuItem } from '@mantine/core';
import { IconPencil, IconExchange } from '@tabler/icons-react';
import Link from 'next/link';
import ExamSubtypeRemove from './exam_subtype_remove';

type ExamSubtypeItemProps = {
    active?: boolean;
    typeId: string;
    removeQueries?: string[];
} & ExamSubtype;

const ExamSubtypeItem: React.FC<ExamSubtypeItemProps> = ({
    active,
    typeId,
    subtypeId,
    subtypeName,
    hasExams,
    removeQueries
}) => {
    return (
        <ListRow
            active={active}
            hoverable={true}
            key={subtypeId}>
            <Group justify='space-between' gap={rem(8)} wrap='nowrap'>
                <AddQueryParam
                    value={subtypeId}
                    query='subtype'
                    removeQueries={removeQueries}>
                    <Title order={6}>{subtypeName}</Title>
                </AddQueryParam>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MenuLabel>Administracion</MenuLabel>
                        <MenuItem
                            component={Link}
                            href={`laboratory/subtype/${typeId}/${subtypeId}/update`}
                            leftSection={(
                                <IconPencil style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Modificacion
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            href={`laboratory/subtype/${typeId}/${subtypeId}/move`}
                            leftSection={(
                                <IconExchange style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Cambiar tipo de examen
                        </MenuItem>
                        <ExamSubtypeRemove
                            typeId={typeId}
                            subtypeId={subtypeId}
                            canDelete={!hasExams} />
                    </ActionMenu>
                </ActionMenuProvider>
            </Group>
        </ListRow>
    )
}

export default ExamSubtypeItem