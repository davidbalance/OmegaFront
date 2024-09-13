'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import AuthFormPassword from '@/components/auth-form-password';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { createCredential } from '@/server/credential.actions';
import { Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useRef, useState } from 'react'

interface CredentialAssignFormProps {
    id: number;
    email: string;
}
const CredentialAssignForm: React.FC<CredentialAssignFormProps> = ({
    id,
    email
}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement | null>(null);

    const router = useRouter();

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);

        const currentValue: Record<string, string> = {};
        formData.forEach((value, key) => {
            currentValue[key] = value as string;
        });

        try {
            await createCredential(id, { email, password: currentValue.password });
            router.back();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }

    }, [id, email, router]);

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