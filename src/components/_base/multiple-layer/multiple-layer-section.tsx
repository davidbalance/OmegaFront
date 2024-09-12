'use client'

import { Box, useMantineTheme } from '@mantine/core'
import React from 'react'
import clsx from 'clsx'
import classes from './multiple-layer.module.css'
import { useMediaQuery } from '@mantine/hooks';

interface MultipleLayerSectionProps {
    active?: boolean;
    children: React.ReactNode
}
const MultipleLayerSection: React.FC<MultipleLayerSectionProps> = ({
    active,
    children
}) => {

    const { breakpoints } = useMantineTheme();
    const isMobile = useMediaQuery(`min-width: ${breakpoints.md}`);

    return (
        <Box
            w='100%'
            h='100%'
            component='section'
            className={clsx(classes.layerSection, { [classes.layerShow]: active })}>
            {children}
        </Box>
    )
}

export default MultipleLayerSection