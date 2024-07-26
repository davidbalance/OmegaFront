import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { useFetch } from '@/hooks/useFetch';
import { useList } from '@/hooks/useList';
import { LoadingOverlay, Flex, rem, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import React, { useCallback, useEffect } from 'react'
import { MedicalClientActionDefault } from '../action/MedicalClientActionDefault';
import { MedicalClientActionDelete } from '../action/MedicalClientActionDelete';
import { MedicalClientForm } from '../form/MedicalClientForm';
import { ListLayout } from '@/components/layout/list-layout/components/extended/ListLayout';
import { ListElement } from '@/components/layout/list-layout/types';
import { ListRow } from '@/components/layout/list-layout/components/row/ListRow';
import { MedicalClientEmail } from '@/lib/dtos/medical/client/email/base.response.dto';

interface PatientEmail {
    id: number,
    dni: string,
    name: string,
    lastname: string,
}

interface MedicalClientLayoutEmailProps {
    /**
     * Objeto que encapsula los datos del paciente.
     */
    patient: PatientEmail;
    /**
     * Funcion que es invocada se cierra el formulario.
     * @returns 
     */
    onClose: () => void;
}

const columnsEmail: ListElement<MedicalClientEmail>[] = [
    { key: 'email', name: 'Correo Electronico' },
    { key: 'default', name: 'Por defecto' }
]

const MedicalClientLayoutEmail: React.FC<MedicalClientLayoutEmailProps> = ({ patient, onClose }) => {

    const {
        data,
        error,
        loading
    } = useFetch<MedicalClientEmail[]>(`/api/medical/client/email/${patient.dni}`, 'GET');

    const [email, {
        append: emailAppend,
        override: emailOverride,
        remove: emailRemove
    }] = useList<MedicalClientEmail>([]);

    const handleDeleteEvent = useCallback((id: number) => {
        emailRemove('id', id);
    }, [emailRemove]);

    const handleUpdateEvent = useCallback((values: MedicalClientEmail[]) => {
        emailOverride(values);
    }, [emailOverride]);

    const handleRowMedicalClientEmail = useCallback((row: MedicalClientEmail) => (
        <ListRow
            key={`${row.id}`}
            rightSection={
                <Flex>
                    <MedicalClientActionDefault
                        id={row.id}
                        state={row.default}
                        onComplete={handleUpdateEvent} />
                    <MedicalClientActionDelete
                        id={row.id}
                        onComplete={handleDeleteEvent} />
                </Flex>
            }>
            <Text>{row.email}</Text>
        </ListRow>
    ), [handleDeleteEvent, handleUpdateEvent]);

    const handleValidation = useCallback((data: string): boolean => !email.some(e => e.email === data), [email]);

    const handleFormSubmittion = useCallback((data: MedicalClientEmail[]) => {
        emailOverride(data);
    }, [emailOverride]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    useEffect(() => {
        if (data?.length) emailOverride(data);
    }, [data, emailOverride]);

    return (
        <>
            <LoadingOverlay visible={false} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <LayoutSubFormTitle
                    title={`Correos de ${patient.name} ${patient.lastname}`}
                    onClose={onClose} />

                <MedicalClientForm
                    dni={patient.dni}
                    onValidate={handleValidation}
                    onFormSubmittion={handleFormSubmittion} />

                <ListLayout<MedicalClientEmail>
                    data={email}
                    loading={loading}
                    columns={columnsEmail}
                    rows={handleRowMedicalClientEmail} />
            </Flex>

        </>
    )
}

export default MedicalClientLayoutEmail