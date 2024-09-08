import ActionMenu from '@/components/_base/action-menu'
import AddQueryParam from '@/components/_base/add-query-param'
import ListRow from '@/components/_base/list/list-row'
import ListTbody from '@/components/_base/list/list-tbody'
import ActionMenuProvider from '@/contexts/action-menu.context'
import { Group, rem, Title, MenuLabel, MenuItem } from '@mantine/core'
import { IconPencil, IconExchange } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import ExamSubtypeActionDelete from './exam-subtype-action-delete'
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto'

interface ExamSubtypeBodyProps {
    active: number | undefined;
    subtypes: ExamSubtype[];
}
const ExamSubtypeBody: React.FC<ExamSubtypeBodyProps> = ({
    active,
    subtypes
}) => {
    return (
        <ListTbody>
            {subtypes.map(e => (
                <ListRow
                    active={active === e.id}
                    hoverable={true}
                    key={e.id}>
                    <Group justify='space-between' gap={rem(8)} wrap='nowrap'>
                        <AddQueryParam
                            value={e.id.toString()}
                            query='subtype'>
                            <Title order={6}>{e.name}</Title>
                        </AddQueryParam>
                        <ActionMenuProvider>
                            <ActionMenu>
                                <MenuLabel>Administracion</MenuLabel>
                                <MenuItem
                                    component={Link}
                                    href={`laboratory/subtype/${e.id}/update`}
                                    leftSection={(
                                        <IconPencil style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Modificacion
                                </MenuItem>
                                <MenuItem
                                    component={Link}
                                    href={`laboratory/subtype/${e.id}/change`}
                                    leftSection={(
                                        <IconExchange style={{ width: rem(16), height: rem(16) }} />
                                    )}>
                                    Cambiar tipo de examen
                                </MenuItem>
                                <ExamSubtypeActionDelete id={e.id} />
                            </ActionMenu>
                        </ActionMenuProvider>
                    </Group>
                </ListRow>
            ))}
        </ListTbody>
    )
}

export default ExamSubtypeBody