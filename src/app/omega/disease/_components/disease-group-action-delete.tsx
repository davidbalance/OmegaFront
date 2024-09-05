'use client'
import { useActionMenu } from '@/contexts/action-menu.context'
import { deleteDiseaseGroup } from '@/server/disease-group.actions'
import { MenuItem, rem } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import React, { useCallback } from 'react'

interface DiseaseGroupActionDeleteProps {
    id: number
}
const DiseaseGroupActionDelete: React.FC<DiseaseGroupActionDeleteProps> = ({
    id
}) => {

    const { trigger } = useActionMenu();

    const handleClick = useCallback(() => {
        const promise = deleteDiseaseGroup(id);
        trigger(promise);
    }, [id])

    return (
        <MenuItem
            onClick={handleClick}
            color="red"
            leftSection={(
                <IconTrash style={{ width: rem(16), height: rem(16) }} />
            )}>
            Eliminar grupo
        </MenuItem>)
}

export default DiseaseGroupActionDelete