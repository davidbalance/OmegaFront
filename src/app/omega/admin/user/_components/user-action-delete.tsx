'use client'

import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'
import { useActionMenu } from '@/contexts/action-menu.context'
import { useConfirmation } from '@/contexts/confirmation.context'
import { removeUser } from '@/server/user/actions'

interface UserActionDeleteProps {
    id: string
}
const UserActionDelete: React.FC<UserActionDeleteProps> = ({ id }) => {

    const { trigger } = useActionMenu();
    const { show } = useConfirmation();

    const handleClick = useCallback(async () => {
        const confirmation = await show("El usuario sera eliminado", '¿Está seguro?');
        if (confirmation) {
            const promise = removeUser(id);
            trigger(promise);
        }
    }, [trigger, id, show])

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

export default UserActionDelete