import { Flex, Group } from '@mantine/core'
import React from 'react'
import classes from './list.module.css'

interface ListTheadProps {
    children: React.ReactNode
}
const ListThead: React.FC<ListTheadProps> = ({ children }) => {
    return (
        <Group
            gap={0}
            grow
            className={classes.thead}>
            {children}
        </Group>
    )
}

export default ListThead