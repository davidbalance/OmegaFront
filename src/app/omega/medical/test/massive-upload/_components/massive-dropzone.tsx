'use client'

import Dropzone from '@/components/_base/dropzone/dropzone'
import { Flex, LoadingOverlay } from '@mantine/core'
import { MIME_TYPES } from '@mantine/dropzone'
import React from 'react'
import { useMassiveUpload } from '../_context/massive-upload.context'

const MassiveDropzone: React.FC = () => {

    const { onUpload } = useMassiveUpload()

    return (
        <>
            <LoadingOverlay visible={false} />
            <Flex justify='center'>
                <Dropzone
                    labels={{
                        helper: <>Arrastra y suelta el archivo para cargar. Se aceptan archivos <i>.xlsx</i>.</>,
                        accept: "Suelta un archivo",
                        idle: "Subir un archivo",
                        reject: "Archivos menores a 20mb",
                        button: "Seleccionar archivo"
                    }}
                    multiple={true}
                    maxSize={20 * 1024 ** 2}
                    accept={[MIME_TYPES.pdf]}
                    onDrop={onUpload} />
            </Flex>
        </>
    )
}

export default MassiveDropzone