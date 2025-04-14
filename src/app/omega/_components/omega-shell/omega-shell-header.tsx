import React from 'react'
import clsx from 'clsx'
import { Box } from '@mantine/core'

import classes from './omega-shell.module.css';

interface OmegaShellHeader {
    children: React.ReactNode
}

const OmegaShellHeader: React.FC<OmegaShellHeader> = ({ children }) => {
    return (
        <Box
            component='header'
            className={clsx(classes.shellHeaderRoot, classes.shellHeaderContainer, classes.shellModule)}>
            {children}
        </Box>
    )
}

export default OmegaShellHeader