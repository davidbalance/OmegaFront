import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import TableRoot from '@/components/_base/table/table-root';
import { ModularBox } from '@/components/modular/box/ModularBox';
import React from 'react'
import JobPositionHeader from './_components/job_position_header';
import { retriveJobPositions } from '@/server/job_position/actions';
import Title from '@/components/_base/mantine/title';
import JobPositionList from './_components/job_position_list';

const take: number = 100;
interface OmegaJobPositionPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaJobPositionPage: React.FC<OmegaJobPositionPageProps> = async ({
    searchParams
}) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const positionValue = await retriveJobPositions({
        limit: take,
        skip: page - 1,
        filter: search,
        orderField: field as any,
        orderValue: orderingValue as any
    });
    const pages = Math.floor(positionValue.amount / take);

    return (
        <>
            <ModularBox>
                <Title order={4} component='span'>Puestos de trabajo</Title>
            </ModularBox>
            <ModularBox>
                <Search value={search} />
            </ModularBox>
            <ModularBox h='100%'>
                <TableRoot>
                    <JobPositionHeader />
                    <JobPositionList positions={positionValue.data} />
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

export default OmegaJobPositionPage