import { RecordAuthor } from '@/server/record/create-record/_base'
import React from 'react'
import PreviewRecordElement from './preview-record-element'
import PreviewRecordContent from './preview-record-content'
import { rem, Stack } from '@mantine/core'
import PreviewRecordWrapper from './preview-record-wrapper'

type PreviewRecordProfessionalDataProps = RecordAuthor
const PreviewRecordProfessionalData: React.FC<PreviewRecordProfessionalDataProps> = ({
    authorFullname,
    authorDni
}) => {
    return (!!authorFullname && !!authorDni) &&
        <PreviewRecordWrapper title='Datos del profesional'>
            <PreviewRecordContent>
                <Stack gap={rem(16)}>
                    <PreviewRecordElement title='Nombre del profesional' text={authorFullname} />
                    <PreviewRecordElement title='Cédula del profesional' text={authorFullname} />
                </Stack>
            </PreviewRecordContent>
        </PreviewRecordWrapper>
}

export default PreviewRecordProfessionalData