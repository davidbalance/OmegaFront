import { Flex, FlexProps } from '@mantine/core'
import React from 'react'
import classes from './ModularBox.module.css'

type ModularBoxProps = FlexProps;

const ModularBox: React.FC<ModularBoxProps> = ({ children, ...props }) => {
    return (
        <Flex className={classes.box} direction='column' {...props}>
            {children}
        </Flex>
    )
}

export { ModularBox }