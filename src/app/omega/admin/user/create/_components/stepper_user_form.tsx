'use client'

import { rem } from '@mantine/core';
import { IconBuilding, IconCheck, IconLicense, IconLock, IconUserCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import StepperForm, { StepperIcon } from '@/components/stepper_form';
import { AuthRegisterPayload } from '@/lib/auth/auth.types';
import { createUser } from '@/server';


const icon: StepperIcon = {
    'user-check': <IconUserCheck style={{ width: rem(16), height: rem(16) }} />,
    'lock': <IconLock style={{ width: rem(16), height: rem(16) }} />,
    'license': <IconLicense style={{ width: rem(16), height: rem(16) }} />,
    'building': <IconBuilding style={{ width: rem(16), height: rem(16) }} />,
    'check': <IconCheck style={{ width: rem(16), height: rem(16) }} />,
}
type StepperUserForm = AuthRegisterPayload;
type StepperUserFormProps = {
    headers: { description: string, icon: 'user-check' | 'lock' | 'license' | 'building' | 'check' }[]
} & Required<Pick<React.ComponentPropsWithoutRef<typeof StepperForm>, 'children'>>
const StepperUserForm: React.FC<StepperUserFormProps> = ({
    ...props
}) => {
    const router = useRouter();

    const handleSubmit = async (data: StepperUserForm) => {
        await createUser(data);
    }

    const handleFormFinish = useCallback(() => router.back(), [router]);

    return (
        <StepperForm<StepperUserForm>
            onSubmit={handleSubmit}
            icon={icon}
            onFinish={handleFormFinish}
            initialData={{
                dni: '',
                email: '',
                lastname: '',
                name: '',
                password: '',
                resources: [],
                logo: ''
            }}
            {...props} />
    )
}

export default StepperUserForm