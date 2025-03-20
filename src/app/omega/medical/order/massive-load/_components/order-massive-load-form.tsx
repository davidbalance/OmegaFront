'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import Dropzone from '@/components/_base/dropzone/dropzone'
import { useConfirmation } from '@/contexts/confirmation.context'
import { Flex } from '@mantine/core'
import { MIME_TYPES } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { getErrorMessage } from '@/lib/utils/errors'
import { massiveLoadOrder } from '@/server/medical_order/actions'

const OrderMassiveLoadForm: React.FC = () => {

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
                    await massiveLoadOrder(form);
                    router.back();
                } catch (error: any) {
                    notifications.show({ message: getErrorMessage(error), color: 'red' });
                } finally {
                    setOpened(false);
                }
            }
        }
    }, [router, show]);

    return (
        <>
            <LoadingOverlay visible={opened} />
            <Flex justify='center'>
                <Dropzone
                    labels={{
                        helper: <>Arrastra y suelta el archivo para cargar. Se aceptan archivos <i>.xlsx</i>.</>,
                        accept: "Suelta una archivo",
                        idle: "Subir una archivo",
                        reject: "Archivos menores a 20mb",
                        button: "Seleccionar archivo"
                    }}
                    maxFiles={1}
                    multiple={false}
                    maxSize={20 * 1024 ** 2}
                    accept={[MIME_TYPES.xlsx]}
                    onDrop={handleFileUpload} />
            </Flex>
        </>
    )
}

export default OrderMassiveLoadForm