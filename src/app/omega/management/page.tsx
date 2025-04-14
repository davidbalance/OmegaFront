import ListRoot from '@/components/_base/list/list-root'
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root'
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section'
import ReloadButton from '@/components/_base/reload-button'
import RemoveQueryButton from '@/components/_base/remove-query-button'
import Search from '@/components/_base/search'
import ServerPagination from '@/components/_base/server-pagination'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { Button, Group, rem } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import ManagementHeader from './_components/management-header'
import ManagementList from './_components/management_list'
import AreaHeader from './_components/area-header'
import AreaList from './_components/area_list'
import { retriveAreas } from '@/server'
import { retriveManagements } from '@/server'
import Title from '@/components/_base/mantine/title'
import CreateButton from '@/components/_base/create-button'

const take: number = 100;
interface OmegaManagementPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaManagementPage: React.FC<OmegaManagementPageProps> = async ({
    searchParams
}) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const managementSearch = typeof searchParams.managementSearch === 'string' ? searchParams.managementSearch : undefined;
    const managementField = owner === 'management' ? field : undefined;
    const managementPage = typeof searchParams.managementPage === 'string' ? Number(searchParams.managementPage) : 1;

    const areaSearch = typeof searchParams.areaSearch === 'string' ? searchParams.areaSearch : undefined;
    const areaField = owner === 'area' ? field : undefined;
    const areaPage = typeof searchParams.areaPage === 'string' ? Number(searchParams.areaPage) : 1;


    const managementValue = await retriveManagements({
        filter: managementSearch,
        orderField: managementField as any,
        orderValue: orderingValue as any,
        limit: take,
        skip: areaPage
    });
    const totalManagementPages = Math.floor(managementValue.amount / take);

    const areaValue = await retriveAreas({
        filter: areaSearch,
        orderField: areaField as any,
        orderValue: orderingValue as any,
        limit: take,
        skip: areaPage
    });
    const totalAreaPages = Math.floor(areaValue.amount / take);

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Title order={4} component='span'>Gerencias</Title>
                            <Group gap={rem(4)}>
                                <CreateButton href='/omega/management/create' />
                                <ReloadButton />
                            </Group>
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
                            <Search
                                query='managementSearch'
                                value={managementSearch}
                                removeQueries={['field', 'owner', 'order', 'managementPage']} />
                        </Group>
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <ManagementHeader />
                            <ManagementList managements={managementValue.data} />
                        </ListRoot>
                    </ModularBox>
                    {totalManagementPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='managementPage'
                                page={managementPage}
                                total={totalManagementPages} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Title order={4} component='span'>Areas</Title>
                            <Group gap={rem(4)}>
                                <CreateButton href='/omega/area/create' />
                                <ReloadButton />
                            </Group>
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
                            <Search
                                query='areaSearch'
                                value={areaSearch}
                                removeQueries={['field', 'owner', 'order', 'areaPage']} />
                        </Group>
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <AreaHeader />
                            <AreaList areas={areaValue.data} />
                        </ListRoot>
                    </ModularBox>
                    {totalAreaPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='areaPage'
                                page={areaPage}
                                total={totalAreaPages} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>)
}

export default OmegaManagementPage