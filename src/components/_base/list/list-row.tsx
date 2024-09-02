import { Box } from '@mantine/core'
import React from 'react'
import classes from './list.module.css'
import clsx from 'clsx';

interface ListRowProps {
    active?: boolean;
    hoverable?: boolean;
    children: React.ReactNode;
}
const ListRow: React.FC<ListRowProps> = ({
    active = false,
    hoverable = false,
    children
}) => {
    return (
        <Box
            className={clsx(classes.row,
                {
                    [classes.active]: active,
                    [classes.hoverable]: hoverable,
                })}>
            {children}
        </Box>
    )
}

export default ListRow