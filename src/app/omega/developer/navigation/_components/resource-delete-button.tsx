'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { removeResource } from '@/server';
import { MenuItem, rem } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React, { useCallback } from 'react'

type ResourceDeleteButtonProps = {
    resourceId: string;
}
const ResourceDeleteButton: React.FC<ResourceDeleteButtonProps> = ({
    resourceId
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(async () => {
        const deletePromise = removeResource({ resourceId });
        trigger(deletePromise);
    }, [resourceId, trigger])

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

export default ResourceDeleteButton