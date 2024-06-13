'use client'

import { ResponsiveButton } from '@/components/buttons/responsive-button/ResponsiveButton';
import DiseaseActionMenu from '@/components/disease/action/menu/DiseaseActionMenu';
import { DiseaseUpdate } from '@/components/disease/disease-update/DiseaseUpdate';
import { DiseaseFormCreate } from '@/components/disease/form/DiseaseFormCreate';
import { DiseaseFormUpdate } from '@/components/disease/form/DiseaseFormUpdate';
import { DiseaseFormUpdateGroup } from '@/components/disease/form/DiseaseFormUpdateGroup';
import DiseaseGroupActionMenu from '@/components/disease/group/action-menu/DiseaseGroupActionMenu';
import { DiseaseGroupFormCreate } from '@/components/disease/group/form/DiseaseGroupFormCreate';
import { DiseaseGroupFormUpdate } from '@/components/disease/group/form/DiseaseGroupFormUpdate';
import { ListElement, ListLayout } from '@/components/layout/list-layout/ListLayout';
import { ListRowElement } from '@/components/layout/list-layout/ListRowElement';
import MultipleTierLayout, { TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useList } from '@/hooks/useList';
import { DiseaseGroup } from '@/services/api/disease-group/dtos';
import { Disease, DiseaseDiseaseGroup } from '@/services/api/disease/dtos';
import { LoadingOverlay, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutState {
    DEFAULT,
    CREATE_GROUP,
    UPDATE_GROUP,
    CREATE_DISEASE,
    UPDATE_DISEASE,
    UPDATE_DISEASE_GROUP,
}

type DiseaseGroupType = Omit<DiseaseDiseaseGroup, 'diseases'>;

const columnDiseaseGroup: ListElement<DiseaseGroupType>[] = [
    { key: 'name', name: 'Grupo' }
]

const columnDisease: ListElement<Disease>[] = [
    { key: 'name', name: 'Morbilidad' }
]


const DiseasePage: React.FC = () => {

    const [active, setActive] = useState(0);
    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);

    const [groups, {
        override: groupOverride,
        append: groupAppend,
        update: groupUpdate,
        remove: groupRemove }] = useList<DiseaseDiseaseGroup>([]);

    const [diseases, {
        override: diseaseOverride,
        append: diseaseAppend,
        update: diseaseUpdate,
        remove: diseaseRemove }] = useList<Disease>([]);

    const confirmation = useConfirmation();

    const [selectedGroup, setSelectedGroup] = useState<DiseaseDiseaseGroup | null>(null);
    const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

    const [shouldDeleteGroup, setShouldDeleteGroup] = useState<boolean>(false);
    const [shouldDeleteDisease, setShouldDeleteDisease] = useState<boolean>(false);

    const {
        data: fetchGroups,
        error: groupError,
        loading: groupLoading
    } = useFetch<DiseaseDiseaseGroup[]>('/api/diseases/groups', 'GET');

    const {
        data: deleteGroup,
        error: deleteGroupError,
        loading: deleteGroupLoading,
        reload: deleteGroupReload,
        reset: deleteGroupReset,
    } = useFetch(`/api/diseases/groups/${selectedGroup?.id}`, 'DELETE', { loadOnMount: false });

    const {
        data: deleteDisease,
        error: deleteDiseaseError,
        loading: deleteDiseaseLoading,
        reload: deleteDiseaseReload,
        reset: deleteDiseaseReset,
    } = useFetch(`/api/diseases/${selectedDisease?.id}`, 'DELETE', { loadOnMount: false });

    useEffect(() => {
        if (fetchGroups) {
            groupOverride(fetchGroups);
        }
    }, [fetchGroups, groupOverride]);

    useEffect(() => {
        if (selectedGroup) {
            diseaseOverride(selectedGroup.diseases);
        }
    }, [selectedGroup]);

    useEffect(() => {
        if (groupError) notifications.show({ message: groupError.message, color: 'red' });
        else if (deleteGroupError) notifications.show({ message: deleteGroupError.message, color: 'red' });
        else if (deleteDiseaseError) notifications.show({ message: deleteDiseaseError.message, color: 'red' });
    }, [groupError, deleteGroupError]);

    useEffect(() => {
        if (shouldDeleteGroup && selectedGroup) {
            deleteGroupReload();
            setShouldDeleteGroup(false);
        }
    }, [shouldDeleteGroup, selectedGroup, deleteGroupReload]);
    
    
    useEffect(() => {
        if (shouldDeleteDisease && selectedDisease) {
            deleteDiseaseReload();
            setShouldDeleteDisease(false);
        }
    }, [shouldDeleteDisease, selectedDisease, deleteDiseaseReload]);

    useEffect(() => {
        if (deleteGroup && selectedGroup) {
            groupRemove('id', selectedGroup.id);
            setSelectedGroup(null);
            deleteGroupReset();
        }
    }, [deleteGroup, selectedGroup, deleteGroupReset]);

    useEffect(() => {
        if (deleteDisease && selectedDisease) {
            deleteDiseaseReload();
            setShouldDeleteDisease(false);
        }
    }, [deleteDisease, selectedDisease, deleteDiseaseReload]);

    useEffect(() => {
        if (deleteDisease && selectedDisease) {
            diseaseRemove('id', selectedDisease.id);
            setSelectedDisease(null);
            deleteDiseaseReset();
        }
    }, [deleteDisease, selectedDisease, deleteDiseaseReset]);

    const handleClickEventSelectGroup = (data: DiseaseDiseaseGroup) => {
        setSelectedGroup(data);
        setActive(1);
    }

    const handleClickEventCreateGroup = () => {
        setCurrentState(LayoutState.CREATE_GROUP);
    }

    const handleClickEventUpdateGroup = (data: DiseaseDiseaseGroup) => {
        setSelectedGroup(data);
        setCurrentState(LayoutState.UPDATE_GROUP);
    }

    const handleClickEventDeleteGroup = useCallback(async (data: DiseaseDiseaseGroup) => {
        setSelectedGroup(data);
        const state = await confirmation.show('Eliminacion de morbilidades', `La morbilidad ${data.name} va a ser eliminada. ¿Esta seguro?`);
        if (state) {
            setShouldDeleteGroup(true);
        } else {
            setSelectedGroup(null);
        }
    }, [confirmation]);

    const handleClickEventCreateDisease = () => {
        setCurrentState(LayoutState.CREATE_DISEASE);
    }

    const handleClickEventUpdateDisease = (data: Disease) => {
        setSelectedDisease(data);
        setCurrentState(LayoutState.UPDATE_DISEASE);
    }

    const handleClickEventUpdateDiseaseDiseaseGroup = (data: Disease) => {
        setSelectedDisease(data);
        setCurrentState(LayoutState.UPDATE_DISEASE_GROUP);
    }

    const handleClickEventDeleteDisease = useCallback(async (data: Disease) => {
        setSelectedDisease(data);
        const state = await confirmation.show('Eliminacion de una morbilidad', `La morbilidad ${data.name} va a ser eliminado. ¿Esta seguro?`);
        if (state) {
            setShouldDeleteDisease(true);
        } else {
            setSelectedDisease(null);
        }
    }, [confirmation]);

    const handleGroupRow = useCallback((row: DiseaseDiseaseGroup) => (
        <ListRowElement
            key={row.id}
            active={row.id === selectedGroup?.id}
            onClick={() => handleClickEventSelectGroup(row)}
            rightSection={<DiseaseGroupActionMenu
                onModification={() => handleClickEventUpdateGroup(row)}
                onDelete={() => handleClickEventDeleteGroup(row)} />}
        >
            <Title order={6}>{row.name}</Title>
        </ListRowElement>
    ), [selectedGroup]);

    const handleDiseaseRow = useCallback((row: Disease) => (
        <ListRowElement
            key={row.id}
            rightSection={<DiseaseActionMenu
                onModification={() => handleClickEventUpdateDisease(row)}
                onDelete={() => handleClickEventDeleteDisease(row)}
                onGroupModification={() => handleClickEventUpdateDiseaseDiseaseGroup(row)} />}>
            <Title order={6}>{row.name}</Title>
        </ListRowElement>
    ), []);

    const createDiseaseGroupButton = useMemo(() => <ResponsiveButton
        key='disease-group-create-button'
        label={'Nuevo grupo de morbilidades'}
        onClick={handleClickEventCreateGroup} />, [handleClickEventCreateGroup]);

    const createDiseaseButton = useMemo(() => selectedGroup
        ? [<ResponsiveButton
            key='disease-group-create-button'
            label={'Nueva morbilidades'}
            onClick={handleClickEventCreateDisease} />]
        : undefined, [selectedGroup, handleClickEventCreateDisease]);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Grupo de morbilidades',
            element: <ListLayout<DiseaseDiseaseGroup>
                key='group-list-layout'
                loading={groupLoading}
                data={groups}
                columns={columnDiseaseGroup}
                rows={handleGroupRow}
                dock={[createDiseaseGroupButton]}
                size={100}
            />,
        },
        {
            title: 'Mobilidades',
            element: <ListLayout<Disease>
                key='disease-list-layout'
                loading={false}
                data={diseases}
                columns={columnDisease}
                rows={handleDiseaseRow}
                dock={createDiseaseButton}
            />,
        }
    ], [groupLoading, groups, handleGroupRow, createDiseaseGroupButton, diseases, handleDiseaseRow, createDiseaseButton]);

    const handleCloseTier = useCallback(() => {
        setActive((prev) => {
            const newValue = prev - 1;
            if (newValue === 0) {
                setSelectedGroup(null);
            }
            return newValue;
        });
    }, []);

    const handleCloseStateEvent = () => {
        setCurrentState(LayoutState.DEFAULT);
    }

    const handleFormSubmittedEventCreateGroup = useCallback((data: DiseaseGroup) => {
        groupAppend({ ...data, diseases: [] });
    }, [groupAppend]);

    const handleFormSubmittedEventUpdateGroup = useCallback((data: DiseaseGroup) => {
        groupUpdate('id', data.id, { ...data, diseases: selectedGroup?.diseases || [] });
    }, [groupAppend, selectedGroup]);


    const handleFormSubmittedEventCreateDisease = useCallback((data: Disease) => {
        diseaseAppend(data);
    }, [diseaseAppend]);

    const handleFormSubmittedEventUpdateDisease = useCallback((data: Disease) => {
        diseaseUpdate('id', data.id, data);
    }, [diseaseUpdate]);

    const handleFormSubmittedEventUpdateDiseaseGroup = useCallback((data: Disease & { group: number }) => {
        if (selectedGroup) {
            if (data.group !== selectedGroup.id) {
                diseaseRemove('id', data.id);
                const newGroup = groups.find(e => e.id === data.group);
                if (newGroup) {
                    const newDiseaseArr = [...newGroup.diseases, { ...data }];
                    groupUpdate('id', data.group, { ...newGroup, diseases: newDiseaseArr });
                    groupUpdate('id', selectedGroup?.id, { ...selectedGroup, diseases: diseases.filter(e => e.id !== data.id) });
                }
            }
        }
    }, [groupUpdate, diseaseRemove, diseases, groups, selectedGroup]);

    const groupSelectionOptions = useMemo(() => groups.map(e => ({ value: `${e.id}`, label: e.name })), [groups]);

    const view = useMemo((): Record<LayoutState, React.ReactNode> => ({
        [LayoutState.DEFAULT]: (
            <MultipleTierLayout
                elements={multipleLayerComponents}
                tier={active}
                onClose={handleCloseTier} />
        ),
        [LayoutState.CREATE_GROUP]: <DiseaseGroupFormCreate
            onClose={handleCloseStateEvent}
            onFormSubmitted={handleFormSubmittedEventCreateGroup} />,
        [LayoutState.UPDATE_GROUP]: <DiseaseGroupFormUpdate
            diseaseGroup={selectedGroup!}
            onFormSubmitted={handleFormSubmittedEventUpdateGroup}
            onClose={handleCloseStateEvent} />,
        [LayoutState.CREATE_DISEASE]: <DiseaseFormCreate
            onClose={handleCloseStateEvent}
            onFormSubmitted={handleFormSubmittedEventCreateDisease}
            group={selectedGroup?.id!} />,
        [LayoutState.UPDATE_DISEASE]: <DiseaseFormUpdate
            disease={selectedDisease!}
            onClose={handleCloseStateEvent}
            onFormSubmitted={handleFormSubmittedEventUpdateDisease}
            group={selectedGroup?.id!} />,
        [LayoutState.UPDATE_DISEASE_GROUP]: <DiseaseFormUpdateGroup
            disease={selectedDisease!}
            onClose={handleCloseStateEvent}
            onFormSubmitted={handleFormSubmittedEventUpdateDiseaseGroup}
            group={selectedGroup?.id!}
            groups={groupSelectionOptions} />
    }), [
        multipleLayerComponents,
        active,
        handleCloseTier,
        handleCloseStateEvent,
        handleFormSubmittedEventCreateGroup,
        selectedGroup,
        handleFormSubmittedEventUpdateGroup,
        handleCloseStateEvent,
        handleCloseStateEvent,
        handleFormSubmittedEventCreateDisease,
        selectedDisease,
        handleCloseStateEvent,
        handleFormSubmittedEventUpdateDisease,
        handleCloseStateEvent,
        handleFormSubmittedEventUpdateDiseaseGroup,
        groupSelectionOptions
    ]);

    return (
        <>
            <LoadingOverlay visible={deleteGroupLoading || deleteDiseaseLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            {view[currentState]}</>
    )
}

export default DiseasePage