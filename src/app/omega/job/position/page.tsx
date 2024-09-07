import ActionMenu from '@/components/_base/action-menu';
import Await from '@/components/_base/await';
import OrderableButton from '@/components/_base/orderable-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';
import TableBodySuspense from '@/components/_base/table/table-body.suspense';
import TableRoot from '@/components/_base/table/table-root';
import TableTh from '@/components/_base/table/table-th';
import TableTHead from '@/components/_base/table/table-thead';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { countJobPosition, searchJobPosition } from '@/server/job-position.actions';
import { Box, Button, Flex, rem, TableTbody, TableTd, TableTr, Text, Title } from '@mantine/core';
import React, { Suspense } from 'react'

const take: number = 100;
interface OmegaJobPositionPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaJobPositionPage: React.FC<OmegaJobPositionPageProps> = ({
    searchParams
}) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const jobpositionPromise = searchJobPosition({ search: search, field: field, page: page - 1, take: take, order: order as any });
    const pagePromise = countJobPosition({ search: search, take: take });

    return (
        <>
            <ModularBox>
                <Box style={{ flexShrink: 0 }}>
                    <Title order={4} component='span'>Puestos de trabajo</Title>
                </Box>
            </ModularBox>
            <ModularBox>
                <Search value={search} />
            </ModularBox>
            <ModularBox h='100%'>
                <TableRoot>
                    <TableTHead>
                        <TableTr>
                            <TableTh>
                                <OrderableButton
                                    field='name'>
                                    <Text>Puesto de trabajo</Text>
                                </OrderableButton>
                            </TableTh>
                        </TableTr>
                    </TableTHead>
                    <Suspense fallback={<TableBodySuspense columns={1} rows={10} />}>
                        <Await promise={jobpositionPromise}>
                            {(positions) => (
                                <TableTbody>
                                    {positions.map(e => (
                                        <TableTr key={e.id}>
                                            <TableTd>{e.name}</TableTd>
                                        </TableTr>
                                    ))}
                                </TableTbody>
                            )}
                        </Await>
                    </Suspense>
                </TableRoot>
            </ModularBox>
            <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                <Await promise={pagePromise}>
                    {(pages) => (
                        <>{pages > 1 && (
                            <ModularBox>
                                <ServerPagination
                                    page={page}
                                    total={pages} />
                            </ModularBox>)}</>
                    )}
                </Await>
            </Suspense>
        </>
    )
}

export default OmegaJobPositionPage