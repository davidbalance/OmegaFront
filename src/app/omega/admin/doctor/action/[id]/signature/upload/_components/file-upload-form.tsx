'use client'

import { uploadSignature } from '@/app/omega/admin/doctor/_actions/doctor.actions'
import LoadingOverlay from '@/components/_base/loading-overlay'
import Dropzone from '@/components/dropzone/dropzone'
import { useConfirmation } from '@/contexts/confirmation/confirmation.context'
import { Flex } from '@mantine/core'
import { MIME_TYPES } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

interface FileUploadFormProps {
    id: number
}
const FileUploadForm: React.FC<FileUploadFormProps> = ({ id }) => {

    const [opened, setOpened] = useState<boolean>(false);

    const { show } = useConfirmation();

    const router = useRouter();

    const handleFileUpload = useCallback(async (files: File[]) => {

        if (files.length > 0) {
            const currentFile = files[0];
            const state = await show('Carga de archivo', `El siguiente archivo ${currentFile.name} sera cargado, ¿Está seguro?`);
            if (state) {
                setOpened(true);
                const form = new FormData();
                form.append('signature', currentFile);
                try {
                    await uploadSignature(id, form);
                    router.back();
                } catch (error: any) {
                    notifications.show({ message: error.message, color: 'red' });
                } finally {
                    setOpened(false);
                }
            }
        }
    }, [id, show]);

    return (
        <>
            <LoadingOverlay visible={opened} />
            <Flex justify='center'>
                <Dropzone
                    labels={{
                        helper: <>Arrastra y suelta imagenes para cargar. Se aceptan imagenes <i>.png</i> que pesan menos de 5mb.</>,
                        accept: "Suelta una firma",
                        idle: "Subir una firma",
                        reject: "Imagenes menores a 5mb",
                        button: "Seleccionar firma"
                    }}
                    maxFiles={1}
                    multiple={false}
                    maxSize={5 * 1024 ** 2}
                    accept={[MIME_TYPES.png]}
                    onDrop={handleFileUpload} />
            </Flex>
        </>
    )
}

export default FileUploadForm