import { Box, rem, Stack } from '@mantine/core'
import React from 'react'
import classes from './list.module.css'

interface ListRootProps {
    children: React.ReactNode
}
const ListRoot: React.FC<ListRootProps> = ({ children }) => {
    return (
        <Stack
            h='100%'
            className={classes.root}
            gap={rem(8)}
            component='div'>
            {children}
        </Stack>
    )
}

export default ListRoot