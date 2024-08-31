import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { Box, rem, Skeleton } from '@mantine/core'
import React from 'react'

const OmegaLoading = () => {
    return (
        <>
            <ModularBox>
                <Skeleton w='100%' h={rem(30)} />
            </ModularBox>
            <ModularLayout direction='row' h='100%'>
                <ModularBox>
                    <Skeleton w='100%' h='100%' />
                </ModularBox>
                <ModularBox>
                    <Skeleton w='100%' h='100%' />
                </ModularBox>
            </ModularLayout>
            <ModularLayout direction='row' h='auto'>
                <ModularBox>
                    <Skeleton w='100%' h={rem(30)} />
                </ModularBox>
                <ModularBox>
                    <Skeleton w='100%' h={rem(30)} />
                </ModularBox>
            </ModularLayout>
            <ModularBox>
                <Skeleton w='100%' h={rem(30)} />
            </ModularBox>
        </>
    )
}

export default OmegaLoading