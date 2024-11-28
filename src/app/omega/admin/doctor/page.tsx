import React from 'react'
import TableRoot from '@/components/_base/table/table-root'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Title } from '@mantine/core'
import DoctorBody from './_components/doctor-body'
import ServerPagination from '@/components/_base/server-pagination'
import DoctorHeader from './_components/doctor-header'
import { searchDoctor, countDoctor } from '@/server/doctor.actions'
import Search from '@/components/_base/search'

const take: number = 100;
interface DoctorPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const DoctorPage: React.FC<DoctorPageProps> = async ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const doctors = await searchDoctor({ search: search, field: field, page: page - 1, take: take, order: order as any });
    const pages = await countDoctor({ search: search, take: take });

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
                    <DoctorBody doctors={doctors} />
                </TableRoot>
            </ModularBox>
            {pages > 1 && (
                <ModularBox>
                    <ServerPagination
                        page={page}
                        total={pages} />
                </ModularBox>)}
        </>
    )
}

export default DoctorPage