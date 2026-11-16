'use client'

import { Box, Button, ButtonGroup, LoadingOverlay, rem, ScrollArea } from '@mantine/core';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ModularBox } from '@/components/modular/box/ModularBox';
import { notifications } from '@mantine/notifications';
import { getErrorMessage } from '@/lib/utils/errors';
import { updateClientRecord } from '@/server';

type UpdateRecordFormProps = React.PropsWithChildren<{
    recordId: string;
    patientDni: string;
    data: any;
}>
const UpdateRecordForm: React.FC<UpdateRecordFormProps> = ({
    recordId,
    patientDni,
    data,
    children,
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formCompleted, setFormCompleted] = useState(false);
    const router = useRouter();
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        if (formCompleted) {
            router.back();
        }
    }, [formCompleted, router])


    const handleSubmit = useCallback(
        async (value: any) => {
            setLoading(true);
            try {
                await updateClientRecord(patientDni, recordId, { ...data, ...value });
                setFormCompleted(true);
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }
        }, [patientDni, data, recordId]);

    const formData = useMemo(() => {
        let newChild = children;
        if (React.isValidElement(children)) {
            newChild = React.cloneElement(children as React.ReactElement<HTMLFormElement>, {
                data: { ...data },
                ref: formRef,
                onSubmit: handleSubmit,
            });
        }
        return newChild;
    }, [children, data, handleSubmit])

    return (
        <>
            <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            <ModularBox
                flex={1}>
                <Box w='100%' h='100%' pos='relative'>
                    <ScrollArea
                        scrollbars='y'
                        component='div'
                        px={rem(16)}
                        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                        {formData}
                    </ScrollArea>
                </Box>
            </ModularBox >
            <ModularBox>
                <ButtonGroup>
                    <Button
                        flex={1}
                        size="xs"
                        variant="default" onClick={router.back}
                        leftSection={<IconX style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                        Cancelar
                    </Button>
                    <Button flex={1} onClick={() => {
                        if (!formRef.current) return;
                        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                        formRef.current.dispatchEvent(submitEvent);
                    }} size="xs" leftSection={<IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}>
                        Guardar
                    </Button>
                </ButtonGroup>
            </ModularBox>
        </>
    )
}

export default UpdateRecordForm