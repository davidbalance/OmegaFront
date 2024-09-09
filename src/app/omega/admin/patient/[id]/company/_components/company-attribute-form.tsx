'use client'

import LoadingOverlay from '@/components/_base/loading-overlay';
import { ModularBox } from '@/components/modular/box/ModularBox';
import UserFormCompany from '@/components/user/form/user-form-company';
import { CorporativeGroupOption } from '@/lib/dtos/location/corporative/base.response.dto';
import { updateUserAttribute } from '@/server/user-attribute.actions';
import { Button, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useCallback, useRef, useState } from 'react'

interface CompanyAttributeFormProps {
    id: number;
    value?: string | undefined;
    options: CorporativeGroupOption[];
}
const CompanyAttributeForm: React.FC<CompanyAttributeFormProps> = ({ id, ...props }) => {

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
            const value = currentValue.company;
            await updateUserAttribute(id, value, 'employeeOf');
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
                <UserFormCompany
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
                        <IconDeviceFloppy style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                    )}>
                    Guardar
                </Button>
            </ModularBox>
        </>
    )
}

export default CompanyAttributeForm