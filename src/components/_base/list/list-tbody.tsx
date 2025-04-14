import { Box, rem, ScrollArea, Stack, StyleProp } from '@mantine/core'
import React from 'react'

interface ListTbodyProps {
    children: React.ReactNode;
    height?: StyleProp<string | number>;
}
const ListTbody: React.FC<ListTbodyProps> = ({
    height = { base: 350, md: 350 },
    children
}) => {
    return (
        <Box
            flex={1}
            component='div'
            pos='relative'>
            <ScrollArea
                px={rem(8)}
                component='div'
                style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
                <Stack gap={rem(8)} component='div'>
                    {children}
                </Stack>
            </ScrollArea>
        </Box>
    )
}

export default ListTbody