import { Table, TableTdProps } from '@mantine/core'
import React from 'react'
import classes from './OmegaTd.module.css'

type OmegaTdProps = TableTdProps;
const OmegaTd: React.FC<OmegaTdProps> = ({ ...props }) => {
    return (
        <Table.Td
            className={classes.row}
            {...props} />
    )
}

export { OmegaTd }