'use client'

import AreaFormManagement from '@/components/area/form/AreaFormManagement';
import { ModularBox } from '@/components/modular/box/ModularBox';
import { Area } from '@/lib/dtos/location/area/base.response.dto';
import { Management } from '@/lib/dtos/location/management/base.response.dto';
import { parseForm } from '@/lib/utils/form-parse';
import { updateArea } from '@/server/area.actions';
import { LoadingOverlay, Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useRef, useState } from 'react'

interface FormProps extends Pick<Area, 'id' | 'management'> {
    options: Management[]
}
const Form: React.FC<FormProps> = ({
    id,
    ...props
}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const values: any = parseForm(event.currentTarget);
        setLoading(true);
        try {
            await updateArea(id, { management: Number(values.management) });
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
                <AreaFormManagement
                    ref={formRef}
                    onSubmit={handleSubmit}
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

export default Form