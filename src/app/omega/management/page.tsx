import Await from '@/components/_base/await'
import ListBodySuspense from '@/components/_base/list/list-body.suspense'
import ListRoot from '@/components/_base/list/list-root'
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root'
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section'
import ReloadButton from '@/components/_base/reload-button'
import RemoveQueryButton from '@/components/_base/remove-query-button'
import Search from '@/components/_base/search'
import ServerPagination from '@/components/_base/server-pagination'
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { Area } from '@/lib/dtos/location/area/base.response.dto'
import { countArea, searchArea } from '@/server/area.actions'
import { countManagement, searchManagement } from '@/server/management.actions'
import { Box, Button, Group, rem, Title } from '@mantine/core'
import Link from 'next/link'
import React, { Suspense } from 'react'
import ManagementHeader from './_components/management-header'
import ManagementBody from './_components/management-body'
import AreaHeader from './_components/area-header'
import AreaBody from './_components/area-body'

const take: number = 100;
interface OmegaManagementPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaManagementPage: React.FC<OmegaManagementPageProps> = ({
    searchParams
}) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const management = typeof searchParams.management === 'string' ? Number(searchParams.management) : undefined;

    const managementSearch = typeof searchParams.managementSearch === 'string' ? searchParams.managementSearch : undefined;
    const managementField = owner === 'management' ? field : undefined;
    const managementPage = typeof searchParams.managementPage === 'string' ? Number(searchParams.managementPage) : 1;

    const areaSearch = typeof searchParams.areaSearch === 'string' ? searchParams.areaSearch : undefined;
    const areaField = owner === 'area' ? field : undefined;
    const areaPage = typeof searchParams.areaPage === 'string' ? Number(searchParams.areaPage) : 1;

    const managementPromise = searchManagement({ search: managementSearch, field: managementField, page: managementPage - 1, take: take, order: order as any });
    const managementPagePromise = countManagement({ search: managementSearch, take: take });

    const areaPromise = management
        ? searchArea(management, { search: areaSearch, field: areaField, page: areaPage - 1, take: take, order: order as any })
        : new Promise<Area[]>((resolve) => resolve([]));
    const areaPagePromise = management
        ? countArea(management, { search: areaSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!management}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Gerencias</Title>
                            </Box>
                            <ReloadButton />
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
                            <Search query='managementSearch' value={managementSearch} />
                            <Button
                                component={Link}
                                href='management/create'
                                radius='md'>
                                Crear gerencia
                            </Button>
                        </Group>
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <ManagementHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={managementPromise}>
                                    {(managements) => <ManagementBody active={management} managements={managements} />}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={managementPagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='managementPage'
                                            page={managementPage}
                                            total={pages} />
                                    </ModularBox>)}</>
                            )}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!management}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Areas</Title>
                            </Box>
                            <Group gap={rem(4)}>
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['management']}
                                    hiddenFrom='md' />
                            </Group>
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
                            <Search query='areaSearch' value={areaSearch} />
                            {!!management && (
                                <Button
                                    component={Link}
                                    href={`management/${management}/area`}
                                    radius='md'>
                                    Crear area
                                </Button>)}
                        </Group>
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <AreaHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={areaPromise}>
                                    {(areas) => <AreaBody areas={areas} />}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={areaPagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='areaPage'
                                            page={areaPage}
                                            total={pages} />
                                    </ModularBox>)}</>
                            )}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>)
}

export default OmegaManagementPage