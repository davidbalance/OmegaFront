'use client'

import React from 'react'
import { useMassiveUpload } from '../_context/massive-upload.context'
import { IconUpload } from '@tabler/icons-react'
import { Button } from '@mantine/core'

const UploadButton = () => {
    const { onSubmit, isUploading } = useMassiveUpload()

    return (
        <Button size='xs'
            loading={isUploading}
            onClick={onSubmit}>
            <IconUpload />
            Cargar Archivos
        </Button>
    )
}

export default UploadButton