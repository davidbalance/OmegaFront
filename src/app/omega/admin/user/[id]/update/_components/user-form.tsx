'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import UserDataForm from '@/components/user/form/user-data-form'
import { User } from '@/lib/dtos/user/user/base.response.dto'
import { Button, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import React, { FormEvent, useCallback, useRef, useState } from 'react'
import { notifications } from '@mantine/notifications'
import LoadingOverlay from '@/components/_base/loading-overlay'
import { useRouter } from 'next/navigation'
import { updateUser } from '@/server/user.actions'

type UserFormData = Omit<User, 'hasCredential' | 'id'>;

interface UserFormProps extends Omit<User, 'hasCredential'> { }
const UserForm: React.FC<UserFormProps> = ({
    id,
    dni,
    email,
    lastname,
    name
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [formValue, setFormValue] = useState<UserFormData>({ dni, email, lastname, name });

    const formRef = useRef<HTMLFormElement | null>(null);

    const router = useRouter();

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.currentTarget);

        const currentValue: Record<string, string | number[]> = {};
        formData.forEach((value, key) => {
            currentValue[key] = value as string;
        });

        setFormValue(prev => ({ ...prev, ...currentValue }));

        try {
            await updateUser(id, currentValue);
            router.back();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }

    }, [id, router]);

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
                <UserDataForm
                    ref={formRef}
                    data={formValue}
                    disabledEmail
                    disabledDni
                    onSubmit={handleSubmit} />
            </ModularBox>
            <ModularBox direction='row'>
                <Button
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

export default UserForm