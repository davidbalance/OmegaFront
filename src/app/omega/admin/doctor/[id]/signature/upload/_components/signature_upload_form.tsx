'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import Dropzone from '@/components/_base/dropzone/dropzone'
import { useConfirmation } from '@/contexts/confirmation.context'
import { Flex } from '@mantine/core'
import { MIME_TYPES } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { uploadDoctorSignature } from '@/server'
import { getErrorMessage } from '@/lib/utils/errors'

interface SignatureUploadFormProps {
    userId: string;
}
const SignatureUploadForm: React.FC<SignatureUploadFormProps> = ({
    userId
}) => {

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
                form.append('file', currentFile);
                try {
                    await uploadDoctorSignature(userId, form);
                    router.back();
                } catch (error: any) {
                    notifications.show({ message: getErrorMessage(error), color: 'red' });
                } finally {
                    setOpened(false);
                }
            }
        }
    }, [userId, router, show]);

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

export default SignatureUploadForm