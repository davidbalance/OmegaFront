import { rem, ScrollArea, Stack, StyleProp } from '@mantine/core'
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
        <ScrollArea h={height} px={rem(8)}>
            <Stack gap={rem(8)} h='100%' mb={rem(8)}>
                {children}
            </Stack>
        </ScrollArea>
    )
}

export default ListTbody