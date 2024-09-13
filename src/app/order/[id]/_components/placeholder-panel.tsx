'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react'

const PlaceholderPanel = () => {

    const { breakpoints } = useMantineTheme();
    const match = useMediaQuery(`(min-width: ${breakpoints.md})`);

    return (
        match ? <ModularBox flex={1}><></></ModularBox> : null
    )
}

export default PlaceholderPanel