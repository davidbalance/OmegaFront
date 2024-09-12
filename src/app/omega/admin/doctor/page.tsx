import React, { Suspense } from 'react'
import TableRoot from '@/components/_base/table/table-root'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Title } from '@mantine/core'
import DoctorBody from './_components/doctor-body'
import ServerPagination from '@/components/_base/server-pagination'
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense'
import TableBodySuspense from '@/components/_base/table/table-body.suspense'
import DoctorHeader from './_components/doctor-header'
import Await from '@/components/_base/await'
import { searchDoctor, countDoctor } from '@/server/doctor.actions'
import Search from '@/components/_base/search'

export const dynamic = 'force-dynamic'
const take: number = 100;
interface DoctorPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const DoctorPage: React.FC<DoctorPageProps> = ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const doctorPromise = searchDoctor({ search: search, field: field, page: page - 1, take: take, order: order as any });
    const pagePromise = countDoctor({ search: search, take: take });

    return (
        <>
            <ModularBox>
                <Box style={{ flexShrink: 0 }}>
                    <Title order={4} component='span'>Medicos</Title>
                </Box>
            </ModularBox>
            <ModularBox>
                <Search value={search} />
            </ModularBox>
            <ModularBox h='100%'>
                <TableRoot>
                    <DoctorHeader />
                    <Suspense fallback={<TableBodySuspense columns={4} rows={10} action />}>
                        <Await promise={doctorPromise}>
                            {(doctors) => <DoctorBody doctors={doctors} />}
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

export default DoctorPage