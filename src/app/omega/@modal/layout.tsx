import ParallelModal from '@/components/_base/parallel-modal';
import React from 'react'

interface OmegaModalSlotLayoutProps {
    children: React.ReactNode
}
const OmegaModalSlotLayout: React.FC<OmegaModalSlotLayoutProps> = async ({ children }) => {

    return (
        <ParallelModal>
            {children}
        </ParallelModal>)
}

export default OmegaModalSlotLayout