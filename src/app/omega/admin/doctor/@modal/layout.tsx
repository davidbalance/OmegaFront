import ParallelModal from '@/components/_base/parallel-modal'
import React from 'react'

interface DoctorModalLayoutProps {
    children: React.ReactNode
}
const DoctorModalLayout: React.FC<DoctorModalLayoutProps> = ({ children }) => {
    return (
        <ParallelModal>
            {children}
        </ParallelModal>
    )
}

export default DoctorModalLayout