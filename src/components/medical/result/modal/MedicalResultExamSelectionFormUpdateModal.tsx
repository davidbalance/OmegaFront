import { useFetch } from '@/hooks/useFetch';
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto';
import { MedicalResult } from '@/lib/dtos/medical/result/base.response.dto';
import { Modal, Flex, ModalProps, Button, rem, LoadingOverlay } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MedicalResultExamSelectionForm } from '../form/MedicalResultExamSelectionForm';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { PatchMedicalResultExamRequest } from '@/lib/dtos/medical/result/exam/request.dto';
import { notifications } from '@mantine/notifications';

interface MedicalResultExamSelectionFormUpdateModalProps extends ModalProps {
    medicalResult: Omit<MedicalResult, 'diseases'>,
    onFormSubmitted: (value: MedicalResult) => void;
}

const MedicalResultExamSelectionFormUpdateModal: React.FC<MedicalResultExamSelectionFormUpdateModalProps> = ({
    medicalResult,
    onFormSubmitted,
    ...modal
}) => {

    const isMobile = useMediaQuery('(max-width: 50em)');

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [shouldSendRequest, setShouldSendRequest] = useState(false);

    const {
        data: examTypeData,
        error: examTypeError,
        loading: examTypeLoading,
    } = useFetch<ExamType[]>('/api/exam/types', 'GET');

    const {
        data: medicalResultData,
        error: medicalResultError,
        loading: medicalResultLoading,
        body: medicalResultBody,
        reload: medicalResultReload,
        request: medicalResultRequest,
        reset: medicalResultReset
    } = useFetch<MedicalResult>(`/api/medical/results/${medicalResult.id}`, 'PATCH', { loadOnMount: false });

    const handleFormSubmittion = useCallback((data: { examType: string, examSubtype: string, examName: string }) => {
        medicalResultRequest<PatchMedicalResultExamRequest>(data);
        setShouldSendRequest(true);
    }, [medicalResultRequest]);

    useEffect(() => {
        if (examTypeError) notifications.show({ message: examTypeError.message, color: 'red' });
        else if (medicalResultError) notifications.show({ message: medicalResultError.message, color: 'red' });
    }, [examTypeError, medicalResultError]);

    useEffect(() => {
        if (medicalResultData) {
            onFormSubmitted?.(medicalResultData);
            medicalResultReset();
        }
    }, [medicalResultData, onFormSubmitted, medicalResultReset]);

    useEffect(() => {
        if (medicalResultBody && shouldSendRequest) {
            medicalResultReload();
            setShouldSendRequest(false);
        }
    }, [medicalResultBody, shouldSendRequest, medicalResultReload]);

    return (
        <Modal.Root
            fullScreen={isMobile}
            closeOnEscape={false}
            centered
            transitionProps={{ transition: 'fade', duration: 200 }}
            size='xl'
            {...modal}>
            <Modal.Overlay backgroundOpacity={0.55} blur={3} />
            <Modal.Content>
                <Flex direction='column' h='100%'>
                    <Modal.Header>
                        <Modal.Title>Formulario de modificacion de examenes</Modal.Title>
                        <Modal.CloseButton disabled={medicalResultLoading} />
                    </Modal.Header>
                    <Modal.Body flex={1} pos='relative'>
                        <LoadingOverlay visible={medicalResultLoading || examTypeLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

                        <MedicalResultExamSelectionForm
                            ref={buttonRef}
                            formData={medicalResult}
                            types={examTypeData || []}
                            onFormSubmitted={handleFormSubmittion} />

                        <Button
                            size='xs'
                            fullWidth
                            type='submit'
                            onClick={() => buttonRef.current?.click()}
                            leftSection={(
                                <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            )}>
                            Guardar
                        </Button>
                    </Modal.Body>
                </Flex>
            </Modal.Content>
        </Modal.Root >
    )
};

MedicalResultExamSelectionFormUpdateModal.displayName = 'MedicalResultExamSelectionFormUpdateModal';

export { MedicalResultExamSelectionFormUpdateModal }