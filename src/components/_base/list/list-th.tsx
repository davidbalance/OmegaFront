import { Box } from '@mantine/core'
import React from 'react'
import classes from './list.module.css'

interface ListThProps {
    children: React.ReactNode
}
const ListTh: React.FC<ListThProps> = ({ children }) => {
    return (
        <Box className={classes.th}>
            {children}
        </Box>
    )
}

export default ListTh