'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { OmegaNavResource } from '@/lib/dtos/omega/nav/resource/base.response.dto'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback, useRef, useState } from 'react'
import LoadingOverlay from '@/components/_base/loading-overlay'
import { updateClientResource } from '@/server/web-client.actions'
import WebResourceFormAssign from '@/components/web-resource-form-assign'

interface WebResourceFormProps {
    id: number;
    resources: OmegaNavResource[];
    data: { resources: number[] };
}
const WebResourceForm: React.FC<WebResourceFormProps> = ({ id, ...props }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const formRef = useRef<HTMLFormElement | null>(null);

    const router = useRouter();

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        const formValue: number[] = []
        formData.forEach((_, key) => {
            if (key.split('-')[0] === 'resource') {
                formValue.push(Number(key.split('-')[1]));
            }
        });

        try {
            await updateClientResource(id, { resources: formValue });
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
                <WebResourceFormAssign
                    ref={formRef}
                    onSubmit={handleSubmit}
                    {...props} />
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

export default WebResourceForm