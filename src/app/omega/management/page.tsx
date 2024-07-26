'use client'

import { AreaActionButton } from '@/components/area/action/AreaActionButton';
import { AreaFormCreate } from '@/components/area/form/AreaFormCreate';
import { AreaFormUpdate } from '@/components/area/form/AreaFormUpdate';
import { AreaFormUpdateManagement } from '@/components/area/form/AreaFormUpdateManagement';
import { ButtonResponsive } from '@/components/button/responsive/ButtonResponsive';
import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { ManagementActionButton } from '@/components/management/action/ManagementActionButton';
import { ManagementFormCreate } from '@/components/management/form/ManagementFormCreate';
import { ManagementFormUpdate } from '@/components/management/form/ManagementFormUpdate';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { Area } from '@/lib/dtos/location/area/base.response.dto';
import { Management } from '@/lib/dtos/location/management/base.response.dto';
import { Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutState {
    DEFAULT,
    CREATE_MANAGEMENT,
    UPDATE_MANAGEMENT,
    CREATE_AREA,
    UPDATE_AREA,
    UPDATE_AREA_MANAGEMENT,
}

const columnDiseaseGroup: ListElement<Management>[] = [
    { key: 'name', name: 'Gerencia' }
]

const columnDisease: ListElement<Area>[] = [
    { key: 'name', name: 'Area' }
]

const ManagementPage: React.FC = () => {
    const [active, setActive] = useState(0);
    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);

    const [managements, {
        override: managementOverride,
        append: managementAppend,
        update: managementUpdate,
        remove: managementRemove
    }] = useList<Management>([]);

    const [areas, {
        override: areaOverride,
        append: areaAppend,
        update: areaUpdate,
        remove: areaRemove
    }] = useList<Area>([]);

    const [selectedManagement, setSelectedManagement] = useState<Management | null>(null);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);

    const {
        data: fetchManagements,
        error: managementError,
        loading: managementLoading
    } = useFetch<Management[]>('/api/management', 'GET');

    const handleClickEventSelectManagement = useCallback((data: Management) => {
        setSelectedManagement(data);
        setActive(1);
    }, []);

    const handleClickEventCreateManagement = useCallback(() => {
        setCurrentState(LayoutState.CREATE_MANAGEMENT);
    }, []);

    const handleClickEventCreateArea = useCallback(() => {
        setCurrentState(LayoutState.CREATE_AREA);
    }, []);

    const handleClickEventModificationManagement = useCallback((data: Management) => {
        setSelectedManagement(data);
        setCurrentState(LayoutState.UPDATE_MANAGEMENT);
    }, []);

    const handleClickEventModificationArea = useCallback((data: Area) => {
        setSelectedArea(data);
        setCurrentState(LayoutState.UPDATE_AREA);
    }, [])

    const handleClickEventModificationAreaChangeManagement = useCallback((data: Area) => {
        setSelectedArea(data);
        setCurrentState(LayoutState.UPDATE_AREA_MANAGEMENT);
    }, []);

    const handleDeleteEventManagement = useCallback((id: number) => {
        managementRemove('id', id);
    }, [managementRemove]);

    const handleDeleteEventArea = useCallback((id: number) => {
        areaRemove('id', id);
        if (selectedManagement) {
            const newAreaArr = selectedManagement.areas.filter((e) => e.id !== id);
            managementUpdate('id', selectedManagement.id, { areas: newAreaArr });
        }
    }, [selectedManagement, areaRemove, managementUpdate]);

    const handleClickEventClose = useCallback(() => {
        setCurrentState(LayoutState.DEFAULT);
    }, []);

    const handleManagementRow = useCallback((row: Management) => (
        <ListRow
            key={row.id}
            active={row.id === selectedManagement?.id}
            onClick={() => handleClickEventSelectManagement(row)}
            rightSection={(
                <ManagementActionButton
                    onModification={() => handleClickEventModificationManagement(row)}
                    onDelete={() => handleDeleteEventManagement(row.id)}
                    management={row} />
            )}>
            <Title order={6}>{row.name}</Title>
        </ListRow>
    ), [selectedManagement, handleClickEventSelectManagement, handleClickEventModificationManagement, handleDeleteEventManagement]);

    const handleAreaRow = useCallback((row: Area) => (
        <ListRow
            key={row.id}
            rightSection={(
                <AreaActionButton
                    area={row}
                    onModification={() => handleClickEventModificationArea(row)}
                    onDelete={() => handleDeleteEventArea(row.id)}
                    onChangeManagement={() => handleClickEventModificationAreaChangeManagement(row)} />
            )}>
            <Title order={6}>{row.name}</Title>
        </ListRow>
    ), [handleClickEventModificationArea, handleDeleteEventArea, handleClickEventModificationAreaChangeManagement]);

    const createManagementButton = useMemo(() => (
        <ButtonResponsive
            key='management-create-button'
            label={'Nueva gerencia'}
            onClick={handleClickEventCreateManagement} />
    ), [handleClickEventCreateManagement]);

    const createAreaButton = useMemo(() => selectedManagement
        ? [<ButtonResponsive
            key='area-create-button'
            label={'Nueva area'}
            onClick={handleClickEventCreateArea} />]
        : undefined, [selectedManagement, handleClickEventCreateArea]);


    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Gerencias',
            element: <ListLayout<Management>
                key='group-list-layout'
                loading={managementLoading}
                data={managements}
                columns={columnDiseaseGroup}
                rows={handleManagementRow}
                dock={[createManagementButton]}
                size={100}
            />,
        },
        {
            title: 'Areas',
            element: <ListLayout<Area>
                key='disease-list-layout'
                loading={false}
                data={areas}
                columns={columnDisease}
                rows={handleAreaRow}
                dock={createAreaButton}
            />,
        }
    ], [
        areas,
        managements,
        managementLoading,
        createManagementButton,
        createAreaButton,
        handleAreaRow,
        handleManagementRow,
    ]);

    const handleCloseTierEvent = useCallback(() => {
        setActive((prev) => {
            const newValue = prev - 1;
            if (newValue === 0) {
                setSelectedManagement(null);
            }
            return newValue;
        });
    }, []);

    const handleFormSubmittedEventCreateManagement = useCallback((newManagement: Management) => {
        managementAppend(newManagement);
    }, [managementAppend]);

    const handleFormSubmittedEventUpdateManagement = useCallback((newManagement: Management) => {
        managementUpdate('id', newManagement.id, newManagement);
    }, [managementUpdate]);

    const handleFormSubmittedEventUpdateArea = useCallback((newArea: Area) => {
        areaUpdate('id', newArea.id, newArea);
        if (selectedManagement && selectedManagement.areas) {
            const areaIndex = selectedManagement.areas.findIndex(e => e.id === newArea.id);
            const newAreaArr = selectedManagement.areas;
            newAreaArr[areaIndex] = newArea;
            managementUpdate('id', selectedManagement.id, { areas: newAreaArr });
        }
    }, [selectedManagement, managementUpdate, areaUpdate]);

    const handleFormSubmittedEventUpdateAreaManagement = useCallback((data: Area & { management: number }) => {
        if (selectedManagement) {
            if (data.management !== selectedManagement.id) {
                areaRemove('id', data.id);
                const newGroup = managements.find(e => e.id === data.management);
                if (newGroup) {
                    const newDiseaseArr = [...newGroup.areas, { ...data }];
                    managementUpdate('id', data.management, { ...newGroup, areas: newDiseaseArr });
                    managementUpdate('id', selectedManagement?.id, { ...selectedManagement, areas: areas.filter(e => e.id !== data.id) });
                }
            }
        }
    }, [managementUpdate, areaRemove, areas, managements, selectedManagement]);

    const handleFormSubmittedEventCreateArea = useCallback((newArea: Area) => {
        areaAppend(newArea);
        if (selectedManagement) {
            const currentAreaArr = selectedManagement.areas
                ? selectedManagement.areas
                : [];
            managementUpdate('id', selectedManagement.id, { areas: [...currentAreaArr, newArea] });
        }
    }, [selectedManagement, areaAppend, managementUpdate]);

    const managementsSelectionOptions = useMemo(() => managements.map(e => ({ value: `${e.id}`, label: e.name })), [managements]);

    const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
        [LayoutState.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTierEvent} />
        ),
        [LayoutState.CREATE_MANAGEMENT]: (
            <ManagementFormCreate
                onClose={handleClickEventClose}
                onFormSubmitted={handleFormSubmittedEventCreateManagement} />
        ),
        [LayoutState.UPDATE_MANAGEMENT]: (
            <ManagementFormUpdate
                management={selectedManagement!}
                onClose={handleClickEventClose}
                onFormSubmitted={handleFormSubmittedEventUpdateManagement} />
        ),
        [LayoutState.CREATE_AREA]: (
            <AreaFormCreate
                management={selectedManagement?.id!}
                onClose={handleClickEventClose}
                onFormSubmitted={handleFormSubmittedEventCreateArea} />
        ),
        [LayoutState.UPDATE_AREA]: (
            <AreaFormUpdate
                area={selectedArea!}
                management={selectedManagement?.id!}
                onFormSubmitted={handleFormSubmittedEventUpdateArea}
                onClose={handleClickEventClose} />
        ),
        [LayoutState.UPDATE_AREA_MANAGEMENT]: (
            <AreaFormUpdateManagement
                area={selectedArea!}
                management={selectedManagement?.id!}
                managements={managementsSelectionOptions}
                onFormSubmitted={handleFormSubmittedEventUpdateAreaManagement}
                onClose={handleClickEventClose} />
        )
    }), [
        multipleLayerComponents,
        active,
        selectedManagement,
        selectedArea,
        managementsSelectionOptions,
        handleCloseTierEvent,
        handleClickEventClose,
        handleFormSubmittedEventCreateManagement,
        handleFormSubmittedEventUpdateManagement,
        handleFormSubmittedEventCreateArea,
        handleFormSubmittedEventUpdateArea,
        handleFormSubmittedEventUpdateAreaManagement
    ]);

    useEffect(() => {
        if (fetchManagements) {
            managementOverride(fetchManagements);
        }
    }, [fetchManagements, managementOverride]);

    useEffect(() => {
        if (managementError) notifications.show({ message: managementError.message, color: 'red' });
    }, [managementError]);

    useEffect(() => {
        if (selectedManagement) {
            areaOverride(selectedManagement.areas || []);
        }
    }, [selectedManagement, areaOverride]);

    return (
        <>{view[currentState]}</>
    )
}

export default ManagementPage