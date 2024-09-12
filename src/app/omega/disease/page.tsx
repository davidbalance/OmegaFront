import Await from '@/components/_base/await';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Disease } from '@/lib/dtos/disease/base.response.dto';
import { countDiseaseGroup, searchDiseaseGroup } from '@/server/disease-group.actions';
import { countDisease, searchDisease } from '@/server/disease.actions';
import { Box, Button, Group, rem, Title } from '@mantine/core';
import React, { Suspense } from 'react'
import Link from 'next/link';
import DiseaseGroupHeader from './_components/disease-group-header';
import DiseaseGroupListBody from './_components/disease-group-list-body';
import DiseaseHeader from './_components/disease-header';
import DiseaseListBody from './_components/disease-list-body';

export const dynamic = 'force-dynamic'
const take: number = 100;
interface OmegaDiseasePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaDiseasePage: React.FC<OmegaDiseasePageProps> = ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const group = typeof searchParams.group === 'string' ? Number(searchParams.group) : undefined;

    const groupSearch = typeof searchParams.groupSearch === 'string' ? searchParams.groupSearch : undefined;
    const groupField = owner === 'group' ? field : undefined;
    const groupPage = typeof searchParams.groupPage === 'string' ? Number(searchParams.groupPage) : 1;

    const diseaseSearch = typeof searchParams.diseaseSearch === 'string' ? searchParams.diseaseSearch : undefined;
    const diseaseField = owner === 'disease' ? field : undefined;
    const diseasePage = typeof searchParams.diseasePage === 'string' ? Number(searchParams.diseasePage) : 1;

    const groupPromise = searchDiseaseGroup({ search: groupSearch, field: groupField, page: groupPage - 1, take: take, order: order as any });
    const groupPagePromise = countDiseaseGroup({ search: groupSearch, take: take });

    const diseasePromise = group ? searchDisease({ search: diseaseSearch, field: diseaseField, page: diseasePage - 1, take: take, order: order as any }, group) : new Promise<Disease[]>((resolve) => resolve([]));
    const diseasePagePromise = group ? countDisease({ search: diseaseSearch, take: take }, group) : new Promise<number>((resolve) => resolve(0));

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!group}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Grupo de morbilidades</Title>
                            </Box>
                            <ReloadButton />
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
                            <Search query='groupSearch' value={groupSearch} />
                            <Button
                                component={Link}
                                href='disease/group/create'
                                radius='md'>
                                Crear grupo
                            </Button>
                        </Group>

                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <DiseaseGroupHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={groupPromise}>
                                    {(groups) => <DiseaseGroupListBody active={group} groups={groups} />}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={groupPagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='groupPage'
                                            page={groupPage}
                                            total={pages} />
                                    </ModularBox>)}</>
                            )}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!group}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Morbilidades</Title>
                            </Box>
                            <Group gap={rem(4)}>
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['group']}
                                    hiddenFrom='md' />
                            </Group>
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
                            <Search query='diseaseSearch' value={diseaseSearch} />
                            {!!group && (
                                <Button
                                    component={Link}
                                    href={`disease/${group}/create`}
                                    radius='md'>
                                    Crear morbilidad
                                </Button>)}
                        </Group>
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <DiseaseHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={diseasePromise}>
                                    {(diseases) => <DiseaseListBody diseases={diseases} />}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={diseasePagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='diseasePage'
                                            page={diseasePage}
                                            total={pages} />
                                    </ModularBox>)}</>
                            )}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>
    )
}

export default OmegaDiseasePage