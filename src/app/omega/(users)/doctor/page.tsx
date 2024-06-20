'use client'

import { DoctorActionMenu } from '@/components/doctor/action/DoctorActionMenu';
import { DoctorFormCreateCredential } from '@/components/doctor/form/DoctorFormCreateCredential';
import { DoctorFormUploadSignature } from '@/components/doctor/form/DoctorFormUploadSignature';
import { ActionColumnProps, ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { UserFormAssignCompanyAttribute } from '@/components/user/form/UserFormAssignCompanyAttribute';
import { useFetch } from '@/hooks/useFetch'
import { useList } from '@/hooks/useList';
import { Doctor } from '@/lib/dtos/user/doctor.response.dto';
import { User } from '@/lib/dtos/user/user.response.dto';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

type DoctorDataType = Omit<Doctor, 'user'> & Omit<User, 'id'> & { user: number, hasCredential: boolean };
const parseDoctor = (patients: Doctor[]): DoctorDataType[] => patients.map<DoctorDataType>((e) => ({
    id: e.id,
    dni: e.user.dni,
    name: e.user.name,
    lastname: e.user.lastname,
    email: e.user.email,
    user: e.user.id,
    hasCredential: e.user.hasCredential
}));

enum LayoutState {
    DEFAULT,
    CREATE_CREDENTIAL,
    UPLOAD_SIGNATURE,
    UPDATE_COMPANY,
}

const columnsDoctor: ColumnOptions<DoctorDataType>[] = [
    { key: 'dni', name: 'CI' },
    { key: 'name', name: 'Nombre' },
    { key: 'lastname', name: 'Apellido' },
    { key: 'email', name: 'Correo Electronico' }
]

const DoctorPage: React.FC = () => {

    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorDataType | null>(null);

    const {
        data: fetchData,
        error: fetchError,
        loading: fetchLoading
    } = useFetch<Doctor[]>('/api/doctors', 'GET');

    const [doctors, {
        append: doctorAppend,
        override: doctorOverride,
        remove: doctorRemove,
        update: doctorUpdate
    }] = useList<DoctorDataType>([]);

    const parsedDoctors = useMemo(() => parseDoctor(fetchData || []), [fetchData])

    const handleClickEventCreateCredential = useCallback((data: DoctorDataType) => {
        setSelectedDoctor(data);
        setCurrentState(LayoutState.CREATE_CREDENTIAL);
    }, []);

    const handleClickEventAssignCompany = useCallback((data: DoctorDataType) => {
        setSelectedDoctor(data);
        setCurrentState(LayoutState.UPDATE_COMPANY);
    }, []);

    const handleClickEventSignatureUpdaload = useCallback((data: DoctorDataType) => {
        setCurrentState(LayoutState.UPLOAD_SIGNATURE);
        setSelectedDoctor(data);
    }, []);

    const handleCloseEvent = useCallback(() => {
        setCurrentState(LayoutState.DEFAULT);
        setSelectedDoctor(null);
    }, []);

    const handleTableAction = useCallback((prop: ActionColumnProps<DoctorDataType>) => (
        <DoctorActionMenu
            onCreateCredential={() => handleClickEventCreateCredential(prop.value)}
            onAssignCompany={() => handleClickEventAssignCompany(prop.value)}
            createCredential={!prop.value.hasCredential}
            onUploadSignature={() => handleClickEventSignatureUpdaload(prop.value)}
        />
    ), [handleClickEventCreateCredential, handleClickEventAssignCompany, handleClickEventSignatureUpdaload]);

    const handleFormSubmittion = useCallback((id: number) => {
        doctorUpdate('user', id, { hasCredential: true });
    }, [doctorUpdate]);

    useEffect(() => {
        if (fetchError) notifications.show({ message: fetchError.message, color: 'red' });
    }, [fetchError]);

    useEffect(() => {
        if (parsedDoctors.length > 0) doctorOverride(parsedDoctors);
    }, [parsedDoctors, doctorOverride]);

    const view = useMemo(() => ({
        [LayoutState.CREATE_CREDENTIAL]: (
            <DoctorFormCreateCredential
                doctor={{
                    id: selectedDoctor?.user!,
                    email: selectedDoctor?.email!
                }}
                onFormSubmittion={handleFormSubmittion}
                onClose={handleCloseEvent} />
        ),
        [LayoutState.UPLOAD_SIGNATURE]: (
            <DoctorFormUploadSignature
                doctor={selectedDoctor?.id!}
                onClose={handleCloseEvent} />
        ),
        [LayoutState.UPDATE_COMPANY]: (
            <UserFormAssignCompanyAttribute
                url={`/api/users/attribute/doctor/of/${selectedDoctor?.user}`}
                onClose={handleCloseEvent} />
        ),
        [LayoutState.DEFAULT]: (
            <TableLayout<DoctorDataType>
                title={'Medicos'}
                columns={columnsDoctor}
                data={doctors}
                isLoading={fetchLoading}
                action={{
                    name: 'Acciones',
                    child: handleTableAction
                }}
            />
        ),
    }), [doctors, fetchLoading, handleTableAction, handleFormSubmittion, handleCloseEvent, selectedDoctor]);

    return (
        <>{view[currentState]}</>
    )
}

export default DoctorPage