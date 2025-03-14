import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Group, rem } from '@mantine/core';
import React from 'react'
import CorporativeHeader from './_components/corporative_header';
import CompanyHeader from './_components/company_header';
import BranchHeader from './_components/branch_header';
import Title from '@/components/_base/mantine/title';
import { retriveCorporatives } from '@/server/corporative/actions';
import { retriveCompanies } from '@/server/company/actions';
import { Branch } from '@/server/branch/server_types';
import { retriveBranches } from '@/server/branch/actions';
import CorporativeList from './_components/corporative_list';
import CompanyList from './_components/company_list';
import BranchList from './_components/branch_list';

const take: number = 100;
interface OmegaLocationPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaLocationPage: React.FC<OmegaLocationPageProps> = async ({
    searchParams
}) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const owner = typeof searchParams.owner === 'string' ? searchParams.owner : undefined;
    const orderingValue = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const corporativeActive = typeof searchParams.corporative === 'string' ? searchParams.corporative : undefined;
    const companyActive = typeof searchParams.company === 'string' ? searchParams.company : undefined;

    const corporativeSearch = typeof searchParams.corporativeSearch === 'string' ? searchParams.corporativeSearch : undefined;
    const corporativeField = owner === 'corporative' ? field : undefined;
    const corporativePage = typeof searchParams.corporativePage === 'string' ? Number(searchParams.corporativePage) : 1;

    const companySearch = typeof searchParams.companySearch === 'string' ? searchParams.companySearch : undefined;
    const companyField = owner === 'company' ? field : undefined;
    const companyPage = typeof searchParams.companyPage === 'string' ? Number(searchParams.companyPage) : 1;

    const branchSearch = typeof searchParams.branchSearch === 'string' ? searchParams.branchSearch : undefined;
    const branchField = owner === 'branch' ? field : undefined;

    const corporativeValue = await retriveCorporatives({
        filter: corporativeSearch,
        orderField: corporativeField as any,
        orderValue: orderingValue as any,
        skip: corporativePage - 1,
        limit: take
    });
    const totalCorporativePage = Math.floor(corporativeValue.amount / take);

    const companyValue = corporativeActive
        ? await retriveCompanies({
            corporativeId: corporativeActive,
            filter: companySearch,
            orderField: companyField as any,
            orderValue: orderingValue as any,
            skip: companyPage - 1,
            limit: take,
        })
        : { data: [], amount: 0 };
    const totalCompanyPage = Math.floor(companyValue.amount / take);

    const branchValues: Branch[] = companyActive
        ? await retriveBranches({
            companyId: companyActive,
            filter: branchSearch,
            orderField: branchField as any,
            orderValue: orderingValue as any,
        })
        : [];

    return (
        <MultipleLayerRoot>
            <MultipleLayerSection active={!corporativeActive && !companyActive}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Title order={4} component='span'>Grupo corporativo</Title>
                            <ReloadButton />
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Search
                            query='corporativeSearch'
                            value={corporativeSearch}
                            removeQueries={['field', 'owner', 'order', 'corporative', 'company', 'corporativePage', 'companySearch', 'companyPage', 'branchSearch']} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <CorporativeHeader />
                            <CorporativeList
                                active={corporativeActive}
                                groups={corporativeValue.data}
                                removeQueries={['company', 'companySearch', 'companyPage', 'branchSearch']} />
                        </ListRoot>
                    </ModularBox>
                    {totalCorporativePage > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='corporativePage'
                                page={corporativePage}
                                total={totalCorporativePage} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!corporativeActive && !companyActive}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Title order={4} component='span'>Empresas</Title>
                            <Group gap={rem(4)}>
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['corporative']}
                                    hiddenFrom='md' />
                            </Group>
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Search
                            query='companySearch'
                            value={companySearch}
                            removeQueries={['field', 'owner', 'order', 'company', 'companyPage', 'branchSearch']} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <CompanyHeader />
                            <CompanyList
                                active={companyActive}
                                companies={companyValue.data}
                                removeQueries={['branchSearch']} />
                        </ListRoot>
                    </ModularBox>
                    {totalCompanyPage > 1 && (
                        <ModularBox>
                            <ServerPagination
                                queryKey='companyPage'
                                page={companyPage}
                                total={totalCompanyPage} />
                        </ModularBox>)}
                </ModularLayout>
            </MultipleLayerSection>
            <MultipleLayerSection active={!!corporativeActive && !!companyActive}>
                <ModularLayout>
                    <ModularBox>
                        <Group justify='space-between' wrap='nowrap' gap={rem(16)}>
                            <Title order={4} component='span'>Sucursales</Title>
                            <Group gap={rem(4)}>
                                <ReloadButton />
                                <RemoveQueryButton
                                    queries={['company']}
                                    hiddenFrom='md' />
                            </Group>
                        </Group>
                    </ModularBox>
                    <ModularBox>
                        <Search
                            query='branchSearch'
                            value={branchSearch}
                            removeQueries={['field', 'owner', 'order']} />
                    </ModularBox>
                    <ModularBox flex={1}>
                        <ListRoot>
                            <BranchHeader />
                            <BranchList branches={branchValues} />
                        </ListRoot>
                    </ModularBox>
                </ModularLayout>
            </MultipleLayerSection>
        </MultipleLayerRoot>)
}

export default OmegaLocationPage