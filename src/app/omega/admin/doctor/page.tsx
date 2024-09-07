import Await from '@/components/_base/await'
import OrderableButton from '@/components/_base/orderable-button'
import Search from '@/components/_base/search'
import TableRoot from '@/components/_base/table/table-root'
import TableTHead from '@/components/_base/table/table-thead'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, TableTr, Text, Title } from '@mantine/core'
import React, { Suspense } from 'react'
import TableTh from '@/components/_base/table/table-th'
import DoctorTableSuspense from './_components/doctor-table.suspense'
import DoctorTable from './_components/doctor-table'
import { searchDoctors, countDoctors } from './_actions/doctor.actions'
import ServerPagination from '@/components/_base/server-pagination'
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense'
import TableBodySuspense from '@/components/_base/table/table-body.suspense'

const take: number = 100;
interface DoctorPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const DoctorPage: React.FC<DoctorPageProps> = ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const doctorPromise = searchDoctors({ search: search, field: field, page: page - 1, take: take, order: order as any });
    const pagePromise = countDoctors({ search: search, take: take });

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
                    <TableTHead>
                        <TableTr>
                            <TableTh>
                                <OrderableButton field='dni'>
                                    <Text>Cedula</Text>
                                </OrderableButton>
                            </TableTh>
                            <TableTh>
                                <OrderableButton field='name'>
                                    <Text>Nombre</Text>
                                </OrderableButton>
                            </TableTh>
                            <TableTh>
                                <OrderableButton field='lastname'>
                                    <Text>Apellido</Text>
                                </OrderableButton>
                            </TableTh>
                            <TableTh>
                                <OrderableButton field='email'>
                                    <Text>Correo Electronico</Text>
                                </OrderableButton>
                            </TableTh>
                            <TableTh>
                                <Text>Accion</Text>
                            </TableTh>
                        </TableTr>
                    </TableTHead>
                    <Suspense fallback={<TableBodySuspense columns={4} rows={10} action />}>
                        <Await promise={doctorPromise}>
                            {(doctors) => (
                                <DoctorTable
                                    doctors={doctors} />
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

export default DoctorPage