'use client'

import React from 'react'
import { ScrollArea, Table as MantineTable } from '@mantine/core'
import { useTable } from './table.context'

import classes from './table.module.css'

type TableRootProps = {
    children: React.ReactNode
}
const Table: React.FC<TableRootProps> = ({ children }) => {
    const { setScroll } = useTable();

    return (
        <ScrollArea
            className={classes.scrollContainer}
            onScrollPositionChange={({ y }) => setScroll(y !== 0)}>
            <MantineTable
                className={classes.root}
                horizontalSpacing="md"
                verticalSpacing="xs"
                layout='auto'>
                {children}
            </MantineTable>
        </ScrollArea>
    )
}

export default Table