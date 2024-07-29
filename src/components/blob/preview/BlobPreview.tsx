import { Box, Flex, Image, Loader, Modal, ModalProps, rem, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useMemo, useState } from 'react'
import NextImage from 'next/image';

interface BlobPreviewProps extends ModalProps {
    blob: Blob | null
}

const BlobPreview: React.FC<BlobPreviewProps> = ({ blob, ...modal }) => {
    const [fileUrl, setFileUrl] = useState<string>('');
    const [fileType, setFileType] = useState<string>('');

    const isMobile = useMediaQuery('(max-width: 50em)');

    useEffect(() => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            setFileUrl(url);
            setFileType(blob.type);

            return () => {
                URL.revokeObjectURL(url);
            }
        }
    }, [blob]);

    const content = useMemo(() => {
        if (!blob) {
            return <Loader type='dots' />
        }
        switch (true) {
            case fileType.startsWith('image/'):
                return <Image
                    h='500px'
                    w="100%"
                    fit="contain"
                    src={fileUrl}
                    alt="Blob preview"
                    style={{ width: '100%', height: 'auto' }} />;
            case fileType === 'application/pdf':
                return <iframe src={fileUrl} style={{ width: '100%', height: '100%', minHeight: rem(500), border: 0 }} />;
            default:
                return <Text>Archivo con soportado</Text>
        }
    }, [blob, fileType, fileUrl]);

    return (
        <Modal.Root
            fullScreen={isMobile}
            closeOnEscape={false}
            centered
            transitionProps={{ transition: 'fade', duration: 200 }}
            size='xl'
            {...modal}>
            <Modal.Overlay backgroundOpacity={0.55} blur={3} />
            <Modal.Content>
                <Flex direction='column' h='100%'>
                    <Modal.Header mih={rem(25)} py={rem(5)}>
                        <Modal.CloseButton size='sm' />
                    </Modal.Header>
                    <Modal.Body flex={1} px={0} py={isMobile ? rem(5) : 0}>
                        {content}
                    </Modal.Body>
                </Flex>
            </Modal.Content>
        </Modal.Root >
    )
}

export default BlobPreview