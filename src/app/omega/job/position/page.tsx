import Await from '@/components/_base/await';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';
import TableBodySuspense from '@/components/_base/table/table-body.suspense';
import TableRoot from '@/components/_base/table/table-root';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { countJobPosition, searchJobPosition } from '@/server/job-position.actions';
import { Box, Title } from '@mantine/core';
import React, { Suspense } from 'react'
import JobPositionHeader from './_components/job-position-header';
import JobPositionBody from './_components/job-position-body';

export const dynamic = 'force-dynamic'
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
                    <JobPositionHeader />
                    <Suspense fallback={<TableBodySuspense columns={1} rows={10} />}>
                        <Await promise={jobpositionPromise}>
                            {(positions) => <JobPositionBody positions={positions} />}
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