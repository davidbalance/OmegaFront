import React from 'react'

import { rem, Skeleton, TableTbody, TableTd, TableTr } from '@mantine/core'

const UserTableSuspense: React.FC = () => {
    return (
        <TableTbody>
            {[...Array(10)].map(e => (
                <TableTr key={Math.random()}>
                    <TableTd><Skeleton width={rem(80)} height={rem(15)} /></TableTd>
                    <TableTd><Skeleton width={rem(80)} height={rem(15)} /></TableTd>
                    <TableTd><Skeleton width={rem(80)} height={rem(15)} /></TableTd>
                    <TableTd><Skeleton width={rem(80)} height={rem(15)} /></TableTd>
                    <TableTd><Skeleton circle height={rem(15)} /></TableTd>
                </TableTr>
            ))}
        </TableTbody>
    )
}

export default UserTableSuspense