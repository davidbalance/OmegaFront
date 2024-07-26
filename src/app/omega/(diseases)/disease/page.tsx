'use client'

import { ButtonResponsive } from '@/components/button/responsive/ButtonResponsive';
import DiseaseActionMenu from '@/components/disease/action/DiseaseActionMenu';
import { DiseaseFormCreate } from '@/components/disease/form/DiseaseFormCreate';
import { DiseaseFormUpdate } from '@/components/disease/form/DiseaseFormUpdate';
import { DiseaseFormUpdateGroup } from '@/components/disease/form/DiseaseFormUpdateGroup';
import DiseaseGroupActionMenu from '@/components/disease/group/action/DiseaseGroupActionMenu';
import { DiseaseGroupFormCreate } from '@/components/disease/group/form/DiseaseGroupFormCreate';
import { DiseaseGroupFormUpdate } from '@/components/disease/group/form/DiseaseGroupFormUpdate';
import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { ListElement } from '@/components/layout/list-layout/types';
import { MultipleTierLayout, TierElement } from '@/components/layout/multiple-tier-layout/MultipleTierLayout';
import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { DiseaseGroup } from '@/lib/dtos/disease/group/response.dto';
import { Disease } from '@/lib/dtos/disease/response.dto';
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

type DiseaseGroupType = Omit<DiseaseGroup, 'diseases'>;

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
        remove: groupRemove
    }] = useList<DiseaseGroup>([]);

    const [diseases, {
        override: diseaseOverride,
        append: diseaseAppend,
        update: diseaseUpdate,
        remove: diseaseRemove
    }] = useList<Disease>([]);

    const confirmation = useConfirmation();

    const [selectedGroup, setSelectedGroup] = useState<DiseaseGroup | null>(null);
    const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);

    const [shouldDeleteGroup, setShouldDeleteGroup] = useState<boolean>(false);
    const [shouldDeleteDisease, setShouldDeleteDisease] = useState<boolean>(false);

    const {
        data: fetchGroups,
        error: groupError,
        loading: groupLoading
    } = useFetch<DiseaseGroup[]>('/api/diseases/groups', 'GET');

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
    }, [selectedGroup, diseaseOverride]);

    useEffect(() => {
        if (groupError) notifications.show({ message: groupError.message, color: 'red' });
        else if (deleteGroupError) notifications.show({ message: deleteGroupError.message, color: 'red' });
        else if (deleteDiseaseError) notifications.show({ message: deleteDiseaseError.message, color: 'red' });
    }, [groupError, deleteGroupError, deleteDiseaseError]);

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
    }, [deleteGroup, selectedGroup, deleteGroupReset, groupRemove]);

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
    }, [deleteDisease, selectedDisease, deleteDiseaseReset, diseaseRemove]);

    const handleClickEventSelectGroup = useCallback((data: DiseaseGroup) => {
        setSelectedGroup(data);
        setActive(1);
    }, []);

    const handleClickEventCreateGroup = useCallback(() => {
        setCurrentState(LayoutState.CREATE_GROUP);
    }, []);

    const handleClickEventUpdateGroup = useCallback((data: DiseaseGroup) => {
        setSelectedGroup(data);
        setCurrentState(LayoutState.UPDATE_GROUP);
    }, []);

    const handleClickEventDeleteGroup = useCallback(async (data: DiseaseGroup) => {
        setSelectedGroup(data);
        const state = await confirmation.show('Eliminacion de grupos de morbilidades', `La morbilidad ${data.name} va a ser eliminada. ¿Esta seguro?`);
        if (state) {
            if (!data.diseases.length) {
                setShouldDeleteGroup(true);
            } else {
                notifications.show({ message: 'Este grupo tiene morbilidades asociadas', color: 'red' });
                setSelectedGroup(null);
            }
        } else {
            setSelectedGroup(null);
        }
    }, [confirmation]);

    const handleClickEventCreateDisease = useCallback(() => {
        setCurrentState(LayoutState.CREATE_DISEASE);
    }, []);

    const handleClickEventUpdateDisease = useCallback((data: Disease) => {
        setSelectedDisease(data);
        setCurrentState(LayoutState.UPDATE_DISEASE);
    }, []);

    const handleClickEventUpdateDiseaseDiseaseGroup = useCallback((data: Disease) => {
        setSelectedDisease(data);
        setCurrentState(LayoutState.UPDATE_DISEASE_GROUP);
    }, []);

    const handleClickEventDeleteDisease = useCallback(async (data: Disease) => {
        setSelectedDisease(data);
        const state = await confirmation.show('Eliminacion de una morbilidad', `La morbilidad ${data.name} va a ser eliminado. ¿Esta seguro?`);
        if (state) {
            setShouldDeleteDisease(true);
        } else {
            setSelectedDisease(null);
        }
    }, [confirmation]);

    const handleGroupRow = useCallback((row: DiseaseGroup) => (
        <ListRow
            key={row.id}
            active={row.id === selectedGroup?.id}
            onClick={() => handleClickEventSelectGroup(row)}
            rightSection={<DiseaseGroupActionMenu
                onModification={() => handleClickEventUpdateGroup(row)}
                onDelete={() => handleClickEventDeleteGroup(row)} />}
        >
            <Title order={6}>{row.name}</Title>
        </ListRow>
    ), [selectedGroup, handleClickEventSelectGroup, handleClickEventUpdateGroup, handleClickEventDeleteGroup]);

    const handleDiseaseRow = useCallback((row: Disease) => (
        <ListRow
            key={row.id}
            rightSection={<DiseaseActionMenu
                onModification={() => handleClickEventUpdateDisease(row)}
                onDelete={() => handleClickEventDeleteDisease(row)}
                onGroupModification={() => handleClickEventUpdateDiseaseDiseaseGroup(row)} />}>
            <Title order={6}>{row.name}</Title>
        </ListRow>
    ), [handleClickEventUpdateDisease, handleClickEventDeleteDisease, handleClickEventUpdateDiseaseDiseaseGroup]);

    const createDiseaseGroupButton = useMemo(() => (
        <ButtonResponsive
            key='disease-group-create-button'
            label={'Nuevo grupo de morbilidades'}
            onClick={handleClickEventCreateGroup} />
    ), [handleClickEventCreateGroup]);

    const createDiseaseButton = useMemo(() => selectedGroup
        ? [<ButtonResponsive
            key='disease-group-create-button'
            label={'Nueva morbilidades'}
            onClick={handleClickEventCreateDisease} />]
        : undefined, [selectedGroup, handleClickEventCreateDisease]);

    const multipleLayerComponents = useMemo((): TierElement[] => [
        {
            title: 'Grupo de morbilidades',
            element: <ListLayout<DiseaseGroup>
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
    ], [
        groupLoading,
        groups,
        handleGroupRow,
        createDiseaseGroupButton,
        diseases,
        handleDiseaseRow,
        createDiseaseButton
    ]);

    const handleCloseTierEvent = useCallback(() => {
        setActive((prev) => {
            const newValue = prev - 1;
            if (newValue === 0) {
                setSelectedGroup(null);
            }
            return newValue;
        });
    }, []);

    const handleCloseStateEvent = useCallback(() => {
        setCurrentState(LayoutState.DEFAULT);
    }, []);

    const handleFormSubmittedEventCreateGroup = useCallback((data: DiseaseGroup) => {
        groupAppend({ ...data, diseases: [] });
    }, [groupAppend]);

    const handleFormSubmittedEventUpdateGroup = useCallback((data: DiseaseGroup) => {
        groupUpdate('id', data.id, { ...data, diseases: selectedGroup?.diseases || [] });
    }, [groupUpdate, selectedGroup]);


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
                onClose={handleCloseTierEvent} />
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
        handleCloseTierEvent,
        handleCloseStateEvent,
        handleFormSubmittedEventCreateGroup,
        selectedGroup,
        handleFormSubmittedEventUpdateGroup,
        handleFormSubmittedEventCreateDisease,
        selectedDisease,
        handleFormSubmittedEventUpdateDisease,
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