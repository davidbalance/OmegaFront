import { Box, Button, Flex, Group, rem, Text, useMantineTheme } from '@mantine/core';
import { Dropzone as MantineDropzone, DropzoneProps as MantineDropzoneProps, MIME_TYPES, DropzoneAccept, DropzoneReject, DropzoneIdle } from '@mantine/dropzone';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import React, { useRef } from 'react'
import classes from './dropzone.module.css';
import { useMediaQuery } from '@mantine/hooks';

interface DropzoneProps extends Partial<MantineDropzoneProps> {
    /**
     * Objeto que permite modificar las etiquetas del dropzone
     */
    labels?: {
        helper: React.ReactNode;
        accept: string;
        reject: string;
        idle: string;
        button: string;
    }
};
const Dropzone: React.FC<DropzoneProps> = ({
    labels = {
        helper: <>Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that are less than 30mb in size.</>,
        accept: "Drop files here",
        idle: "Upload resume",
        reject: "Pdf file less than 30mb",
        button: "Select files"
    },
    ...props
}) => {
    const theme = useMantineTheme();
    const openRef = useRef<() => void>(null);

    const matches = useMediaQuery("(min-width: 700px)");

    return (
        <Box className={classes.wrapper}>
            <Box className={classes.dropzoneContainer}>
                <MantineDropzone
                    openRef={openRef}
                    onDrop={() => { }}
                    className={classes.dropzone}
                    radius="md"
                    accept={[MIME_TYPES.pdf]}
                    maxSize={30 * 1024 ** 2}
                    {...props}>
                    <Box style={{ pointerEvents: 'none', cursor: 'pointer' }}>
                        <Group justify="center">
                            <DropzoneAccept>
                                <IconDownload
                                    style={{ width: rem(50), height: rem(50) }}
                                    color={theme.colors.blue[6]}
                                    stroke={1.5}
                                />
                            </DropzoneAccept>
                            <DropzoneReject>
                                <IconX
                                    style={{ width: rem(50), height: rem(50) }}
                                    color={theme.colors.red[4]}
                                    stroke={1.5}
                                />
                            </DropzoneReject>
                            <DropzoneIdle>
                                <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                            </DropzoneIdle>
                        </Group>

                        <Text ta="center" fw={700} fz="lg" mt="xl">
                            <DropzoneAccept>
                                {labels.accept}
                            </DropzoneAccept>
                            <DropzoneReject>
                                {labels.reject}
                            </DropzoneReject>
                            <DropzoneIdle>
                                {labels.idle}
                            </DropzoneIdle>
                        </Text>
                        <Text ta="center" fz="sm" mt="xs" c="dimmed">
                            {labels.helper}
                        </Text>
                    </Box>
                </MantineDropzone>
            </Box>

            <Box className={classes.control}>
                <Flex justify='center' align='center'>
                    <Button size={matches ? 'sm' : 'xs'} radius="xl" onClick={() => openRef.current?.()}>
                        {labels.button}
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}

export default Dropzone