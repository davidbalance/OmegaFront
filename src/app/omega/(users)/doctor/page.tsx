'use client'

import DoctorCreateCredential from '@/components/doctor/doctor-create-credential/DoctorCreateCredential';
import { DoctorLayout } from '@/components/doctor/doctor-layout/DoctorLayout';
import { DoctorSignatureUpload } from '@/components/doctor/doctor-signature-upload/DoctorSignatureUpload';
import { useDoctor } from '@/hooks';
import React, { useState } from 'react'

enum LayoutState {
    DEFAULT,
    CREATE_CREDENTIAL,
    UPLOAD_SIGNATURE
}

const Doctor: React.FC = () => {

    const doctorHook = useDoctor(true);

    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);

    const handleCreateCredentialEvent = (index: number) => {
        doctorHook.selectItem(index);
        setCurrentState(LayoutState.CREATE_CREDENTIAL)
    }

    const handleUploadSignatureEvent = (index: number) => {
        doctorHook.selectItem(index);
        setCurrentState(LayoutState.UPLOAD_SIGNATURE)
    }

    const handleClose = () => {
        doctorHook.find();
        setCurrentState(LayoutState.DEFAULT);
    }

    const view: Record<LayoutState, React.ReactNode> = {
        [LayoutState.CREATE_CREDENTIAL]: <DoctorCreateCredential
            user={doctorHook.doctor?.user!}
            onClose={handleClose} />,
        [LayoutState.UPLOAD_SIGNATURE]: <DoctorSignatureUpload
            doctor={doctorHook.doctor!}
            onClose={handleClose} />,
        [LayoutState.DEFAULT]: <>
            <DoctorLayout
                load={doctorHook.loading}
                doctors={doctorHook.doctors}
                events={{
                    onCreateCredential: handleCreateCredentialEvent,
                    onUploadSignature: handleUploadSignatureEvent
                }} />
        </>,
    }

    return (
        <>
            {view[currentState]}
        </>
    )
}

export default Doctor