import { Box, Flex, rem } from '@mantine/core';
import React from 'react'
import clsx from 'clsx'
import classes from './multiple-layer.module.css'

interface MultipleLayerRootProps {
    children: React.ReactNode
}
const MultipleLayerRoot: React.FC<MultipleLayerRootProps> = ({ children }) => {

    if (React.Children.count(children) > 3) throw new Error('Only are accepted 3 childs');

    return (
        <Flex
            h='100%'
            gap={rem(8)}
            className={classes.root}>
            {children}
        </Flex>
    )
}

export default MultipleLayerRoot