import React from 'react'
import TableRoot from '@/components/_base/table/table-root'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Title } from '@mantine/core'
import ServerPagination from '@/components/_base/server-pagination'
import DoctorHeader from './_components/doctor_header'
import Search from '@/components/_base/search'
import { retriveDoctors } from '@/server/doctor/actions'
import DoctorList from './_components/doctor_list'

const take: number = 100;
interface DoctorPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const DoctorPage: React.FC<DoctorPageProps> = async ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const doctorValue = await retriveDoctors({
        filter: search,
        limit: take,
        skip: page,
        orderField: field as any,
        orderValue: order as any
    });
    const totalDoctorPages = Math.floor(doctorValue.amount / take);

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
                    <DoctorList doctors={doctorValue.data} />
                </TableRoot>
            </ModularBox>
            {totalDoctorPages > 1 && (
                <ModularBox>
                    <ServerPagination
                        page={page}
                        total={totalDoctorPages} />
                </ModularBox>)}
        </>
    )
}

export default DoctorPage