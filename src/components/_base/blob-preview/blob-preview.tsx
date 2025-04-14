'use client'

import { rem, Text } from '@mantine/core';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface BlobPreviewProps {
    base64: string;
    fileType: string;
}

const BlobPreview: React.FC<BlobPreviewProps> = ({
    base64,
    fileType
}) => {

    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        if (!base64) return;

        // Convert Base64 to Blob
        const binary = atob(base64); // Decode Base64 to binary string
        const array = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([array], { type: fileType });
        const objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl); // Cleanup on unmount
    }, [base64, fileType]);

    /*     const base64 = Buffer.from(buffer).toString('base64');
    
        const src = `data:${fileType};base64,${base64}`; */

    if (fileType.startsWith('image/')) {
        return <Image
            width={0}
            height={0}
            src={url}
            alt="Blob preview"
            style={{ width: '100%', height: 'auto' }} />;
    }

    if (fileType === 'application/pdf') {
        return <iframe
            src={url}
            title="Embedded example content"
            style={{
                width: '100%',
                height: '100%',
                minHeight: rem(500),
                border: 0
            }} />;
    }

    return <Text>Archivo no soportado</Text>
}

export default BlobPreview