'use client'

import { ModalContent, ModalOverlay, ModalRoot, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ParallelModalProps {
    children: React.ReactNode
}
const ParallelModal: React.FC<ParallelModalProps> = ({ children }) => {

    const { breakpoints } = useMantineTheme();
    const isMobile = useMediaQuery(`min-width: ${breakpoints.md}`);
    const router = useRouter();

    return (
        <ModalRoot
            opened={true}
            fullScreen={isMobile}
            closeOnEscape={false}
            centered
            transitionProps={{ transition: 'fade', duration: 200 }}
            onClose={router.back}
            size='xl'>
            <ModalOverlay backgroundOpacity={0.55} blur={3} />
            <ModalContent style={{ overflow: 'hidden' }}>
                {children}
            </ModalContent>
        </ModalRoot>
    )
}

export default ParallelModal