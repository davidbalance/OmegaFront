'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { deleteExamSubtype } from '@/server/exam-subtype.actions';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

interface ExamSubtypeActionDeleteProps {
    id: number;
}
const ExamSubtypeActionDelete: React.FC<ExamSubtypeActionDeleteProps> = ({
    id
}) => {

    const { trigger } = useActionMenu();

    const handleClick = () => {
        const promise = deleteExamSubtype(id);
        trigger(promise);
    }

    return (
        <MenuItem
            onClick={handleClick}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar
        </MenuItem>
    )
}

export default ExamSubtypeActionDelete