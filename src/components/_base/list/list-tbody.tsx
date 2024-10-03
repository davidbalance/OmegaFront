import { rem, ScrollArea, Stack, StyleProp } from '@mantine/core'
import React from 'react'
import ListRoot from './list-root';

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
            <ListRoot>
                {children}
            </ListRoot>
        </ScrollArea>
    )
}

export default ListTbody