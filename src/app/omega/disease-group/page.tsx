import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { retriveDiseaseGroups } from '@/server';
import { Button, Group, rem } from '@mantine/core';
import React from 'react'
import Link from 'next/link';
import DiseaseGroupHeader from './_components/disease_group_header';
import DiseaseHeader from './_components/disease_header';
import { retriveDiseases } from '@/server';
import { PaginationResponse } from '@/lib/types/pagination.type';
import { Disease } from '@/server/disease/server-types';
import Title from '@/components/_base/mantine/title';
import DiseaseGroupList from './_components/disease_group_list';
import DiseaseList from './_components/disease_list';

const take: number = 100;
interface OmegaDiseasePageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaDiseasePage: React.FC<OmegaDiseasePageProps> = async ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;


    const groupActive = typeof searchParams.group === 'string' ? searchParams.group : undefined;
    const groupSearch = typeof searchParams.groupSearch === 'string' ? searchParams.groupSearch : undefined;
    const groupField = owner === 'group' ? field : undefined;
    const groupPage = typeof searchParams.groupPage === 'string' ? Number(searchParams.groupPage) : 1;

    const diseaseSearch = typeof searchParams.diseaseSearch === 'string' ? searchParams.diseaseSearch : undefined;
    const diseaseField = owner === 'disease' ? field : undefined;
    const diseasePage = typeof searchParams.diseasePage === 'string' ? Number(searchParams.diseasePage) : 1;

    const groupValue = await retriveDiseaseGroups({
        filter: groupSearch,
        orderField: groupField as any,
        orderValue: orderingValue as any,
        skip: groupPage,
        limit: take,
    });
    const totalGroupPage = Math.floor(groupValue.amount / take);

    const diseaseValue: PaginationResponse<Disease> = groupActive ? await retriveDiseases({
        groupId: groupActive,
        filter: diseaseSearch,
        orderField: diseaseField as any,
        orderValue: orderingValue as any,
        limit: take,
        skip: diseasePage
    }) : { data: [], amount: 0 };
    const totalDiseasePage = Math.floor(diseaseValue.amount / take);

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!groupActive}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Title order={4} component='span'>Grupo de morbilidades</Title>
                            <ReloadButton />
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(8)}>
                            <Search
                                query='groupSearch'
                                value={groupSearch}
                                removeQueries={['field', 'owner', 'order', 'group', 'groupPage']} />
                            <Button
                                component={Link}
                                href='/omega/disease/group/create'
                                radius='md'>
                                Crear grupo
                            </Button>
                        </Group>
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <DiseaseGroupHeader />
                            <DiseaseGroupList
                                active={groupActive}
                                groups={groupValue.data}
                                removeQueries={['field', 'owner', 'order', 'diseaseSearch', 'diseasePage']} />
                        </ListRoot>
                    </ModularBox>
                    {totalGroupPage > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='groupPage'
                                page={groupPage}
                                total={totalGroupPage} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!groupActive}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Title order={4} component='span'>Morbilidades</Title>
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
                            <Search
                                query='diseaseSearch'
                                value={diseaseSearch}
                                removeQueries={['field', 'owner', 'order', 'diseasePage']} />
                            {!!groupActive && (
                                <Button
                                    component={Link}
                                    href={`disease/${groupActive}/create`}
                                    radius='md'>
                                    Crear morbilidad
                                </Button>)}
                        </Group>
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <DiseaseHeader />
                            <DiseaseList
                                groupId={groupActive}
                                diseases={diseaseValue.data} />
                        </ListRoot>
                    </ModularBox>
                    {totalDiseasePage > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='diseasePage'
                                page={diseasePage}
                                total={totalDiseasePage} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>
    )
}

export default OmegaDiseasePage