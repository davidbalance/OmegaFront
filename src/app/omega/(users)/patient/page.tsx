'use client'

import { PatientLayout } from '@/components/patient/patient-layout/PatientLayout';
import { usePatient } from '@/hooks';
import React, { useState } from 'react'

enum LayoutState {
    DEFAULT
}

const Patient: React.FC = () => {

    const patientHook = usePatient(true);

    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);

    const view: Record<LayoutState, React.ReactNode> = {
        [LayoutState.DEFAULT]: <>
            <PatientLayout load={patientHook.loading} patients={patientHook.patients} />
        </>
    }

    return (
        <>
            {
                view[currentState]
            }
        </>
    )
}

export default Patient