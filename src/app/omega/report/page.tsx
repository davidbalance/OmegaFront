'use client'

import { MedicalResultLayout } from '@/components/medical-result/medical-result-layout/MedicalResultLayout';
import MedicalResultReportForm from '@/components/medical-result/medical-result-report-form/MedicalResultReportForm';
import { useMedicalResult } from '@/hooks/useMedicalResult';
import React, { useState } from 'react'

enum LayoutStates {
    DEFAULT,
    INSERT_REPORT
}

const MedicalReport: React.FC = () => {

    const medicalResultHook = useMedicalResult(true);

    const [currentState, setCurrentState] = useState<LayoutStates>(LayoutStates.DEFAULT);

    const handleCreateEvent = (index: number) => {
        medicalResultHook.selectItem(index);
        setCurrentState(LayoutStates.INSERT_REPORT);
    }

    const handleClose = () => {
        medicalResultHook.clearSelection();
        medicalResultHook.find();
        setCurrentState(LayoutStates.DEFAULT);
    }

    const view: Record<LayoutStates, React.ReactNode> = {
        [LayoutStates.INSERT_REPORT]: <MedicalResultReportForm
            result={medicalResultHook.medicalResult!}
            onClose={handleClose} />,
        [LayoutStates.DEFAULT]: <>
            <MedicalResultLayout
                load={medicalResultHook.loading}
                medicalResults={medicalResultHook.medicalResults}
                events={{
                    onCreate: handleCreateEvent
                }} />
        </>,
    }

    return <>
        {
            view[currentState]
        }
    </>
}

export default MedicalReport