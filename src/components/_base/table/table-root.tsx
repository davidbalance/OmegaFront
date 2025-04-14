import React from 'react'
import Table from './table'
import { TableProvider } from './table.context'

type TableRootProps = {
    children: React.ReactNode
}
const TableRoot: React.FC<TableRootProps> = ({ children }) => {

    return (
        <TableProvider>
            <Table>
                {children}
            </Table>
        </TableProvider>
    )
}

export default TableRoot;