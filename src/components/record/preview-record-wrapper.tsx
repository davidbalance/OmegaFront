import React from 'react'
import { Divider, rem, Stack } from '@mantine/core';

type PreviewRecordWrapperProps = {
    title: string;
    children: React.ReactNode;
}
const PreviewRecordWrapper: React.FC<PreviewRecordWrapperProps> = ({
    title,
    children
}) => {
    return (
        <Stack gap={rem(16)}>
            <Divider label={title} />
            {children}
        </Stack>
    )
}

export default PreviewRecordWrapper