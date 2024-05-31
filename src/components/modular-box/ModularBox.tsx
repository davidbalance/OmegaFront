import { Box, BoxProps, Flex } from '@mantine/core'
import React from 'react'
import classes from './ModularBox.module.css'

const ModularBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Flex className={classes.box} direction='column'>
            {children}
        </Flex>
    )
}

export { ModularBox }