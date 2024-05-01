'use client'

import { DiseaseGroupCreate } from '@/components/disease-group/disease-group-create/DiseaseGroupCreate';
import DiseaseGroupDelete from '@/components/disease-group/disease-group-delete/DiseaseGroupDelete';
import { DiseaseGroupLayout } from '@/components/disease-group/disease-group-layout/DiseaseGroupLayout';
import { DiseaseGroupUpdate } from '@/components/disease-group/disease-group-update/DiseaseGroupUpdate';
import { ELoadDiseaseOnStart, useDiseaseGroup } from '@/hooks';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'

enum LayoutState {
    DEFAULT,
    CREATE,
    UPDATE
}
const DiseaseGroup: React.FC = () => {

    const diseaseGroupHook = useDiseaseGroup(ELoadDiseaseOnStart.FIND_ALL);

    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);

    const [deleteState, DeleteDisclosure] = useDisclosure(false);

    const handleCreateEvent = () => {
        setCurrentState(LayoutState.CREATE);
    }

    const handleUpdateEvent = (index: number) => {
        diseaseGroupHook.selectItem(index);
        setCurrentState(LayoutState.UPDATE);
    }

    const handleDeleteEvent = (index: number) => {
        diseaseGroupHook.selectItem(index);
        DeleteDisclosure.open();
    }

    const handleClose = () => {
        diseaseGroupHook.clearSelection();
        diseaseGroupHook.find();
        DeleteDisclosure.close();
        setCurrentState(LayoutState.DEFAULT);
    }

    const view: Record<LayoutState, React.ReactNode> = {
        [LayoutState.CREATE]: <DiseaseGroupCreate
            onClose={handleClose} />,
        [LayoutState.UPDATE]: <DiseaseGroupUpdate
            diseaseGroup={diseaseGroupHook.diseaseGroup!}
            onClose={handleClose} />,
        [LayoutState.DEFAULT]: <>
            <DiseaseGroupDelete
                opened={deleteState}
                onClose={handleClose}
                target={diseaseGroupHook.diseaseGroup?.id!} />
            <DiseaseGroupLayout
                load={diseaseGroupHook.loading}
                diseaseGroups={diseaseGroupHook.diseaseGroups}
                events={{
                    onCreate: handleCreateEvent,
                    onModification: handleUpdateEvent,
                    onDelete: handleDeleteEvent,
                }} />
        </>,
    };

    return <>
        {
            view[currentState]
        }
    </>;
}

export default DiseaseGroup