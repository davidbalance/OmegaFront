'use client'

import React from 'react'
import { ScrollArea, Table as MantineTable, rem, useMantineTheme } from '@mantine/core'
import { useTable } from './table.context'

import classes from './table.module.css'

type TableRootProps = {
    children: React.ReactNode
}
const Table: React.FC<TableRootProps> = ({ children }) => {
    const { setScroll } = useTable();
    const theme = useMantineTheme();

    return (
        <ScrollArea
            h={{ base: rem(350), md: rem(400), xl: rem(500) }}
            onScrollPositionChange={({ y }) => setScroll(y !== 0)}>
            <MantineTable
                className={classes.root}
                horizontalSpacing="md"
                verticalSpacing="xs"
                highlightOnHover
                highlightOnHoverColor={theme.colors['neutral'][1]}
                withRowBorders={false}>
                {children}
            </MantineTable>
        </ScrollArea>
    )
}

export default Table