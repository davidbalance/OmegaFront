import ActionMenu from '@/components/_base/action-menu';
import ListRow from '@/components/_base/list/list-row';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { Exam } from '@/server/exam/server-types';
import { Group, rem, Title, MenuLabel, MenuItem } from '@mantine/core';
import { IconExchange } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'

type ExamItemProps = Exam & {
    typeId: string;
    subtypeId: string;
};
const ExamItem: React.FC<ExamItemProps> = ({
    typeId,
    subtypeId,
    examId,
    examName
}) => {
    return (
        <ListRow
            hoverable={true}
            key={examId}>
            <Group justify='space-between' gap={rem(8)} wrap='nowrap'>
                <Title order={6}>{examName}</Title>
                <ActionMenuProvider>
                    <ActionMenu>
                        <MenuLabel>Administracion</MenuLabel>
                        <MenuItem
                            component={Link}
                            href={`laboratory/exam/${typeId}/${subtypeId}/${examId}/move`}
                            leftSection={(
                                <IconExchange style={{ width: rem(16), height: rem(16) }} />
                            )}>
                            Cambiar tipo de examen
                        </MenuItem>
                    </ActionMenu>
                </ActionMenuProvider>
            </Group>
        </ListRow>
    )
}

export default ExamItem