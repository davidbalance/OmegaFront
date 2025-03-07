'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { removeExamSubtype } from '@/server/exam_subtype/actions';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'

interface ExamSubtypeRemoveProps {
    typeId: string;
    subtypeId: string;
    canDelete?: boolean;
}
const ExamSubtypeRemove: React.FC<ExamSubtypeRemoveProps> = ({
    typeId,
    subtypeId,
    canDelete
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = removeExamSubtype({ typeId, subtypeId });
        trigger(promise);
    }, [typeId, subtypeId, trigger])

    return (
        <MenuItem
            onClick={handleClick}
            color="red"
            disabled={!canDelete}
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar
        </MenuItem>
    )
}

export default ExamSubtypeRemove