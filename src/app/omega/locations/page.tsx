'use client'

import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useList } from '@/hooks/useList';
import { CorporativeGroup } from '@/lib/dtos/location/corporative/group.response.dto';
import { Company } from '@/lib/dtos/location/company.response.dto';
import { Branch } from '@/lib/dtos/location/branch.response.dto';
import { Title, Flex, Text, Grid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

type CorporativeGroupDataType = CorporativeGroup;
const parseCorporativeGroups = (groups: CorporativeGroup[]): CorporativeGroupDataType[] => groups;

enum LayoutState {
    DEFAULT
}

const corporativeGroupColumns: ListElement<CorporativeGroupDataType>[] = [
    { key: 'name', name: 'Grupo Corporativo' },
];

const companyColumns: ListElement<Company>[] = [
    { key: 'name', name: 'Nombre' },
    { key: 'ruc', name: 'RUC' },
];

const branchColumns: ListElement<Branch>[] = [
    { key: 'name', name: 'Sucursal' },
];

const LocationPage: React.FC = () => {
    const [active, setActive] = useState(0);
    const [currentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [groupSelected, setGroupSelected] = useState<CorporativeGroupDataType | null>(null);
    const [companySelected, setCompanySelected] = useState<Company | null>(null);
    const [branchSelected, setBranchSelected] = useState<Branch | null>(null);
    const [shouldFetchCompanies, setShouldFetchCompanies] = useState<boolean>(false);

    const {
        data: fetchedGroups,
        loading: groupLoading,
        error: groupError,
    } = useFetch<CorporativeGroup[]>('/api/corporative/groups', 'GET');

    const {
        data: fetchedCompanies,
        loading: companyLoading,
        error: companyError,
        reload: companyReload,
    } = useFetch<Company[]>(`/api/companies/group/${groupSelected?.id}`, 'GET', { loadOnMount: false });

    const [corporativeGroups, { override: groupOverride }] = useList<CorporativeGroupDataType>([]);
    const [companies, { override: companyOverride, update: companyUpdate }] = useList<Company>([]);
    const [branches, { override: branchOverride, update: branchUpdate }] = useList<Branch>([]);

    const parsedGroups = useMemo(() => parseCorporativeGroups(fetchedGroups || []), [fetchedGroups]);

    const handleGroupSelection = useCallback((selection: CorporativeGroupDataType): void => {
        setGroupSelected(selection);
        setCompanySelected(null);
        setShouldFetchCompanies(true);
    }, []);

    const handleCompanySelection = useCallback((selection: Company): void => {
        setCompanySelected(selection);
        setActive(2);
    }, []);

    const handleGroupRow = useCallback((row: CorporativeGroupDataType) => (
        <ListRowElement
            key={row.id}
            active={row.id === groupSelected?.id}
            onClick={() => handleGroupSelection(row)}>
            <Title order={6}>{`${row.name}`}</Title>
        </ListRowElement>
    ), [groupSelected, handleGroupSelection]);

    const handleCompanyRow = useCallback((row: Company) => (
        <ListRowElement
            key={row.id}
            active={row.id === companySelected?.id}
            onClick={() => handleCompanySelection(row)}
        >
            <Grid>
                <Grid.Col span={8}>
                    <Flex direction='column'>
                        <Title order={6}>{row.name}</Title>
                        <Text>{row.ruc}</Text>
                    </Flex>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Flex align='center' h='100%'>
                        <Text>{row.address}</Text>
                    </Flex>
                </Grid.Col>
            </Grid>
        </ListRowElement>
    ), [companySelected, handleCompanySelection]);

    const handleBranchRow = useCallback((row: Branch) => (
        <ListRowElement
            key={row.id}
            active={row.id === branchSelected?.id}
        >
            <Title order={6}>{row.name}</Title>
        </ListRowElement>
    ), []);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Grupos Corporativos',
            element: <ListLayout<CorporativeGroupDataType>
                key='group-list-layout'
                loading={groupLoading}
                data={corporativeGroups}
                columns={corporativeGroupColumns}
                rows={handleGroupRow}
                size={100}
            />,
        },
        {
            title: groupSelected ? `Compañías de: ${groupSelected.name}` : 'Compañías',
            element: <ListLayout<Company>
                key='company-list-layout'
                loading={companyLoading}
                data={companies}
                columns={companyColumns}
                rows={handleCompanyRow}
            />,
        },
        {
            title: 'Sucursales',
            element: <ListLayout<Branch>
                key='branch-list-layout'
                loading={false}
                data={branches}
                columns={branchColumns}
                rows={handleBranchRow}
            />,
        },
    ], [
        groupLoading,
        corporativeGroups,
        handleGroupRow,
        groupSelected,
        companyLoading,
        companies,
        handleCompanyRow,
        branches,
        handleBranchRow
    ]);

    const handleCloseTierEvent = useCallback(() => setActive((prev) => {
        const newValue = prev - 1;
        if (newValue === 0) {
            setGroupSelected(null);
        } else if (newValue === 1) {
            setCompanySelected(null);
        }
        return newValue;
    }), []);

    const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
        [LayoutState.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTierEvent}
            />
        ),
    }), [multipleLayerComponents, active, handleCloseTierEvent]);

    useEffect(() => {
        if (parsedGroups.length > 0) groupOverride(parsedGroups);
    }, [parsedGroups, groupOverride]);

    useEffect(() => {
        if (fetchedCompanies) companyOverride(fetchedCompanies);
    }, [fetchedCompanies, companyOverride]);

    useEffect(() => {
        if (companySelected) branchOverride(companySelected.branches);
    }, [companySelected, branchOverride]);

    useEffect(() => {
        if (groupError) notifications.show({ message: groupError.message, color: 'red' });
        else if (companyError) notifications.show({ message: companyError.message, color: 'red' });
    }, [groupError, companyError]);

    useEffect(() => {
        if (shouldFetchCompanies && groupSelected) {
            companyReload();
            setActive(1);
            branchOverride([]);
            setShouldFetchCompanies(false);
        }
    }, [shouldFetchCompanies, groupSelected, companyReload, branchOverride]);

    return (
        <>
            {view[currentState]}
        </>
    );
}

export default LocationPage;