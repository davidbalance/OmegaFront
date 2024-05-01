import OmegaDropzone from '@/components/dropzone/omega-dropzone/OmegaDropzone'
import { useDoctor } from '@/hooks'
import { LoadingOverlay, Group, rem, ActionIcon, Box, Text, SimpleGrid, Modal, Button } from '@mantine/core'
import { MIME_TYPES } from '@mantine/dropzone'
import { IconDeviceFloppy, IconForbid, IconX } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { Doctor } from '@/services/api/doctor/dtos'

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
            <Group w='100%' justify='flex-end' mb={rem(6)}>
                <ActionIcon variant='transparent' onClick={onClose}>
                    <IconX />
                </ActionIcon>
            </Group>
            <Group justify='center' style={{ overflow: 'hidden' }}>
                <Box miw={rem(800)} pt={rem(32)} px='lg'>
                    <Box mb={rem(12)}>
                        <Text
                            tt="uppercase"
                            fw={500}
                            component='span'
                            variant='text'
                            c="omegaColors"
                            size='md'>
                            Carga de firma
                        </Text>
                    </Box>
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
                        {/* {(file || filename) && <Group justify='center'>
                            <Grid gutter='xl' className={classes["file-record"]}>
                                <Grid.Col span={2} className={classes["record-box"]}>
                                </Grid.Col>
                                <Grid.Col span={8} className={classes["record-box"]}>
                                    <Text ta='center' size='sm' truncate="start">{filename}</Text>
                                </Grid.Col>
                                <Grid.Col span={2} className={classes["record-box"]}>
                                    <ActionIcon variant='transparent' onClick={clearFile}>
                                        <IconX />
                                    </ActionIcon>
                                </Grid.Col>
                            </Grid>
                        </Group>} */}
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
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={1.5} />}>Cancelar</Button>
                    <Button
                        onClick={handleUpload}
                        leftSection={
                            <IconDeviceFloppy
                                style={{ width: rem(18), height: rem(18) }}
                                stroke={2} />}>Aceptar</Button>
                </Group>
            </Modal>
        </>
    )
}

export { DoctorSignatureUpload }