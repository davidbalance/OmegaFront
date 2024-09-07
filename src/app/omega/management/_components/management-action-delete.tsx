'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { deleteManagement } from '@/server/management.actions';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

interface ManagementActionDeleteProps {
    id: number;
}
const ManagementActionDelete: React.FC<ManagementActionDeleteProps> = ({
    id
}) => {

    const { trigger } = useActionMenu();

    const handleClick = () => {
        const promise = deleteManagement(id);
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

export default ManagementActionDelete