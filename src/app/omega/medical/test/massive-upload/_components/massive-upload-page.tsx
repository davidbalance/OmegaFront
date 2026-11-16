import { ModularBox } from '@/components/modular/box/ModularBox'
import { MedicalTest } from '@/server/medical-test/server-types'
import { Flex, rem, Stack } from '@mantine/core'
import React from 'react'
import MassiveDropzone from './massive-dropzone'
import { MassiveUploadProvider } from '../_context/massive-upload.context'
import FileList from './file-list'
import UploadButton from './upload-button'

type MassiveUploadPage = {
    patientName: string
    tests: MedicalTest[]
}

const MassiveUploadPage: React.FC<MassiveUploadPage> = ({
    patientName,
    tests
}) => {
    return (
        <MassiveUploadProvider
            patientName={patientName}
            tests={tests}>
            <UploadButton />
            <Flex
                direction="row"
                h='100%'
                mah='100%'
                maw='100%'
                gap={rem(8)}
                pos='relative'>
                <ModularBox>
                    <FileList />
                </ModularBox>
                <ModularBox>
                    <Stack
                        h='100%'
                        align='center'
                        justify='center'
                        pos='relative'>
                        <MassiveDropzone />
                    </Stack>
                </ModularBox>
            </Flex>
        </MassiveUploadProvider>
    )
}

export default MassiveUploadPage