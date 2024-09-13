'use client'

import React from 'react'
import clsx from 'clsx'
import { Box, Drawer, useMantineTheme } from '@mantine/core'

import classes from './omega-shell.module.css'
import { useOmegaShell } from './omega-shell.context'
import { useMediaQuery } from '@mantine/hooks'

interface OmegaShellNavbarProps {
    children: React.ReactNode
}
const OmegaShellNavbar: React.FC<OmegaShellNavbarProps> = ({ children }) => {

    const { breakpoints } = useMantineTheme();
    const { opened, toggle } = useOmegaShell();
    const match = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return (
        !match
            ? <Drawer
                component='nav'
                opened={opened}
                onClose={toggle}
                className={clsx(classes.shellNavbarRoot, classes.drawer, classes.closed)}
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                size='100%'
                closeButtonProps={{
                    size: 'sm'
                }}>
                {children}
            </Drawer>
            : <Box component='nav'
                className={clsx(classes.shellNavbarRoot, classes.shellBodyContainer, classes.shellModule, { [classes.closed]: !opened })}>
                {children}
            </Box>

    )
}

export default OmegaShellNavbar