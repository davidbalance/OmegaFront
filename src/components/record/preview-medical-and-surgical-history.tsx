import { MedicalAndSurgicalHistory } from '@/server/record/create-record/base/author.schema'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content';

type PreviewRecordMedicalAndSurgicalHistoryProps = MedicalAndSurgicalHistory;
const PreviewRecordMedicalAndSurgicalHistory: React.FC<PreviewRecordMedicalAndSurgicalHistoryProps> = ({
    medicalAndSurgicalHistory
}) => {
    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='Antecedentes clínicos y quirúrgicos' text={medicalAndSurgicalHistory} />
        </PreviewRecordContent>
    )
}

export default PreviewRecordMedicalAndSurgicalHistory