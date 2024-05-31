import { Box } from '@mantine/core'
import React from 'react'
import classes from './ModularBox.module.css'

const ModularBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box className={classes.box}>
            {children}
        </Box>
    )
}

export default ModularBox