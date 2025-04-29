'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { removeDisease } from '@/server';
import { MenuItem, rem } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import React, { useCallback } from 'react'

interface DiseaseDeleteProps {
    groupId: string;
    diseaseId: string;
}
const DiseaseDelete: React.FC<DiseaseDeleteProps> = ({
    diseaseId,
    groupId
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = removeDisease({ diseaseId, groupId });
        trigger(promise);
    }, [diseaseId, groupId, trigger])

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

export default DiseaseDelete