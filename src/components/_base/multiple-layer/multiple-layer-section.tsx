import { Box } from '@mantine/core'
import React from 'react'
import clsx from 'clsx'
import classes from './multiple-layer.module.css'

interface MultipleLayerSectionProps {
    active?: boolean;
    children: React.ReactNode
}
const MultipleLayerSection: React.FC<MultipleLayerSectionProps> = ({
    active,
    children
}) => {
    return (
        <Box
            w='100%'
            h='100%'
            component='div'
            className={clsx(classes.layerSection, { [classes.layerShow]: active })}>
            {children}
        </Box>
    )
}

export default MultipleLayerSection