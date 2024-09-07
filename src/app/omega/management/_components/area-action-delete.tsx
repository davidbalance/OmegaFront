'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { deleteArea } from '@/server/area.actions';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'

interface AreaActionDeleteProps {
    id: number;
}
const AreaActionDelete: React.FC<AreaActionDeleteProps> = ({
    id
}) => {

    const { trigger } = useActionMenu();

    const handleClick = () => {
        const promise = deleteArea(id);
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

export default AreaActionDelete