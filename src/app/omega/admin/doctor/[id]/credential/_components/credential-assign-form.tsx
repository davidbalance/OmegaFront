'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import AuthFormPassword from '@/components/auth/auth-password-form';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { addAuthUser } from '@/server/user/actions';
import { AddAuthPayload } from '@/server/user/server_types';
import { Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react'

interface CredentialAssignFormProps {
    userId: string;
    email: string;
}
const CredentialAssignForm: React.FC<CredentialAssignFormProps> = ({
    userId,
    email
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement | null>(null);

    const router = useRouter();

    const handleSubmit = useCallback(
        async (value: Omit<AddAuthPayload, 'userId'>) => {
            setLoading(true);
            try {
                await addAuthUser({ password: value.password, userId: userId });
                router.back();
            } catch (error: any) {
                notifications.show({ message: error.message, color: 'red' });
            } finally {
                setLoading(false);
            }

        }, [userId, router]);

    const handleClick = () => {
        if (formRef.current) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(submitEvent);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ModularBox flex={1}>
                <AuthFormPassword
                    ref={formRef}
                    onSubmit={handleSubmit} />
            </ModularBox>
            <ModularBox>
                <Button
                    fullWidth
                    flex={1}
                    size='xs'
                    onClick={handleClick}
                    leftSection={(
                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </>
    )
}

export default CredentialAssignForm