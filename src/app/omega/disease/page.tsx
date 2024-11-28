import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { countDiseaseGroup, searchDiseaseGroup } from '@/server/disease-group.actions';
import { countDisease, searchDisease } from '@/server/disease.actions';
import { Box, Button, Group, rem, Title } from '@mantine/core';
import React from 'react'
import Link from 'next/link';
import DiseaseGroupHeader from './_components/disease-group-header';
import DiseaseGroupListBody from './_components/disease-group-list-body';
import DiseaseHeader from './_components/disease-header';
import DiseaseListBody from './_components/disease-list-body';

const take: number = 100;
interface OmegaDiseasePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaDiseasePage: React.FC<OmegaDiseasePageProps> = async ({ searchParams }) => {

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

    const groups = await searchDiseaseGroup({ search: groupSearch, field: groupField, page: groupPage - 1, take: take, order: order as any });
    const groupPages = await countDiseaseGroup({ search: groupSearch, take: take });

    const diseases = group ? await searchDisease({ search: diseaseSearch, field: diseaseField, page: diseasePage - 1, take: take, order: order as any }, group) : [];
    const diseasePages = group ? await countDisease({ search: diseaseSearch, take: take }, group) : 0;

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
                            <DiseaseGroupListBody active={group} groups={groups} />
                        </ListRoot>
                    </ModularBox>
                    {groupPages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='groupPage'
                                page={groupPage}
                                total={groupPages} />
                        </ModularBox>)}
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
                            <DiseaseListBody diseases={diseases} />
                        </ListRoot>
                    </ModularBox>
                    {diseasePages > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='diseasePage'
                                page={diseasePage}
                                total={diseasePages} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>
    )
}

export default OmegaDiseasePage