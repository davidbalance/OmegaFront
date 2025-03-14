'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import Dropzone from '@/components/_base/dropzone/dropzone'
import { useConfirmation } from '@/contexts/confirmation.context'
import { Flex } from '@mantine/core'
import { MIME_TYPES } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { addMedicalReportFile } from '@/server/medical_test/actions'
import { getErrorMessage } from '@/lib/utils/errors'

interface ReportUploadFormProps {
    testId: string;
}
const ReportUploadForm: React.FC<ReportUploadFormProps> = ({
    testId
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
                    await addMedicalReportFile(testId, form);
                    router.back();
                } catch (error: any) {
                    notifications.show({ message: getErrorMessage(error), color: 'red' });
                } finally {
                    setOpened(false);
                }
            }
        }
    }, [testId, router, show]);

    return (
        <>
            <LoadingOverlay visible={opened} />
            <Flex justify='center'>
                <Dropzone
                    labels={{
                        helper: <>Arrastra y suelta archivos para cargar. Se aceptan archivos <i>.pdf</i> que pesan menos de 5mb.</>,
                        accept: "Suelta un archivo",
                        idle: "Subir un archivo",
                        reject: "Archivos menores a 5mb",
                        button: "Seleccionar un archivo"
                    }}
                    maxFiles={1}
                    multiple={false}
                    maxSize={10 * 1024 ** 2}
                    accept={[MIME_TYPES.pdf]}
                    onDrop={handleFileUpload} />
            </Flex>
        </>
    )
}

export default ReportUploadForm