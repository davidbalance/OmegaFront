'use client'

import React from 'react'
import clsx from 'clsx'
import { Box } from '@mantine/core'

import classes from './omega-shell.module.css'
import { useOmegaShell } from './omega-shell.context'

interface OmegaShellNavbarProps {
    children: React.ReactNode
}
const OmegaShellNavbar: React.FC<OmegaShellNavbarProps> = ({ children }) => {

    const { opened } = useOmegaShell();

    return (
        <Box component='nav'
            className={clsx(classes.shellNavbarRoot, classes.shellBodyContainer, classes.shellModule, { [classes.closed]: !opened })}>
            {children}
        </Box>
    )
}

export default OmegaShellNavbar