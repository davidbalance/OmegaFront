'use client'

import React from 'react'
import { ActionIcon, Flex } from '@mantine/core'
import { IconLock } from '@tabler/icons-react'
import { useOmegaShell } from './omega-shell.context'
import classes from './omega-shell.module.css'

const OmegaShellLock: React.FC = () => {

    const { lock, locked } = useOmegaShell();

    return (
        <Flex
            justify='center'
            className={classes.shellNavbarButton}>
            <ActionIcon variant={locked ? 'filled' : 'transparent'} onClick={lock}>
                <IconLock />
            </ActionIcon>
        </Flex>
    )
}

export default OmegaShellLock