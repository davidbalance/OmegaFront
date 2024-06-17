'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { notifications } from '@mantine/notifications';
import { LoadingOverlay } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useList } from '@/hooks/useList';
import { useFetch } from '@/hooks/useFetch/useFetch';
import { useConfirmation } from '@/contexts/confirmation/confirmation.context';
import { ResponsiveButton } from '@/components/buttons/responsive-button/ResponsiveButton';
import { Doctor } from '@/lib/dtos/user/doctor.response.dto';
import { User } from '@/lib/dtos/user/user.response.dto';
import { ListElement } from '@/components/layout/list-layout/ListLayout';
import { DoctorSignatureUpload } from '@/components/doctor/doctor-signature-upload/DoctorSignatureUpload';
import { DoctorActionButton } from '@/components/doctor/action/DoctorActionButton';
import { DoctorCreateCredential } from '@/components/doctor/doctor-create-credential/DoctorCreateCredential';

type DoctorDataType = Omit<Doctor, 'user'> & Omit<User, 'id'>;
const parseDoctor = (doctors: Doctor[]): DoctorDataType[] => doctors.map<DoctorDataType>((e) => ({
    id: e.id,
    dni: e.user.dni,
    name: e.user.name,
    lastname: e.user.lastname,
    email: e.user.email,
    hasCredential: e.user.hasCredential
}));


enum LayoutState {
    DEFAULT,
    CREATE_CREDENTIAL,
    UPLOAD_SIGNATURE,
}

const columns: ColumnOptions<Doctor>[] = [
    {name: "id", key: "id"},
    {name: "User", key: "user"},
]

const DoctorPage: React.FC = () => {

    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [selected, setSelected] = useState<Doctor | null>(null);
    const [shouldDeleteDoctor, setShouldDeleteDoctor] = useState<boolean>(false);

    const [doctors, {
        override: doctorOverride,
        remove: doctorRemove,
    }] = useList<Doctor>([]);

    const {
        data: fetchDoctors,
        error: fetchDoctorsError,
        loading: fetchDoctorsLoading
    } = useFetch<Doctor[]>('/api/doctors', 'GET');

    const {
        data: deleteData,
        error: deleteError,
        loading: deleteLoading,
        reload: deleteReload
    } = useFetch<any>(`/api/doctors/${selected?.id!}`, 'DELETE', { loadOnMount: false });

    const parsedDoctors = useMemo(() => parseDoctor(fetchDoctors || []), [fetchDoctors]);

    const handleClickEventUploadSignature = useCallback((doctor: Doctor) => {
        setSelected(doctor);
        setCurrentState(LayoutState.UPLOAD_SIGNATURE);
    }, []);

    const handleClickEventClose = useCallback(() => {
        setSelected(null);
        setCurrentState(LayoutState.DEFAULT);
    }, []);

    useEffect(() => {
        if (fetchDoctorsError) notifications.show({ message: fetchDoctorsError.message, color: 'red' });
        else if (deleteError) notifications.show({ message: deleteError.message, color: 'red' });
    }, [fetchDoctorsError, deleteError]);

    useEffect(() => {
        if (fetchDoctors) doctorOverride(fetchDoctors);
    }, [fetchDoctors, doctorOverride]);

    useEffect(() => {
        if (selected && shouldDeleteDoctor) {
            deleteReload();
            setShouldDeleteDoctor(false);
        }
    }, [selected, shouldDeleteDoctor]);

    useEffect(() => {
        if (deleteData) {
            doctorRemove('id', selected?.id!);
            setSelected(null);
        }
    }, [deleteData, doctorRemove]);


    const view: Record<LayoutState, React.ReactNode> = useMemo(() => ({
        [LayoutState.CREATE_CREDENTIAL]: <DoctorCreateCredential
            user={{
                id: selected?.user.id!,
                email: selected?.user.email!
            }}
            onClose={handleClickEventClose}
            // doctor={selected!}
        />,
        [LayoutState.UPLOAD_SIGNATURE]: <DoctorSignatureUpload
            onClose={handleClickEventClose}
            doctor={selected!}
        />,
        [LayoutState.DEFAULT]:
            <TableLayout<Doctor>
                title={'Doctores'}
                columns={columns}
                data={doctors}
                isLoading={fetchDoctorsLoading}
                action={{
                    name: 'Acciones',
                    child: (props) => <DoctorActionButton
                        onCreateCredential={() => handleClickEventUploadSignature(props.value)}
                        onUploadSignature={() => handleClickEventUploadSignature(props.value)}
                        {...props} />
                }}
            />
    }), [
        handleClickEventClose,
        handleClickEventClose,
        selected,
        handleClickEventClose,
        doctors,
        fetchDoctorsLoading,
        handleClickEventUploadSignature,
    ]);

    return <>
        <LoadingOverlay visible={deleteLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        {view[currentState]}
    </>
}

export default DoctorPage