'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { Button, rem } from '@mantine/core'
import { IconDeviceFloppy } from '@tabler/icons-react'
import React, { useCallback, useRef, useState } from 'react'
import LoadingOverlay from '@/components/_base/loading-overlay'
import { useRouter } from 'next/navigation'
import { EditUserPayload, User } from '@/server/user/server-types'
import ProfileForm from '@/components/user/profile_form'
import { getErrorMessage } from '@/lib/utils/errors'
import { editUser } from '@/server'
import { notifications } from '@mantine/notifications'

type EditProfileFormProps = User;
const EditProfileForm: React.FC<EditProfileFormProps> = ({
    userId,
    ...props
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (value: Omit<EditUserPayload, 'userId'>) => {
            setLoading(true);
            try {
                await editUser({
                    ...value,
                    userId
                });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
            } finally {
                setLoading(false);
            }

        }, [userId, router]);

    const handleClick = useCallback(() => {
        if (formRef.current) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            formRef.current.dispatchEvent(submitEvent);
        }
    }, []);

    return (
        <>
            <LoadingOverlay visible={loading} />
            <ModularBox flex={1}>
                <ProfileForm
                    ref={formRef}
                    data={{
                        dni: props.userDni,
                        email: props.userEmail,
                        lastname: props.userLastname,
                        name: props.userName
                    }}
                    disabledEmail
                    disabledDni
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

export default EditProfileForm