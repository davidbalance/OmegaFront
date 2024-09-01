import { LoadingOverlay, rem, Flex } from '@mantine/core'
import { MIME_TYPES } from '@mantine/dropzone'
import React, { useCallback, useEffect, useState } from 'react'
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle'
import { useConfirmation } from '@/contexts/confirmation/confirmation.context'
import { useFetch } from '@/hooks/useFetch'
import { notifications } from '@mantine/notifications'
import { ModularBox } from '@/components/modular/box/ModularBox'
import Dropzone from '@/components/dropzone/dropzone'

type DoctorFormUploadSignatureProps = {
    /**
     * Identificador unico del medico.
     */
    doctor: number;
    /**
     * Funcion que es invocada cuando se llama al evento de cierre.
     * @returns 
     */
    onClose: () => void;
    /**
     * Funcion que es invocada cuando se envia el formulario.
     * @returns 
     */
    onFormSubmittion?: (id: number) => void;
}
const DoctorFormUploadSignature: React.FC<DoctorFormUploadSignatureProps> = ({ doctor, onClose, onFormSubmittion }) => {
    const [shouldFetch, setShouldFetch] = useState(false);

    const {
        data,
        body,
        error,
        loading,
        reload,
        request,
        reset
    } = useFetch(`/api/doctors/signature/${doctor}`, 'POST', {
        loadOnMount: false,
        application: 'form'
    });

    const { show } = useConfirmation();

    const handleFileUpload = useCallback(async (files: File[]) => {
        if (files.length > 0) {
            const currentFile = files[0];
            const state = await show('Carga de archivo', `El siguiente archivo ${currentFile.name} sera cargado, ¿Está seguro?`);
            if (state) {
                const form = new FormData();
                form.append('signature', currentFile);
                request<FormData>(form);
                setShouldFetch(true);
            }
        }
    }, [show, request]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    useEffect(() => {
        if (body && shouldFetch) {
            reload();
            setShouldFetch(false);
        }
    }, [body, shouldFetch, reload]);

    useEffect(() => {
        if (data) {
            onFormSubmittion?.(doctor);
            onClose();
            reset();
        }
    }, [data, doctor, reset, onFormSubmittion, onClose]);

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <Flex h='100%' direction='column' gap={rem(8)}>

                <LayoutSubFormTitle
                    title={'Carga de firma'}
                    onClose={onClose} />

                <ModularBox align='center' flex={1} justify='center'>
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
                </ModularBox>
            </Flex>
        </>
    )
}

export { DoctorFormUploadSignature }