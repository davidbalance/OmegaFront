import { Box } from '@mantine/core'
import React from 'react'

import classes from './omega-shell.module.css'

interface OmegaShellMainProps {
    children: React.ReactNode
}
const OmegaShellMain: React.FC<OmegaShellMainProps> = ({ children }) => {
    return (
        <Box className={classes.shellMainRoot}>
            {children}
        </Box>
    )
}

export default OmegaShellMain