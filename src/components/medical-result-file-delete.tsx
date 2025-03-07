'use client'

import { useActionMenu } from '@/contexts/action-menu.context';
import { removeMedicalResult } from '@/server/medical_test/actions';
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'

interface MedicalResultFileDeleteProps {
    testId: string;
}
const MedicalResultFileDelete: React.FC<MedicalResultFileDeleteProps> = ({ testId }) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = removeMedicalResult(testId);
        trigger(promise);
    }, [testId, trigger]);

    return (
        <MenuItem
            onClick={handleClick}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar Archivo
        </MenuItem>
    )
}

export default MedicalResultFileDelete