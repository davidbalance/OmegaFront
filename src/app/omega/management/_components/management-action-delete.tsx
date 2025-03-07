'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { removeManagement } from '@/server/management/actions';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'

interface ManagementActionDeleteProps {
    managementId: string;
}
const ManagementActionDelete: React.FC<ManagementActionDeleteProps> = ({
    managementId
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(
        () => {
            const promise = removeManagement({ managementId });
            trigger(promise);
        }, [managementId, trigger]);

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