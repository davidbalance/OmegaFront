'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { deleteWebResource } from '@/server/web-resource.actions';
import { MenuItem, rem } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React, { useCallback } from 'react'

interface WebResourceDeleteButtonProps {
    id: number;
}
const WebResourceDeleteButton: React.FC<WebResourceDeleteButtonProps> = ({
    id
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(async () => {
        const deletePromise = deleteWebResource(id);
        trigger(deletePromise);
    }, [id])

    return (
        <MenuItem
            color='red'
            onClick={handleClick}
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar recurso
        </MenuItem>)
}

export default WebResourceDeleteButton