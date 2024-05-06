import { Box, Button, Flex, Group, rem, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import React, { useRef } from 'react'
import classes from './OmegaDropzone.module.css';
import { useMediaQuery } from '@mantine/hooks';

type OmegaDropzoneProps = Partial<DropzoneProps> & {
    labels?: {
        helper: React.ReactNode;
        accept: string;
        reject: string;
        idle: string;
        button: string;
    }
};
const OmegaDropzone: React.FC<OmegaDropzoneProps> = ({
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
        <div className={classes.wrapper}>
            <div className={classes.dropzoneContainer}>
                <Dropzone
                    openRef={openRef}
                    onDrop={() => { }}
                    className={classes.dropzone}
                    radius="md"
                    accept={[MIME_TYPES.pdf]}
                    maxSize={30 * 1024 ** 2}
                    {...props}
                >
                    <div style={{ pointerEvents: 'none', cursor: 'pointer' }}>
                        <Group justify="center">
                            <Dropzone.Accept>
                                <IconDownload
                                    style={{ width: rem(50), height: rem(50) }}
                                    color={theme.colors.blue[6]}
                                    stroke={1.5}
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX
                                    style={{ width: rem(50), height: rem(50) }}
                                    color={theme.colors.red[6]}
                                    stroke={1.5}
                                />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                            </Dropzone.Idle>
                        </Group>

                        <Text ta="center" fw={700} fz="lg" mt="xl">
                            <Dropzone.Accept>{labels.accept}</Dropzone.Accept>
                            <Dropzone.Reject>{labels.reject}</Dropzone.Reject>
                            <Dropzone.Idle>{labels.idle}</Dropzone.Idle>
                        </Text>
                        <Text ta="center" fz="sm" mt="xs" c="dimmed">
                            {labels.helper}
                        </Text>
                    </div>
                </Dropzone>
            </div>

            <Box className={classes.control}>
                <Flex justify='center' align='center'>
                    <Button size={matches ? 'sm' : 'xs'} radius="xl" onClick={() => openRef.current?.()}>
                        {labels.button}
                    </Button>
                </Flex>
            </Box>
        </div>
    );
}

export default OmegaDropzone