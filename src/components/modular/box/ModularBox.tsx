import { Box, BoxProps } from '@mantine/core'
import React from 'react'
import classes from './ModularBox.module.css'

type ModularBoxProps = BoxProps & {
    children: React.ReactNode
};

const ModularBox: React.FC<ModularBoxProps> = ({ children, ...props }) => {
    return (
        <Box
            className={classes.box}
            {...props}>
            {children}
        </Box>
    )
}

export { ModularBox }