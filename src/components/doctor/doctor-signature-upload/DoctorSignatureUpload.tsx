import OmegaDropzone from '@/components/dropzone/omega-dropzone/OmegaDropzone'
import { useDoctor } from '@/hooks'
import { LoadingOverlay, Group, rem, Box, Text, SimpleGrid, Modal, Button } from '@mantine/core'
import { MIME_TYPES } from '@mantine/dropzone'
import { IconDeviceFloppy, IconForbid } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Doctor } from '@/services/api/doctor/dtos'
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle'

type DoctorSignatureUploadProps = {
    doctor: Doctor;
    onClose: () => void;
}
const DoctorSignatureUpload: React.FC<DoctorSignatureUploadProps> = ({ doctor, onClose }) => {

    const doctorHook = useDoctor();

    const [file, setFile] = useState<File | undefined>(undefined);

    const [agreementState, AgreementDisclosure] = useDisclosure(false);

    const handleFileUpload = (files: File[]) => {
        if (files.length > 0) {
            const currentFile = files[0];
            setFile(currentFile);
            AgreementDisclosure.open();
        }
    }

    const handleUpload = () => {
        if (!file) return;
        try {
            doctorHook.uploadSignature({ id: doctor.id, file: file });
            AgreementDisclosure.close();
        } catch (error) { }
    }

    return (
        <>
            <LoadingOverlay visible={doctorHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <LayoutSubFormTitle
                title={'Carga de firma'}
                onClose={onClose} />

            <Group justify='center' style={{ overflow: 'hidden' }}>
                <Box pt={rem(32)} px='lg'>
                    <SimpleGrid cols={1}>
                        <Group justify='center'>
                            <OmegaDropzone
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
                        </Group>
                    </SimpleGrid>
                </Box>
            </Group>

            <Modal
                opened={agreementState}
                onClose={AgreementDisclosure.close}
                title="Confirmación"
                closeOnEscape={false}
                centered>
                <LoadingOverlay visible={doctorHook.loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                <Text>El siguiente archivo <b>{file?.name}</b> sera cargado, esta seguro?</Text>

                <Group mt="xl" justify='center'>
                    <Button
                        onClick={AgreementDisclosure.close}
                        variant='outline'
                        leftSection={
                            <IconForbid
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5} />}>Cancelar</Button>
                    <Button
                        onClick={handleUpload}
                        leftSection={
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={2} />}>Aceptar</Button>
                </Group>
            </Modal>
        </>
    )
}

export { DoctorSignatureUpload }