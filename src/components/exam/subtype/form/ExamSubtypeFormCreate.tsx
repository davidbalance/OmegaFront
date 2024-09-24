import { ModularBox } from '@/components/modular/box/ModularBox'
import ModularLayout from '@/components/modular/layout/ModularLayout'
import { useFetch } from '@/hooks/useFetch'
import { Box, Button, LoadingOverlay, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ExamSubtypeForm } from './ExamSubtypeForm'
import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto'
import { PostExamSubtypeRequestDto } from '@/lib/dtos/laboratory/exam/subtype/request.dto'
import { LayoutSubFormTitle } from '@/components/layout/sub/form/LayoutSubFormTitle'
import { notifications } from '@mantine/notifications'

interface ExamSubtypeFormCreateProps {
    type: number;
    onClose: () => void;
    onFormSubmit?: (type: number, value: ExamSubtype) => void;
}

const ExamSubtypeFormCreate: React.FC<ExamSubtypeFormCreateProps> = ({ type, onClose, onFormSubmit }) => {

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
    } = useFetch<ExamSubtype>('/api/exam/subtypes', 'POST', { loadOnMount: false });

    const handleFormSubmittion = useCallback((data: { name: string }) => {
        request<PostExamSubtypeRequestDto>({ ...data, type });
        setShouldRequest(true);
    }, [request, type]);

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
            onFormSubmit?.(type, data);
            reset();
        }
    }, [type, data, reset, onFormSubmit])

    return (
        <ModularLayout pos='relative'>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

            <LayoutSubFormTitle
                title={'Formulario de creacion subtipos de examenes'}
                onClose={onClose} />

            <ModularBox flex={1} align='center'>
                <Box maw={700} w='100%' pt={rem(16)} >
                    <ExamSubtypeForm
                        ref={buttonRef}
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

export { ExamSubtypeFormCreate }