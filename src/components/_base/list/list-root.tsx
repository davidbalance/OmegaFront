import { Box, rem, Stack } from '@mantine/core'
import React from 'react'
import classes from './list.module.css'

interface ListRootProps {
    children: React.ReactNode
}
const ListRoot: React.FC<ListRootProps> = ({ children }) => {
    return (
        <Stack
            className={classes.root}
            gap={rem(8)}>
            {children}
        </Stack>
    )
}

export default ListRoot