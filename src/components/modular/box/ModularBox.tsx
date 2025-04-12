<<<<<<< HEAD
import { Box, BoxProps } from '@mantine/core'
import React from 'react'
import classes from './ModularBox.module.css'

type ModularBoxProps = BoxProps & {
    children: React.ReactNode
};

const ModularBox: React.FC<ModularBoxProps> = ({ children, ...props }) => {
    return (
        <Box
            component='div'
            className={classes.box}
            {...props}>
            {children}
        </Box>
=======
import { Flex, FlexProps } from '@mantine/core'
import React from 'react'
import classes from './ModularBox.module.css'

type ModularBoxProps = FlexProps;

const ModularBox: React.FC<ModularBoxProps> = ({ children, ...props }) => {
    return (
        <Flex className={classes.box} direction='column' {...props}>
            {children}
        </Flex>
>>>>>>> main
    )
}

export { ModularBox }