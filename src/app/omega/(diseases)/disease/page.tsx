'use client'

import { DiseaseCreate } from '@/components/disease/disease-create/DiseaseCreate';
import { DiseaseDeleteDialog } from '@/components/disease/disease-delete-dialog/DiseaseDeleteDialog';
import { DiseaseLayout } from '@/components/disease/disease-layout/DiseaseLayout';
import { DiseaseUpdate } from '@/components/disease/disease-update/DiseaseUpdate';
import { useDisease } from '@/hooks'
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'

enum LayoutState {
    DEFAULT,
    CREATE,
    UPDATE
}

const Disease: React.FC = () => {

    const diseaseHook = useDisease(true);
    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);

    const [deleteState, DeleteDisclosure] = useDisclosure(false);

    const handleCreateEvent = () => {
        setCurrentState(LayoutState.CREATE);
    }

    const handleUpdateEvent = (index: number) => {
        diseaseHook.selectItem(index);
        setCurrentState(LayoutState.UPDATE);
    }

    const handleDeleteEvent = (index: number) => {
        diseaseHook.selectItem(index);
        DeleteDisclosure.open();
    }

    const handleClose = () => {
        diseaseHook.clearSelected();
        diseaseHook.find();
        DeleteDisclosure.close();
        setCurrentState(LayoutState.DEFAULT);
    }

    const view: Record<LayoutState, React.ReactNode> = {
        [LayoutState.CREATE]: <DiseaseCreate
            onClose={handleClose} />,
        [LayoutState.UPDATE]: <DiseaseUpdate
            disease={diseaseHook.disease!}
            onClose={handleClose} />,
        [LayoutState.DEFAULT]: <>
            <DiseaseDeleteDialog
                onClose={handleClose}
                opened={deleteState}
                disease={diseaseHook.disease?.id!} />
            <DiseaseLayout
                diseases={diseaseHook.diseases}
                load={diseaseHook.loading}
                events={{
                    onCreate: handleCreateEvent,
                    onModification: handleUpdateEvent,
                    onDelete: handleDeleteEvent
                }} />
        </>,
    }

    return (
        <>
            {
                view[currentState]
            }
        </>
    )
}

export default Disease