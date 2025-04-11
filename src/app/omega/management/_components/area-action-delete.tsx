'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { removeArea } from '@/server';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'

interface AreaActionDeleteProps {
    areaId: string;
}
const AreaActionDelete: React.FC<AreaActionDeleteProps> = ({
    areaId
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(
        () => {
            const promise = removeArea({ areaId });
            trigger(promise);
        }, [areaId, trigger])

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