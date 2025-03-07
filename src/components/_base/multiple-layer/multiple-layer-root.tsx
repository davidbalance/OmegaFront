import { Flex, rem } from '@mantine/core';
import React from 'react'
import classes from './multiple-layer.module.css'

type MultipleLayerRootProps = {
    children: React.ReactNode
}
const MultipleLayerRoot: React.FC<MultipleLayerRootProps> = ({ children }) => {

    if (React.Children.count(children) > 3) throw new Error('Only are accepted 3 childs');

    return (
        <Flex
            component='div'
            h='100%'
            gap={rem(8)}
            className={classes.root}>
            {children}
        </Flex>
    )
}

export default MultipleLayerRoot