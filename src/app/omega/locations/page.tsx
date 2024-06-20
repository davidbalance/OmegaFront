'use client'

import React, { useCallback, useMemo, useState } from "react"
import { useFetch } from "@/hooks/useFetch"
import { CorporativeGroup } from "@/lib/dtos/location/corporative/group.response.dto"
import MultipleTierLayout, { TierElement } from "@/components/layout/multiple-tier-layout/MultipleTierLayout"
import { ListElement, ListLayout } from "@/components/layout/list-layout/ListLayout"
import { Company } from "@/lib/dtos/location/company.response.dto"
import { Branch } from "@/lib/dtos/location/branch.response.dto"
import { ListRowElement } from "@/components/layout/list-layout/ListRowElement"
import { Flex, SimpleGrid, Text, Title, rem } from "@mantine/core"

enum LayoutStates {
    DEFAULT
}

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
    }, []);

    const handleClickEventSelectCompany = useCallback((data: Company) => {
        setSelectedCompany(data);
    }, []);

    const handleCorporativeGroupRow = useCallback((row: CorporativeGroup) => (
        <ListRowElement
            key={row.id}
            active={row.id === selectedCorporativeGroup?.id}
            onClick={() => handleClickEventSelectGroup(row)}
        >
            <Title order={6}>{row.name}</Title>
        </ListRowElement>
    ), [selectedCorporativeGroup, handleClickEventSelectGroup]);

    const handleCorporativeCompanyRow = useCallback((row: Company) => (
        <ListRowElement
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
        </ListRowElement>
    ), [handleClickEventSelectCompany, selectedCompany]);

    const handleBranchRow = useCallback((row: Branch) => (
        <ListRowElement key={row.id}>
            <Title order={6}>{row.name}</Title>
            <Text>{row.city.name}</Text>
        </ListRowElement>
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