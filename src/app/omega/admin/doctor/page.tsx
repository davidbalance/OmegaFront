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
import { retriveDoctors } from './_actions/doctor.actions'
import DoctorTable from './_components/doctor-table'

interface DoctorPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

const DoctorPage: React.FC<DoctorPageProps> = ({ searchParams }) => {

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const doctorPromise = retriveDoctors();

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
                                <OrderableButton field='dni' order={order}>
                                    <Text>Cedula</Text>
                                </OrderableButton>
                            </TableTh>
                            <TableTh>
                                <OrderableButton field='name' order={order}>
                                    <Text>Nombre</Text>
                                </OrderableButton>
                            </TableTh>
                            <TableTh>
                                <OrderableButton field='lastname' order={order}>
                                    <Text>Apellido</Text>
                                </OrderableButton>
                            </TableTh>
                            <TableTh>
                                <OrderableButton field='email' order={order}>
                                    <Text>Correo Electronico</Text>
                                </OrderableButton>
                            </TableTh>
                            <TableTh>
                                <Text>Accion</Text>
                            </TableTh>
                        </TableTr>
                    </TableTHead>
                    <Suspense fallback={<DoctorTableSuspense />}>
                        <Await promise={doctorPromise}>
                            {(doctors) => (
                                <DoctorTable
                                    doctors={doctors} />
                            )}
                        </Await>
                    </Suspense>
                </TableRoot>
            </ModularBox>
        </>
    )
}

export default DoctorPage