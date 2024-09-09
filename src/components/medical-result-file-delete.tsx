'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { deleteFile } from '@/server/file.actions';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

interface MedicalResultFileDeleteProps {
    id: number;
}
const MedicalResultFileDelete: React.FC<MedicalResultFileDeleteProps> = ({ id }) => {

    const { trigger } = useActionMenu();

    const handleClick = () => {
        const promise = deleteFile(id, 'result');
        trigger(promise);
    }

    return (
        <MenuItem
            onClick={handleClick}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar Archivo
        </MenuItem>
    )
}

export default MedicalResultFileDelete