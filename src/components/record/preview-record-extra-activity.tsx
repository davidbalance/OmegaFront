import { ExtraActivity } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'

type PreviewRecordExtraActivityProps = ExtraActivity
const PreviewRecordExtraActivity: React.FC<PreviewRecordExtraActivityProps> = ({
    extraActivityDescription
}) => {
    return (
        <PreviewRecordContent>
            <PreviewRecordElement title='Descripcion' text={extraActivityDescription ?? 'NINGÚNA'} />
        </PreviewRecordContent>
    )
}

export default PreviewRecordExtraActivity