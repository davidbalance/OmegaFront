'use client'

import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React from 'react'
import { useActionMenu } from '@/contexts/action-menu.context'
import { deleteUser } from '@/server/user.actions'
import { useConfirmation } from '@/contexts/confirmation.context'

interface UserActionDeleteProps {
    id: number
}
const UserActionDelete: React.FC<UserActionDeleteProps> = ({ id }) => {

    const { trigger } = useActionMenu();
    const { show } = useConfirmation();

    const handleClick = async (id: number) => {
        const confirmation = await show("El usuario sera eliminado", '¿Está seguro?');
        if (confirmation) {
            const promise = deleteUser(id);
            trigger(promise);
        }
    }

    return (
        <MenuItem
            onClick={() => handleClick(id)}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar
        </MenuItem>
    )
}

export default UserActionDelete