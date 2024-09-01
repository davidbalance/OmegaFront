import { TableTbody, TableTr, TableTd, Skeleton, rem } from '@mantine/core';
import React from 'react'

const DoctorTableSuspense: React.FC = () => {
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

export default DoctorTableSuspense