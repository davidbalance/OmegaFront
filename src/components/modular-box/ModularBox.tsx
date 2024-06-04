import { Box, Flex } from '@mantine/core'
import React from 'react'
import classes from './ModularBox.module.css'

const ModularBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box h='100%'>
            <Flex className={classes.box} direction='column'>
                {children}
            </Flex>
        </Box>
    )
}

export { ModularBox }