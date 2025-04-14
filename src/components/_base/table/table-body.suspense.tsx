import { TableTbody, TableTr, TableTd, Skeleton, rem } from '@mantine/core';
import React from 'react'

interface TableBodySuspenseProps {
    columns: number;
    rows: number;
    action?: boolean;
}
const TableBodySuspense: React.FC<TableBodySuspenseProps> = ({
    columns,
    rows,
    action
}) => {
    return (
        <TableTbody>
            {Array(rows).map(e => (
                <TableTr key={Math.random()}>
                    {Array(columns).map(e => (
                        <TableTd key={Math.random()}>
                            <Skeleton width={rem(80)} height={rem(15)} />
                        </TableTd>
                    ))}

                    {action && (
                        <TableTd>
                            <Skeleton circle height={rem(15)} />
                        </TableTd>
                    )}
                </TableTr>
            ))}
        </TableTbody>
    )
}

export default TableBodySuspense