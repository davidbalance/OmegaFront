import { TableTh as MantineTh } from '@mantine/core';
import React from 'react'

import classes from './table.module.css'

interface TableThProps {
    children: React.ReactNode
}

const TableTh: React.FC<TableThProps> = ({ children }) => {

    return (
        <MantineTh
            className={classes.th}>
            {children}
        </MantineTh>
    )
}

export default TableTh