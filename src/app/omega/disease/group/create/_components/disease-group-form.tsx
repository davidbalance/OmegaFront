'use client'

import LoadingOverlay from '@/components/_base/loading-overlay'
import DiseseGroupForm from '@/components/disease-group-form'
import { ModularBox } from '@/components/modular/box/ModularBox'
import { parseForm } from '@/lib/utils/form-parse'
import { createDiseaseGroup } from '@/server/disease-group.actions'
import { Button, rem } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useRef, useState } from 'react'

const DiseaseGroupForm: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values: any = parseForm(event.currentTarget);
        setLoading(true);
        try {
            await createDiseaseGroup(values);
            router.back();
        } catch (error: any) {
            notifications.show({ message: error.message, color: 'red' });
        } finally {
            setLoading(false);
        }
    }

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
                <DiseseGroupForm
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
                        <IconDeviceFloppy
                            style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </>
    )
}

export default DiseaseGroupForm