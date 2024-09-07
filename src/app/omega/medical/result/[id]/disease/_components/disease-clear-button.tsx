'use client'

import React from 'react'
import { useSelect } from '../_context/select.context'
import { Button, rem } from '@mantine/core';
import { IconDeselect } from '@tabler/icons-react';

const DiseaseClearButton: React.FC = () => {

    const { clear } = useSelect();

    return (
        <Button
            onClick={clear}
            variant='light'
            fullWidth
            mb={rem(8)}
            size='xs'
            leftSection={(
                <IconDeselect style={{ width: rem(16), height: rem(16) }} />
            )}>
            Quitar seleccion
        </Button>
    )
}

export default DiseaseClearButton