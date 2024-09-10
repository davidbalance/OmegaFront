'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import DeveloperPageForm from '@/components/developer/pages/developer-page-form'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { OmegaWebResource } from '@/lib/dtos/omega/web/resource/base.response.dto'
import { parseForm } from '@/lib/utils/form-parse'
import { updateWebResource } from '@/server/web-resource.actions'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useCallback, useRef, useState } from 'react'

interface ResourceFormProps extends Omit<OmegaWebResource, 'status'> { }
const ResourceForm: React.FC<ResourceFormProps> = ({
    id,
    ...props
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values: any = parseForm(event.currentTarget);
        setLoading(true);
        try {
            await updateWebResource(id, values);
            router.back();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }, [id]);

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
                <DeveloperPageForm
                    onSubmit={handleSubmit}
                    ref={formRef}
                    {...props} />
            </ModularBox>

            <ModularBox direction='row'>
                <Button
                    flex={1}
                    size='xs'
                    onClick={handleClick}
                    leftSection={(
                        <IconDeviceFloppy
                            style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </>
    )
}

export default ResourceForm