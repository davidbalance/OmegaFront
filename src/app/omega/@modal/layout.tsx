import ParallelModal from '@/components/_base/parallel-modal';
import React from 'react'

interface ModalMedicalReportFileViewLayoutProps {
    children: React.ReactNode
}
const ModalMedicalReportFileViewLayout: React.FC<ModalMedicalReportFileViewLayoutProps> = async ({ children }) => {

    return (
        <ParallelModal>
            {children}
        </ParallelModal>)
}

export default ModalMedicalReportFileViewLayout