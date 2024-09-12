import React from 'react'
import { LoadingOverlay as MantineOverlay } from '@mantine/core';

interface LoadingOverlayProps {
    visible: boolean
}
const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
    return (
        <MantineOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }} />
    )
}

export default LoadingOverlay