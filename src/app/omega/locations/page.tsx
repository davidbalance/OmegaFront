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
import { Branch } from '@/lib/dtos/location/branch.response.dto';
import { Company } from '@/lib/dtos/location/company.response.dto';
import { countBranch, searchBranch } from '@/server/branch.actions';
import { countCompany, searchCompany } from '@/server/company.actions';
import { countCorporativeGroup, searchCorporativeGroup } from '@/server/corporative-group.actions';
import { Group, rem, Box, Title } from '@mantine/core';
import React, { Suspense } from 'react'
import CorporativeGroupHeader from './_components/corporative-group-header';
import CorporativeGroupBody from './_components/corporative-group-body';
import CompanyHeader from './_components/company-header';
import CompanyBody from './_components/company-body';
import BranchHeader from './_components/branch-header';
import BranchBody from './_components/branch-body';

export const dynamic = 'force-dynamic'
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
        : new Promise<Company[]>((resolve) => resolve([]));
    const companyPagePromise = group
        ? countCompany(group, { search: branchSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    const branchPromise = company
        ? searchBranch(company, { search: branchSearch, field: branchField, page: branchPage - 1, take: take, order: order as any })
        : new Promise<Branch[]>((resolve) => resolve([]));
    const branchPagePromise = company
        ? countBranch(company, { search: branchSearch, take: take })
        : new Promise<number>((resolve) => resolve(0));

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!group && !company}>
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
                        <Search query='groupSearch' value={groupSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <CorporativeGroupHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={groupPromise}>
                                    {(groups) => <CorporativeGroupBody active={group} groups={groups} />}
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
            <MultipleLayerSection active={!!group && !company}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Empresas</Title>
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
                        <Search query='companySearch' value={companySearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <CompanyHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={companyPromise}>
                                    {(companies) => <CompanyBody active={company} companies={companies} />}
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
            <MultipleLayerSection active={!!group && !!company}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Box style={{ flexShrink: 0 }}>
                                <Title order={4} component='span'>Sucursales</Title>
                            </Box>
                            <Group gap={rem(4)}>
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['company']}
                                    hiddenFrom='md' />
                            </Group>
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Search query='branchSearch' value={branchSearch} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <BranchHeader />
                            <Suspense fallback={<ListBodySuspense />}>
                                <Await promise={branchPromise}>
                                    {(branches) => <BranchBody branches={branches} />}
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