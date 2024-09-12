import ActionMenu from '@/components/_base/action-menu';
import ListRow from '@/components/_base/list/list-row';
import ListTbody from '@/components/_base/list/list-tbody';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { Exam } from '@/lib/dtos/laboratory/exam/base.response.dto'
import { Group, rem, Title, MenuLabel, MenuItem } from '@mantine/core';
import { IconExchange } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react'

interface ExamBodyProps {
    exams: Exam[];
}
const ExamBody: React.FC<ExamBodyProps> = ({
    exams
}) => {
    return (
        <ListTbody>
            {exams.map(e => (
                <ListRow
                    hoverable={true}
                    key={e.id}>
                    <Group justify='space-between' gap={rem(8)} wrap='nowrap'>
                        <Title order={6}>{e.name}</Title>
                        <ActionMenuProvider>
                            <ActionMenu>
                                <MenuLabel>Administracion</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`laboratory/exam/${e.id}/change`}
                                    leftSection={(
                                        <IconExchange style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Cambiar tipo de examen
                                </MenuItem>
                            </ActionMenu>
                        </ActionMenuProvider>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default ExamBody