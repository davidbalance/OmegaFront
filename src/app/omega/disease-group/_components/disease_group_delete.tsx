'use client'
import { useActionMenu } from '@/contexts/action-menu.context'
import { removeDiseaseGroup } from '@/server/disease_group/actions'
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'

interface DiseaseGroupDeleteProps {
    groupId: string;
    canDelete: boolean;
}
const DiseaseGroupDelete: React.FC<DiseaseGroupDeleteProps> = ({
    groupId,
    canDelete
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = removeDiseaseGroup({ groupId });
        trigger(promise);
    }, [groupId, trigger])

    return (
        <MenuItem
            disabled={canDelete}
            onClick={handleClick}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar grupo
        </MenuItem>)
}

export default DiseaseGroupDelete