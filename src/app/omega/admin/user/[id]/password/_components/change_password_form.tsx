'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import Title from '@/components/_base/mantine/title';
import AuthFormPassword from '@/components/auth/auth-password-form';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { changePassword } from '@/lib/auth/auth.utils';
import { getErrorMessage } from '@/lib/utils/errors';
import { Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react'

interface ChangePasswordFormProps {
    email: string;
}
const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ email }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement | null>(null);

    const router = useRouter();

    const handleSubmit = useCallback(
        async (value: { password: string }) => {
            setLoading(true);

            try {
                await changePassword(email, value.password);
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }

        }, [email, router]);

    const handleClick = () => {
        if (formRef.current) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(submitEvent);
        }
    }

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ModularBox>
                <Title order={6}>{email}</Title>
            </ModularBox>
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
                    loading={loading}
                    leftSection={(
                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </>
    )
}

export default ChangePasswordForm