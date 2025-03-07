import { rem, Text } from '@mantine/core';
import Image from 'next/image';
import React from 'react'

interface BlobPreviewProps {
    buffer: ArrayBuffer;
    fileType: string;
}

const BlobPreview: React.FC<BlobPreviewProps> = async ({
    buffer,
    fileType
}) => {

    const base64 = Buffer.from(buffer).toString('base64');
    const src = `data:${fileType};base64,${base64}`;

    switch (true) {
        case fileType.startsWith('image/'):
            return <Image
                width={0}
                height={0}
                src={src}
                alt="Blob preview"
                style={{ width: '100%', height: 'auto' }} />;
        case fileType === 'application/pdf':
            return <iframe
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    minHeight: rem(500),
                    border: 0
                }} />;
        default:
            return <Text>Archivo no soportado</Text>
    }
}

export default BlobPreview