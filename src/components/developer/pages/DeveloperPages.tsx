import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement, ListRowElementProps } from '@/components/layout/list-layout/ListRowElement';
import { NavIcon } from '@/components/navbar/NavIcon';
import { SystemLogo } from '@/components/navbar/nav/logo/logos';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { WebFullResource } from '@/lib/dtos/web/resources.response.dto';
import { Flex, Grid, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DeveloperPagesActionMenu } from './action/DeveloperPagesActionMenu';
import { ButtonResponsive } from '@/components/button/responsive/ButtonResponsive';
import { DeveloperPageFormCreate } from './form/DeveloperPageFormCreate';
import { DeveloperPageFormUpdate } from './form/DeveloperPageFormUpdate';

enum LayoutStates {
    DEFAULT,
    UPDATE,
    CREATE
}

const columns: ListElement<WebFullResource>[] = [
    { name: 'Label', key: 'label' },
    { name: 'Direccion', key: 'address' },
    { name: 'Icono', key: 'icon' },
]

const DeveloperPages: React.FC = () => {

    const [currenState, setCurrenState] = useState<LayoutStates>(LayoutStates.DEFAULT);
    const [pageSelected, setPageSelected] = useState<WebFullResource | null>(null);

    const {
        data: fetchData,
        error: fetchError,
        loading: fetchLoading
    } = useFetch<WebFullResource[]>('/api/web/resources/all', 'GET');

    const [resources, {
        override: overrideResource,
        append: appendResource,
        update: updateResource,
        remove: removeResource
    }] = useList<WebFullResource>([]);

    const handleClickEventModification = useCallback((data: WebFullResource) => {
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

    const handleRow = useCallback((row: WebFullResource) => {
        const Icon = NavIcon[row.icon];
        return <ListRowElement
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
        </ListRowElement>
    }, [handleClickEventModification, handleClickEventDelete]);

    const handleFormSubmittionEventCreate = useCallback((value: WebFullResource) => {
        appendResource(value);
    }, [appendResource])

    const handleFormSubmittionEventUpdate = useCallback((value: WebFullResource) => {
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
            <ListLayout<WebFullResource>
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

export default DeveloperPages