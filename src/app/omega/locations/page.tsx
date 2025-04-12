import ListRoot from '@/components/_base/list/list-root';
import MultipleLayerRoot from '@/components/_base/multiple-layer/multiple-layer-root';
import MultipleLayerSection from '@/components/_base/multiple-layer/multiple-layer-section';
import ReloadButton from '@/components/_base/reload-button';
import RemoveQueryButton from '@/components/_base/remove-query-button';
import Search from '@/components/_base/search';
import ServerPagination from '@/components/_base/server-pagination';
import { ModularBox } from '@/components/modular/box/ModularBox';
import ModularLayout from '@/components/modular/layout/ModularLayout';
import { Flex, Group, rem } from '@mantine/core';
import React from 'react'
import CorporativeHeader from './_components/corporative_header';
import CompanyHeader from './_components/company_header';
import BranchHeader from './_components/branch_header';
import Title from '@/components/_base/mantine/title';
import { retriveCorporatives } from '@/server';
import { retriveCompanies } from '@/server';
import { Branch } from '@/server/branch/server-types';
import { retriveBranches } from '@/server';
import CorporativeList from './_components/corporative_list';
import CompanyList from './_components/company_list';
import BranchList from './_components/branch_list';
import CreateButton from '@/components/_base/create-button';

<<<<<<< HEAD
const take: number = 100;
interface OmegaLocationPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const OmegaLocationPage: React.FC<OmegaLocationPageProps> = async ({
    searchParams
}) => {
=======
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useFetch } from "@/hooks/useFetch"
import { Company } from "@/lib/dtos/location/company.response.dto"
import { Branch } from "@/lib/dtos/location/branch.response.dto"
import { Flex, SimpleGrid, Text, Title, rem } from "@mantine/core"
import { ListRow } from "@/components/layout/list-layout/components/row/ListRow"
import { ListLayout } from "@/components/layout/list-layout/components/extended/ListLayout"
import { ListElement } from "@/components/layout/list-layout/types"
import { notifications } from "@mantine/notifications"
import { TierElement, MultipleTierLayout } from "@/components/layout/multiple-tier-layout/MultipleTierLayout"
import { CorporativeGroup } from "@/lib/dtos/location/corporative/base.response.dto"
>>>>>>> main

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
                        <Flex
                            justify='space-between'
                            wrap='nowrap'
                            gap={rem(16)}>
                            <Title order={4} component='span'>Grupo corporativo</Title>
                            <Group gap={rem(4)}>
                                <CreateButton href={`/omega/locations/corporative/create`} />
                                <ReloadButton />
                            </Group>
                        </Flex>
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
                                {!!corporativeActive && <CreateButton href={`/omega/locations/company/create?corporativeId=${corporativeActive}`} />}
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
                                {!!corporativeActive && !!companyActive && <CreateButton href={`/omega/locations/branch/create?corporativeId=${corporativeActive}&companyId=${companyActive}`} />}
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

<<<<<<< HEAD
export default OmegaLocationPage
=======
const columnCorporativeGroups: ListElement<CorporativeGroup>[] = [{ key: 'name', name: 'Nombre de empresa' }];
const columnCompany: ListElement<Company>[] = [{ key: 'name', name: 'Nombre' }, { key: 'ruc', name: 'Ruc' },];
const columnBranch: ListElement<Branch>[] = [{ key: 'name', name: 'Nombre' }];

const CorporativeGroupPage: React.FC = () => {

    const [selectedCorporativeGroup, setSelectedCorporativeGroup] = useState<CorporativeGroup | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [active, setActive] = useState(0);
    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const { data: fetchData, error: fetchError, loading: fetchLoading } = useFetch<CorporativeGroup[]>('/api/corporative/groups', 'GET');

    const groups = useMemo((): CorporativeGroup[] => fetchData || [], [fetchData]);
    const companies = useMemo((): Company[] => selectedCorporativeGroup?.companies || [], [selectedCorporativeGroup]);
    const branches = useMemo((): Branch[] => selectedCompany?.branches || [], [selectedCompany]);

    const handleClickEventSelectGroup = useCallback((data: CorporativeGroup) => {
        setSelectedCorporativeGroup(data);
        setActive(1);
    }, []);

    const handleClickEventSelectCompany = useCallback((data: Company) => {
        setSelectedCompany(data);
        setActive(2);
    }, []);

    const handleCorporativeGroupRow = useCallback((row: CorporativeGroup) => (
        <ListRow
            key={row.id}
            active={row.id === selectedCorporativeGroup?.id}
            onClick={() => handleClickEventSelectGroup(row)}
        >
            <Title order={6}>{row.name}</Title>
        </ListRow>
    ), [selectedCorporativeGroup, handleClickEventSelectGroup]);

    const handleCorporativeCompanyRow = useCallback((row: Company) => (
        <ListRow
            key={row.id}
            active={row.id === selectedCompany?.id}
            onClick={() => handleClickEventSelectCompany(row)}
        >
            <Flex direction='column' gap={rem(8)}>
                <Title order={6}>{row.name}</Title>
                <Text>{row.address}</Text>
                <SimpleGrid cols={2}>
                    <Text>{row.ruc}</Text>
                    <Text>{row.phone}</Text>
                </SimpleGrid>
            </Flex>
        </ListRow>
    ), [handleClickEventSelectCompany, selectedCompany]);

    const handleBranchRow = useCallback((row: Branch) => (
        <ListRow key={row.id}>
            <Title order={6}>{row.name}</Title>
            <Text>{row.city.name}</Text>
        </ListRow>
    ), []);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Grupos corporativos',
            element: <ListLayout<CorporativeGroup>
                key='group-list-layout'
                loading={fetchLoading}
                data={groups}
                columns={columnCorporativeGroups}
                rows={handleCorporativeGroupRow}
            />,
        },
        {
            title: 'Empresas',
            element: <ListLayout<Company>
                key='company-list-layout'
                loading={false}
                data={companies}
                columns={columnCompany}
                rows={handleCorporativeCompanyRow}
                size={100}
            />,
        },
        {
            title: 'Sucursales',
            element: <ListLayout<Branch>
                key='branch-list-layout'
                loading={false}
                data={branches}
                columns={columnBranch}
                rows={handleBranchRow}
            />,
        }
    ], [
        groups,
        companies,
        branches,
        fetchLoading,
        handleCorporativeGroupRow,
        handleCorporativeCompanyRow,
        handleBranchRow,
    ]);

    const handleCloseTierEvent = useCallback(() => setActive((prev) => {
        const newValue = prev - 1;
        if (newValue === 0) {
            setSelectedCorporativeGroup(null);
        } else if (newValue === 1) {
            setSelectedCompany(null);
        }
        return newValue;
    }), []);

    useEffect(() => {
        if (fetchError) notifications.show({ message: fetchError.message, color: 'red' });
    }, [fetchError]);

    const view: Record<LayoutStates, React.ReactNode> = useMemo(() => ({
        [LayoutStates.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTierEvent} />
        )
    }), [multipleLayerComponents, active, handleCloseTierEvent]);

    return <>{view[currentState]}</>

}

export default CorporativeGroupPage
>>>>>>> main
