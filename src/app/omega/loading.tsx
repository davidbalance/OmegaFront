import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { rem, Skeleton } from '@mantine/core'
import React from 'react'

const OmegaLoading = () => {
    return (
        <>
            <ModularBox direction='row' gap={rem(16)}>
                <Skeleton h={rem(32)} w={rem(32)} circle />
                <Skeleton w={rem(64)} h={rem(32)} />
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
                    <Skeleton w='100%' h={rem(32)} />
                </ModularBox>
                <ModularBox>
                    <Skeleton w='100%' h={rem(32)} />
                </ModularBox>
            </ModularLayout>
            <ModularBox>
                <Skeleton w='100%' h={rem(32)} />
            </ModularBox>
        </>
    )
}

export default OmegaLoading