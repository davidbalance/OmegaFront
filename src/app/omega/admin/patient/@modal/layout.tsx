import ParallelModal from '@/components/_base/parallel-modal'
import React from 'react'

interface PatientModalLayoutProps {
    children: React.ReactNode
}
const PatientModalLayout: React.FC<PatientModalLayoutProps> = ({ children }) => {
    return (
        <ParallelModal>
            {children}
        </ParallelModal>
    )
}

export default PatientModalLayout