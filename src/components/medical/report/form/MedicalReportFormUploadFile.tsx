import OmegaDropzone from '@/components/dropzone/OmegaDropzone';
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch';
import { LoadingOverlay, Flex, rem } from '@mantine/core';
import { MIME_TYPES } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useState } from 'react'

type MedicalReportFormUploadFileProps = {
    /**
     * Identificador unico del resultado medico.
     */
    medicalReport: number;
    /**
     * Funcion que es invocada cuando se cierra el formulario.
     * @returns 
     */
    onClose: () => void;
    /**
     * Funcion que es invocada cuando el formulario es enviado.
     * @returns 
     */
    onFormSubmittion?: () => void;
}
const MedicalReportFormUploadFile: React.FC<MedicalReportFormUploadFileProps> = ({ medicalReport, onClose, onFormSubmittion }) => {
    const [shouldFetch, setShouldFetch] = useState(false);

    const {
        data,
        body,
        error,
        loading,
        reload,
        request,
        reset
    } = useFetch(`/api/medical/report/file/${medicalReport}`, 'PATCH', {
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
                form.append('file', currentFile);
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
            onFormSubmittion?.();
            onClose();
            reset();
        }
    }, [data, reset, onFormSubmittion, onClose]);

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <Flex h='100%' direction='column' gap={rem(8)}>

                <LayoutSubFormTitle
                    title={'Carga de archivo'}
                    onClose={onClose} />

                <ModularBox align='center' flex={1} justify='center'>
                    <OmegaDropzone
                        labels={{
                            helper: <>Arrastra y suelta pdf para cargar. Se aceptan archivos <i>.pdf</i> que pesan menos de 5mb.</>,
                            accept: "Suelta un pdf",
                            idle: "Subir un pdf",
                            reject: "Imagenes menores a 5mb",
                            button: "Seleccionar pdf"
                        }}
                        maxFiles={1}
                        multiple={false}
                        maxSize={5 * 1024 ** 2}
                        accept={[MIME_TYPES.pdf]}
                        onDrop={handleFileUpload} />
                </ModularBox>
            </Flex>
        </>
    )
}

export { MedicalReportFormUploadFile }