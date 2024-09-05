'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { deleteDisease } from '@/server/disease.actions';
import { MenuItem, rem } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React, { useCallback } from 'react'

interface DiseaseActionDeleteProps {
    id: number
}
const DiseaseActionDelete: React.FC<DiseaseActionDeleteProps> = ({
    id
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = deleteDisease(id);
        trigger(promise);
    }, [id])

    return (
        <MenuItem
            onClick={handleClick}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar morbilidad
        </MenuItem>)
}

export default DiseaseActionDelete