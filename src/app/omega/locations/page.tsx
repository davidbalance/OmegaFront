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
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import ServerPaginationSuspense from '@/components/_base/server-pagination.suspense';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { BranchSingle } from '@/lib/dtos/location/branch.response.dto';
import { CompanySingle } from '@/lib/dtos/location/company.response.dto';
import { countBranch, searchBranch } from '@/server/branch.actions';
import { countCompany, searchCompany } from '@/server/company.actions';
import { countCorporativeGroup, searchCorporativeGroup } from '@/server/corporative-group.actions';
import { Group, rem, Box, Title, Text, Stack } from '@mantine/core';
import React, { Suspense } from 'react'

const take: number = 100;
interface OmegaLocationPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaLocationPage: React.FC<OmegaLocationPageProps> = ({
    searchParams
}) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const group = typeof searchParams.group === 'string' ? Number(searchParams.group) : undefined;
    const company = typeof searchParams.company === 'string' ? Number(searchParams.company) : undefined;

    const groupSearch = typeof searchParams.groupSearch === 'string' ? searchParams.groupSearch : undefined;
    const groupField = owner === 'group' ? field : undefined;
    const groupPage = typeof searchParams.groupPage === 'string' ? Number(searchParams.groupPage) : 1;


    const companySearch = typeof searchParams.companySearch === 'string' ? searchParams.companySearch : undefined;
    const companyField = owner === 'company' ? field : undefined;
    const companyPage = typeof searchParams.companyPage === 'string' ? Number(searchParams.companyPage) : 1;

    const branchSearch = typeof searchParams.branchSearch === 'string' ? searchParams.branchSearch : undefined;
    const branchField = owner === 'branch' ? field : undefined;
    const branchPage = typeof searchParams.branchPage === 'string' ? Number(searchParams.branchPage) : 1;

    const groupPromise = searchCorporativeGroup({ search: groupSearch, field: groupField, page: groupPage - 1, take: take, order: order as any });
    const groupPagePromise = countCorporativeGroup({ search: groupSearch, take: take });

    const companyPromise = group
        ? searchCompany(group, { search: companySearch, field: companyField, page: companyPage - 1, take: take, order: order as any })
        : new Promise<CompanySingle[]>((resolve) => resolve([]));
    const companyPagePromise = group
        ? countCompany(group, { search: branchSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    const branchPromise = company
        ? searchBranch(company, { search: branchSearch, field: branchField, page: branchPage - 1, take: take, order: order as any })
        : new Promise<BranchSingle[]>((resolve) => resolve([]));
    const branchPagePromise = company
        ? countBranch(company, { search: branchSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Grupo corporativo</Title>
                            </Box>
                            <ReloadButton />
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Search queryKey='groupSearch' value={groupSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <ListThead>
                                <ListTh>
                                    <OrderableButton
                                        owner='group'
                                        field='name'>
                                        <Text>Grupo corporativo</Text>
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
                                                            removeQueries={['company']}>
                                                            <Title order={6}>{e.name}</Title>
                                                        </AddQueryParam>
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
            <MultipleLayerSection active={!group}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Empresas</Title>
                            </Box>
                            <ReloadButton />
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Search queryKey='companySearch' value={companySearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <ListThead>
                                <ListTh>
                                    <OrderableButton
                                        owner='company'
                                        field='name'>
                                        <Text>Empresa</Text>
                                    </OrderableButton>
                                </ListTh>
                                <ListTh>
                                    <OrderableButton
                                        owner='company'
                                        field='ruc'>
                                        <Text>Ruc</Text>
                                    </OrderableButton>
                                </ListTh>
                            </ListThead>
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={companyPromise}>
                                    {(companies) => (
                                        <ListTbody>
                                            {companies.map(e => (
                                                <ListRow
                                                    active={company === e.id}
                                                    hoverable={true}
                                                    key={e.id}>
                                                    <AddQueryParam
                                                        value={e.id.toString()}
                                                        query='company'>
                                                        <Stack>
                                                            <Title order={6}>{e.name}</Title>
                                                            <Group justify='space-between' align='center' wrap='nowrap'>
                                                                <Text>{e.ruc}</Text>
                                                                <Text>{e.phone}</Text>
                                                            </Group>
                                                        </Stack>
                                                    </AddQueryParam>
                                                </ListRow>
                                            ))}
                                        </ListTbody>
                                    )}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={companyPagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='companyPage'
                                            page={companyPage}
                                            total={pages} />
                                    </ModularBox>)}</>
                            )}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!group}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Sucursales</Title>
                            </Box>
                            <ReloadButton />
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Search queryKey='branchSearch' value={branchSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <ListThead>
                                <ListTh>
                                    <OrderableButton
                                        owner='branch'
                                        field='name'>
                                        <Text>Sucursal</Text>
                                    </OrderableButton>
                                </ListTh>
                            </ListThead>
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={branchPromise}>
                                    {(branches) => (
                                        <ListTbody>
                                            {branches.map(e => (
                                                <ListRow
                                                    hoverable={true}
                                                    key={e.id}>
                                                    <Stack gap={rem(8)}>
                                                        <Title order={6}>{e.name}</Title>
                                                        <Text>{e.city}</Text>
                                                    </Stack>
                                                </ListRow>
                                            ))}
                                        </ListTbody>)}
                                </Await>
                            </Suspense>
                        </ListRoot>
                    </ModularBox>
                    <Suspense fallback={<ModularBox><ServerPaginationSuspense /></ModularBox>}>
                        <Await promise={branchPagePromise}>
                            {(pages) => (
                                <>{pages > 1 && (
                                    <ModularBox>
                                        <ServerPagination
                                            queryKey='branchPage'
                                            page={groupPage}
                                            total={pages} />
                                    </ModularBox>)}</>
                            )}
                        </Await>
                    </Suspense>
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>)
}

export default OmegaLocationPage