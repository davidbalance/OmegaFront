import ActionMenu from '@/components/_base/action-menu';
import AddQueryParam from '@/components/_base/add-query-param';
import Await from '@/components/_base/await';
import ListBodySuspense from '@/components/_base/list/list-body.suspense';
import ListRoot from '@/components/_base/list/list-root';
import ListRow from '@/components/_base/list/list-row';
import ListTbody from '@/components/_base/list/list-tbody';
import ListTh from '@/components/_base/list/list-th';
import ListThead from '@/components/_base/list/list-thead';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import OrderableButton from '@/components/_base/orderable-button';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import ActionMenuProvider from '@/contexts/action-menu.context';
import { Disease } from '@/lib/dtos/disease/base.response.dto';
import { countDiseaseGroup, searchDiseaseGroup } from '@/server/disease-group.actions';
import { countDisease, searchDisease } from '@/server/disease.actions';
import { Box, Button, Group, MenuItem, MenuLabel, rem, Text, Title } from '@mantine/core';
import { IconEdit, IconExchange, IconTrash } from '@tabler/icons-react';
import React, { Suspense } from 'react'
import DiseaseGroupActionDelete from './_components/disease-group-action-delete';
import Link from 'next/link';
import DiseaseActionDelete from './_components/disease-action-delete';

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
                            <Search queryKey='groupSearch' value={groupSearch} />
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
                            <ListThead>
                                <ListTh>
                                    <OrderableButton
                                        owner='group'
                                        field='name'>
                                        <Text>Group</Text>
                                    </OrderableButton>
                                </ListTh>
                            </ListThead>
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={groupPromise}>
                                    {(groups) => (
                                        <ListTbody>
                                            {groups.map(e => (
                                                <ListRow
                                                    active={group === e.id}
                                                    hoverable={true}
                                                    key={e.id}>
                                                    <Group justify='space-between' align='center' wrap='nowrap'>
                                                        <AddQueryParam
                                                            value={e.id.toString()}
                                                            query='group'
                                                            removeQueries={['medicalOrder']}>
                                                            <Title order={6}>{e.name}</Title>
                                                        </AddQueryParam>
                                                        <ActionMenuProvider>
                                                            <ActionMenu>
                                                                <MenuLabel>Administracion</MenuLabel>
                                                                <MenuItem
                                                                    component={Link}
                                                                    href={`disease/group/${e.id}/update`}
                                                                    leftSection={(
                                                                        <IconEdit style={{ width: rem(16), height: rem(16) }}
                                                                        />)}>
                                                                    Editar grupo
                                                                </MenuItem>
                                                                <DiseaseGroupActionDelete id={e.id} />
                                                            </ActionMenu>
                                                        </ActionMenuProvider>

                                                    </Group>
                                                </ListRow>
                                            ))}
                                        </ListTbody>
                                    )}
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
                            <Search queryKey='diseaseSearch' value={diseaseSearch} />
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
                            <ListThead>
                                <ListTh>
                                    <OrderableButton
                                        owner='disease'
                                        field='name'>
                                        <Text>Morbilidad</Text>
                                    </OrderableButton>
                                </ListTh>
                            </ListThead>
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={diseasePromise}>
                                    {(diseases) => (
                                        <ListTbody>
                                            {diseases.map(e => (
                                                <ListRow
                                                    hoverable
                                                    key={e.id}>
                                                    <Group justify='space-between' align='center' wrap='nowrap'>
                                                        <Text>{e.name}</Text>
                                                        <ActionMenuProvider>
                                                            <ActionMenu>
                                                                <MenuLabel>Administracion</MenuLabel>
                                                                <MenuItem
                                                                    component={Link}
                                                                    href={`disease/${e.id}/update`}
                                                                    leftSection={(
                                                                        <IconEdit style={{ width: rem(16), height: rem(16) }} />
                                                                    )}>
                                                                    Editar morbilidad
                                                                </MenuItem>
                                                                <MenuItem
                                                                    href={`disease/${e.id}/change`}
                                                                    component={Link}
                                                                    leftSection={(
                                                                        <IconExchange style={{ width: rem(16), height: rem(16) }} />
                                                                    )}>
                                                                    Cambiar grupo
                                                                </MenuItem>
                                                                <DiseaseActionDelete id={e.id} />
                                                            </ActionMenu>
                                                        </ActionMenuProvider>
                                                    </Group>
                                                </ListRow>
                                            ))}
                                        </ListTbody>
                                    )}
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