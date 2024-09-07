import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { useFetch } from '@/hooks/useFetch'
import { Box, Button, LoadingOverlay, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto'
import { PatchExamSubtypeRequestDto } from '@/lib/dtos/laboratory/exam/subtype/request.dto'
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle'
import { notifications } from '@mantine/notifications'
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto'
import { ExamSubtypeTypeForm } from './exam-subtype-type-form'

interface ExamSubtypeTypeFormChangeProps {
    type: number;
    examSubtype: ExamSubtype,
    types: ExamType[],
    onClose: () => void;
    onFormSubmit?: (newType: number) => void;
}

const ExamSubtypeTypeFormChange: React.FC<ExamSubtypeTypeFormChangeProps> = ({ type, examSubtype, types, onClose, onFormSubmit }) => {

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
    } = useFetch<ExamSubtype>(`/api/exam/subtypes/${examSubtype ? examSubtype.id : ''}`, 'PATCH', { loadOnMount: false });

    const handleFormSubmittion = useCallback((data: { type: string }) => {
        request<PatchExamSubtypeRequestDto>({ ...examSubtype, type: parseInt(data.type) });
        setShouldRequest(true);
    }, [request, examSubtype]);

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
            onFormSubmit?.(body.type);
            reset();
        }
    }, [body, data, reset, onFormSubmit])

    return (
        <ModularLayout pos='relative'>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <LayoutSubFormTitle
                title={'Cambio de tipo'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <Box maw={700} w='100%' pt={rem(16)} >
                    <ExamSubtypeTypeForm
                        ref={buttonRef}
                        formData={{ type: `${type}` }}
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

export { ExamSubtypeTypeFormChange }