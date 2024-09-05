'use client'

import { useActionUser } from '@/contexts/action-menu.context'
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import { removeMedicalResultFile } from '../../../../../../server/medical-result.action'

interface MedicalResultFileDeleteProps {
    id: number;
}
const MedicalResultFileDelete: React.FC<MedicalResultFileDeleteProps> = ({ id }) => {

    const { trigger } = useActionUser();

    const handleClick = () => {
        const promise = removeMedicalResultFile(id, 'result');
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