import ListRoot from '@/components/_base/list/list-root'
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root'
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section'
import ReloadButton from '@/components/_base/reload-button'
import RemoveQueryButton from '@/components/_base/remove-query-button'
import Search from '@/components/_base/search'
import ServerPagination from '@/components/_base/server-pagination'
import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { countArea, searchArea } from '@/server/area.actions'
import { countManagement, searchManagement } from '@/server/management.actions'
import { Box, Button, Group, rem, Title } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import ManagementHeader from './_components/management-header'
import ManagementBody from './_components/management-body'
import AreaHeader from './_components/area-header'
import AreaBody from './_components/area-body'

const take: number = 100;
interface OmegaManagementPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaManagementPage: React.FC<OmegaManagementPageProps> = async ({
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

    const managements = await searchManagement({ search: managementSearch, field: managementField, page: managementPage - 1, take: take, order: order as any });
    const managementPages = await countManagement({ search: managementSearch, take: take });

    const areas = await searchArea({ search: areaSearch, field: areaField, page: areaPage - 1, take: take, order: order as any });
    const areaPages = await countArea({ search: areaSearch, take: take });

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
                            <ManagementBody active={management} managements={managements} />
                        </ListRoot>
                    </ModularBox>
                    {managementPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='managementPage'
                                page={managementPage}
                                total={managementPages} />
                        </ModularBox>)}
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
                            <AreaBody areas={areas} />
                        </ListRoot>
                    </ModularBox>
                    {areaPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='areaPage'
                                page={areaPage}
                                total={areaPages} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>)
}

export default OmegaManagementPage