import { MedicalConsultation } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'

type PreviewRecordMedicalConsultationProps = MedicalConsultation
const PreviewRecordMedicalConsultation: React.FC<PreviewRecordMedicalConsultationProps> = ({
    medicalConsultationDescription
}) => {
    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='Descripción' text={medicalConsultationDescription} />
        </PreviewRecordContent>
    )
}

export default PreviewRecordMedicalConsultation