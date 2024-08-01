import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { LoadingOverlay, Flex, rem, Title, Box, Button } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFetch } from '@/hooks/useFetch';
import { JobPosition } from '@/lib/dtos/location/job/position/base.response.dto';
import { notifications } from '@mantine/notifications';
import { MedicalClientJobPosition } from '@/lib/dtos/medical/client/job/position/base.response.dto';
import { UserFormJobPosition } from './UserFormJobPosition';
import { PatchMedicalClientJobPositionRequestDto } from '@/lib/dtos/medical/client/job/position/request.dto';

interface UserFormJobPositionAssignProps {
    dni: string | null;
    onClose: () => void;
}

const UserFormJobPositionAssign: React.FC<UserFormJobPositionAssignProps> = ({ dni, onClose }) => {

    const [shouldRequest, setShouldRequest] = useState<boolean>(false);
    const [initialJobPosition, setInitialJobPosition] = useState<string | null>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const {
        data: jobPositionData,
        error: jobPositionError,
        loading: jobPositionLoading,
    } = useFetch<JobPosition[]>('/api/job/position', 'GET');

    const {
        data: medicalClientJobPositionData,
        error: medicalClientJobPositionError,
        loading: medicalClientJobPositionLoading,
        reset: medicalClientJobPositionReset
    } = useFetch<string>(`/api/medical/client/job/position/${dni ? dni : ''}`, 'GET');

    const {
        data: assignJobPositionData,
        error: assignJobPositionError,
        loading: assignJobPositionLoading,
        body: assignJobPositionBody,
        reload: assignJobPositionReload,
        request: assignJobPositionRequest,
        reset: assignJobPositionReset
    } = useFetch<MedicalClientJobPosition>(`/api/medical/client/job/position/${dni ? dni : ''}`, 'PATCH', { loadOnMount: false });

    const handleFormSubmittion = useCallback((data: string | null) => {
        if (!!data) {
            assignJobPositionRequest<PatchMedicalClientJobPositionRequestDto>({ jobPositionName: data });
            setShouldRequest(true);
        }
    }, [assignJobPositionRequest]);

    useEffect(() => {
        if (medicalClientJobPositionData) {
            setInitialJobPosition(medicalClientJobPositionData);
            medicalClientJobPositionReset();
        }
    }, [medicalClientJobPositionData, medicalClientJobPositionReset])

    useEffect(() => {
        if (jobPositionError) notifications.show({ message: jobPositionError.message, color: 'red' });
        else if (medicalClientJobPositionError) notifications.show({ message: medicalClientJobPositionError.message, color: 'red' });
        else if (assignJobPositionError) notifications.show({ message: assignJobPositionError.message, color: 'red' });
    }, [jobPositionError, medicalClientJobPositionError, assignJobPositionError]);

    useEffect(() => {
        if (assignJobPositionBody && shouldRequest) {
            assignJobPositionReload();
            setShouldRequest(false);
        }
    }, [assignJobPositionBody, shouldRequest, assignJobPositionReload]);

    useEffect(() => {
        if (assignJobPositionData) {
            setInitialJobPosition(assignJobPositionData.jobPositionName || null);
            assignJobPositionReset();
        }
    }, [assignJobPositionData, assignJobPositionReset])

    return (
        <>
            <LoadingOverlay visible={
                jobPositionLoading ||
                medicalClientJobPositionLoading ||
                assignJobPositionLoading
            } zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Flex h='100%' direction='column' gap={rem(8)}>
                <LayoutSubFormTitle
                    title={'Formulario de asignacion de puestos de trabajo'}
                    onClose={onClose} />

                <ModularBox flex={1} align='center'>
                    <Title
                        order={6}
                        mt={rem(16)}>{!!initialJobPosition
                            ? `Este usuario tiene asignado el puesto de trabajo: ${initialJobPosition}`
                            : 'No tiene asignado ningun puesto de trabajo'}
                    </Title>
                    <Box pt={rem(16)} w='100%' maw={rem(700)}>
                        <UserFormJobPosition
                            ref={buttonRef}
                            formData={initialJobPosition}
                            jobPosition={jobPositionData || []}
                            onFormSubmitted={handleFormSubmittion} />
                    </Box>
                </ModularBox>

                <ModularBox direction='row'>
                    <Button
                        flex={1}
                        size='xs'
                        onClick={() => buttonRef.current?.click()}
                        leftSection={
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5} />}
                    >
                        Guardar
                    </Button>
                </ModularBox>
            </Flex>

        </>)
}

export { UserFormJobPositionAssign }