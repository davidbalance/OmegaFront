'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { removeMedicalTest } from '@/server';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'

interface MedicalTestRemoveProps {
    testId: string;
}
const MedicalTestRemove: React.FC<MedicalTestRemoveProps> = ({ testId }) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = removeMedicalTest(testId);
        trigger(promise);
    }, [testId, trigger]);

    return (
        <MenuItem
            onClick={handleClick}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar Prueba
        </MenuItem>
    )
}

export default MedicalTestRemove