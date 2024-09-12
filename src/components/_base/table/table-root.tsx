import React from 'react'
import Table from './table'
import { TableProvider } from './table.context'
import { Box } from '@mantine/core'

type TableRootProps = {
    children: React.ReactNode
}
const TableRoot: React.FC<TableRootProps> = ({ children }) => {

    return (
        <Box style={{ overflow: 'hidden' }}>
            <TableProvider>
                <Table>
                    {children}
                </Table>
            </TableProvider>
        </Box>
    )
}

export default TableRoot;