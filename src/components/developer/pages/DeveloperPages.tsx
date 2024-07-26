import { NavIcon } from '@/components/navbar/NavIcon';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { Flex, Grid, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DeveloperPagesActionMenu } from './action/DeveloperPagesActionMenu';
import { ButtonResponsive } from '@/components/button/responsive/ButtonResponsive';
import { DeveloperPageFormCreate } from './form/DeveloperPageFormCreate';
import { DeveloperPageFormUpdate } from './form/DeveloperPageFormUpdate';
import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListElement } from '@/components/layout/list-layout/types';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { OmegaWebResource } from '@/lib/dtos/omega/web/resource/base.response.dto';

enum LayoutStates {
    DEFAULT,
    UPDATE,
    CREATE
}

const columns: ListElement<OmegaWebResource>[] = [
    { name: 'Label', key: 'label' },
    { name: 'Direccion', key: 'address' },
    { name: 'Icono', key: 'icon' },
]

const DeveloperPages: React.FC = () => {

    const [currenState, setCurrenState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const [pageSelected, setPageSelected] = useState<OmegaWebResource | null>(null);

    const {
        data: fetchData,
        error: fetchError,
        loading: fetchLoading
    } = useFetch<OmegaWebResource[]>('/api/web/resources', 'GET');

    const [resources, {
        override: overrideResource,
        append: appendResource,
        update: updateResource,
        remove: removeResource
    }] = useList<OmegaWebResource>([]);

    const handleClickEventModification = useCallback((data: OmegaWebResource) => {
        setPageSelected(data);
        setCurrenState(LayoutStates.UPDATE);
    }, []);

    const handleClickEventCreate = useCallback(() => {
        setPageSelected(null);
        setCurrenState(LayoutStates.CREATE);
    }, []);

    const handleCloseEvent = useCallback(() => {
        setPageSelected(null);
        setCurrenState(LayoutStates.DEFAULT)
    }, []);

    const handleClickEventDelete = useCallback((id: number) => {
        removeResource('id', id);
    }, [removeResource]);

    const handleRow = useCallback((row: OmegaWebResource) => {
        const Icon = NavIcon[row.icon];
        return <ListRow
            key={row.id}
            rightSection={
                <DeveloperPagesActionMenu
                    resource={row.id}
                    onModification={() => handleClickEventModification(row)}
                    onDelete={handleClickEventDelete} />
            }>
            <Grid>
                <Grid.Col span={1}>
                    <Flex
                        h='100%'
                        justify='center'
                        align='center'>
                        <Icon />
                    </Flex>
                </Grid.Col>
                <Grid.Col span={5}>
                    <Title order={5}>
                        {row.label}
                    </Title>
                    <Text>
                        {row.address}
                    </Text>
                </Grid.Col>
            </Grid>
        </ListRow>
    }, [handleClickEventModification, handleClickEventDelete]);

    const handleFormSubmittionEventCreate = useCallback((value: OmegaWebResource) => {
        appendResource(value);
    }, [appendResource])

    const handleFormSubmittionEventUpdate = useCallback((value: OmegaWebResource) => {
        updateResource('id', value.id, value);
    }, [updateResource])

    useEffect(() => {
        if (fetchError) notifications.show({ message: fetchError.message, color: 'red' });
    }, [fetchError]);

    useEffect(() => {
        if (fetchData) {
            overrideResource(fetchData);
        }
    }, [fetchData, overrideResource]);

    const view = useMemo((): Record<LayoutStates, React.ReactNode> => ({
        [LayoutStates.DEFAULT]: (
            <ListLayout<OmegaWebResource>
                dock={<ButtonResponsive
                    label='Nueva Pagina'
                    onClick={handleClickEventCreate} />}
                columns={columns}
                data={resources}
                loading={fetchLoading}
                rows={handleRow} />
        ),
        [LayoutStates.UPDATE]: (
            <DeveloperPageFormUpdate
                resource={pageSelected!}
                onClose={handleCloseEvent}
                onFormSubmit={handleFormSubmittionEventUpdate} />
        ),
        [LayoutStates.CREATE]: (
            <DeveloperPageFormCreate
                onClose={handleCloseEvent}
                onFormSubmit={handleFormSubmittionEventCreate} />
        )
    }), [handleClickEventCreate, resources, fetchLoading, handleRow, pageSelected, handleCloseEvent, handleFormSubmittionEventUpdate, handleFormSubmittionEventCreate]);


    return (<>{view[currenState]}</>)
}

export { DeveloperPages }
