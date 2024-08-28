import { Stack, StackProps } from '@mantine/core'
import React from 'react'

interface OmegaShellSectionProps extends StackProps {
    children: React.ReactNode;
}
const OmegaShellSection: React.FC<OmegaShellSectionProps> = ({ children, ...props }) => {
    return (
        <Stack {...props}>
            {children}
        </Stack>
    )
}

export default OmegaShellSection