'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import LoadingOverlay from '@/components/_base/loading-overlay'
import { Resource } from '@/server/resource/server_types'
import { UserAuthResource } from '@/server/user/server_types'
import ResourceAssignForm from '@/components/resource_assign_form'
import { addUserResource } from '@/server/user/actions'
import { getErrorMessage } from '@/lib/utils/errors'

interface ResourceFormProps {
    userId: string;
    resources: Resource[];
    userResources: UserAuthResource[];
}
const ResourceForm: React.FC<ResourceFormProps> = ({
    userId,
    resources,
    userResources
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const handleSubmit = useCallback(
        async (data: { resources: string[] }) => {
            setLoading(true);
            try {
                await addUserResource({ userId, resources: data.resources });
                router.back();
            } catch (error: any) {
                notifications.show({ message: getErrorMessage(error), color: 'red' });
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
                <ResourceAssignForm
                    ref={formRef}
                    resources={resources}
                    data={{ resources: userResources.map(e => e.resourceId) }}
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

export default ResourceForm