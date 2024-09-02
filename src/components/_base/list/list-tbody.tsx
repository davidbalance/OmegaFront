import { Flex, rem, ScrollArea, Stack } from '@mantine/core'
import React from 'react'

interface ListTbodyProps {
    children: React.ReactNode;
    height?: number;
}
const ListTbody: React.FC<ListTbodyProps> = ({
    height = 350,
    children
}) => {
    return (
        <ScrollArea h={height} px={rem(8)}>
            <Stack gap={rem(8)} h='100%'>
                {children}
            </Stack>
        </ScrollArea>
    )
}

export default ListTbody