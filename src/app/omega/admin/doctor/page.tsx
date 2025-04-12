<<<<<<< HEAD
import React from 'react'
import TableRoot from '@/components/_base/table/table-root'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Title } from '@mantine/core'
import ServerPagination from '@/components/_base/server-pagination'
import DoctorHeader from './_components/doctor_header'
import Search from '@/components/_base/search'
import { retriveDoctors } from '@/server'
import DoctorList from './_components/doctor_list'

const take: number = 100;
interface DoctorPageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}
const DoctorPage: React.FC<DoctorPageProps> = async ({ searchParams }) => {

    const field = typeof searchParams.field === 'string' ? searchParams.field : undefined;
    const order = typeof searchParams.order === 'string' ? searchParams.order : undefined;

    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;

    const doctorValue = await retriveDoctors({
        filter: search,
        limit: take,
        skip: page,
        orderField: field as any,
        orderValue: order as any
    });
    const totalDoctorPages = Math.floor(doctorValue.amount / take);

    return (
        <>
            <ModularBox>
                <Box style={{ flexShrink: 0 }}>
                    <Title order={4} component='span'>Medicos</Title>
                </Box>
            </ModularBox>
            <ModularBox>
                <Search
                    value={search}
                    removeQueries={['field', 'order', 'page']} />
            </ModularBox>
            <ModularBox h='100%'>
                <TableRoot>
                    <DoctorHeader />
                    <DoctorList doctors={doctorValue.data} />
                </TableRoot>
            </ModularBox>
            {totalDoctorPages > 1 && (
                <ModularBox>
                    <ServerPagination
                        page={page}
                        total={totalDoctorPages} />
                </ModularBox>)}
        </>
=======
'use client'

import { DoctorActionMenu } from '@/components/doctor/action/DoctorActionMenu';
import { DoctorFormCreateCredential } from '@/components/doctor/form/DoctorFormCreateCredential';
import { DoctorFormUploadSignature } from '@/components/doctor/form/DoctorFormUploadSignature';
import { ActionColumnProps, ColumnOptions, TableLayout } from '@/components/layout/table-layout/TableLayout';
import { UserFormAssignCompanyAttribute } from '@/components/user/form/UserFormAssignCompanyAttribute';
import { useFetch } from '@/hooks/useFetch'
import { useList } from '@/hooks/useList';
import { Doctor } from '@/lib/dtos/user/doctor/base.response.dto';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect, useMemo, useState } from 'react'

enum LayoutState {
    DEFAULT,
    CREATE_CREDENTIAL,
    UPLOAD_SIGNATURE,
    UPDATE_COMPANY,
}

const columnsDoctor: ColumnOptions<Doctor>[] = [
    { key: 'dni', name: 'CI' },
    { key: 'name', name: 'Nombre' },
    { key: 'lastname', name: 'Apellido' },
    { key: 'email', name: 'Correo electronico' }
]

const DoctorPage: React.FC = () => {

    const [currentState, setCurrentState] = useState<LayoutState>(LayoutState.DEFAULT);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

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
    }] = useList<Doctor>([]);

    const handleClickEventCreateCredential = useCallback((data: Doctor) => {
        setSelectedDoctor(data);
        setCurrentState(LayoutState.CREATE_CREDENTIAL);
    }, []);

    const handleClickEventAssignCompany = useCallback((data: Doctor) => {
        setSelectedDoctor(data);
        setCurrentState(LayoutState.UPDATE_COMPANY);
    }, []);

    const handleClickEventSignatureUpdaload = useCallback((data: Doctor) => {
        setCurrentState(LayoutState.UPLOAD_SIGNATURE);
        setSelectedDoctor(data);
    }, []);

    const handleCloseEvent = useCallback(() => {
        setCurrentState(LayoutState.DEFAULT);
        setSelectedDoctor(null);
    }, []);

    const handleTableAction = useCallback((prop: ActionColumnProps<Doctor>) => (
        <DoctorActionMenu
            doctor={prop.value}
            hasFile={prop.value.hasFile}
            onCreateCredential={() => handleClickEventCreateCredential(prop.value)}
            onAssignCompany={() => handleClickEventAssignCompany(prop.value)}
            createCredential={!prop.value.hasCredential}
            onUploadSignature={() => handleClickEventSignatureUpdaload(prop.value)}
        />
    ), [handleClickEventCreateCredential, handleClickEventAssignCompany, handleClickEventSignatureUpdaload]);

    const handleFormSubmittion = useCallback((id: number) => {
        doctorUpdate('user', id, { hasCredential: true });
    }, [doctorUpdate]);

    const handleFormSubmitUploadSignature = useCallback((id: number) => {
        doctorUpdate('id', id, { hasFile: true });
    }, [doctorUpdate]);

    useEffect(() => {
        if (fetchError) notifications.show({ message: fetchError.message, color: 'red' });
    }, [fetchError]);

    useEffect(() => {
        if (fetchData)
            doctorOverride(fetchData);
    }, [fetchData, doctorOverride]);

    const view = useMemo(() => ({
        [LayoutState.CREATE_CREDENTIAL]: (
            <DoctorFormCreateCredential
                user={{
                    id: selectedDoctor?.user!,
                    email: selectedDoctor?.email!
                }}
                onFormSubmittion={handleFormSubmittion}
                onClose={handleCloseEvent} />
        ),
        [LayoutState.UPLOAD_SIGNATURE]: (
            <DoctorFormUploadSignature
                onFormSubmittion={handleFormSubmitUploadSignature}
                doctor={selectedDoctor?.id!}
                onClose={handleCloseEvent} />
        ),
        [LayoutState.UPDATE_COMPANY]: (
            <UserFormAssignCompanyAttribute
                url={`/api/users/attribute/doctor/of/${selectedDoctor?.user}`}
                onClose={handleCloseEvent} />
        ),
        [LayoutState.DEFAULT]: (
            <TableLayout<Doctor>
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
    }), [doctors, fetchLoading, handleTableAction, handleFormSubmitUploadSignature, handleFormSubmittion, handleCloseEvent, selectedDoctor]);

    return (
        <>{view[currentState]}</>
>>>>>>> main
    )
}

export default DoctorPage