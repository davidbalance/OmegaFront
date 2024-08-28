'use client'

import React from 'react'
import { useOmegaShell } from './omega-shell.context'
import { Burger } from '@mantine/core';

const OmegaShellBurger = () => {

    const { opened, locked, toggle } = useOmegaShell();

    return (
        <Burger
            opened={opened}
            onClick={!locked ? toggle : undefined}
            size='sm'
            color='orange' />
    )
}

export default OmegaShellBurger