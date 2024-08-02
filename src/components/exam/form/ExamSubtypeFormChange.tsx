import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { useFetch } from '@/hooks/useFetch'
import { Box, Button, LoadingOverlay, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle'
import { notifications } from '@mantine/notifications'
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto'
import { ExamSubtypeForm } from './ExamSubtypeForm'
import { Exam } from '@/lib/dtos/laboratory/exam/base.response.dto'
import { PatchExamRequestDto } from '@/lib/dtos/laboratory/exam/request.dto'

interface ExamSubtypeFormChangeProps {
    type: number,
    subtype: number,
    exam: Exam,
    types: ExamType[],
    onClose: () => void;
    onFormSubmit?: (exam: Exam, type: number, subtype: number) => void;
}

const ExamSubtypeFormChange: React.FC<ExamSubtypeFormChangeProps> = ({
    exam,
    type,
    subtype,
    types,
    onClose,
    onFormSubmit
}) => {

    const buttonRef = useRef<HTMLButtonElement>(null);

    const [shouldRequest, setShouldRequest] = useState<boolean>(false);

    const {
        data,
        body,
        loading,
        error,
        request,
        reload,
        reset,
    } = useFetch<Exam>(`/api/exam/${exam ? exam.id : ''}`, 'PATCH', { loadOnMount: false });

    const handleFormSubmittion = useCallback((data: { subtype: number, type: number }) => {
        request<PatchExamRequestDto & { type: number }>({ ...exam, subtype: data.subtype, type: data.type });
        setShouldRequest(true);
    }, [request, exam]);

    useEffect(() => {
        if (error) notifications.show({ message: error.message, color: 'red' });
    }, [error]);

    useEffect(() => {
        if (body && shouldRequest) {
            reload();
            setShouldRequest(false);
        }
    }, [shouldRequest, body, reload]);

    useEffect(() => {
        if (data) {
            onFormSubmit?.(exam, body.type, body.subtype);
            reset();
        }
    }, [body, exam, data, reset, onFormSubmit])

    return (
        <ModularLayout pos='relative'>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <LayoutSubFormTitle
                title={'Cambio de tipo'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <Box maw={700} w='100%' pt={rem(16)} >
                    <ExamSubtypeForm
                        ref={buttonRef}
                        formData={{ subtype, type }}
                        types={types}
                        onFormSubmitted={handleFormSubmittion} />
                </Box>
            </ModularBox>
            <ModularBox direction='row'>
                <Button
                    flex={1}
                    size='xs'
                    onClick={() => buttonRef.current?.click()}
                    leftSection={(
                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </ModularLayout>
    )
}

export { ExamSubtypeFormChange }