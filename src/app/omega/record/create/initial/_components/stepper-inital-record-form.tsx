'use client'

import { rem } from '@mantine/core';
import { IconBriefcase, IconBuilding, IconCheck, IconLicense, IconLock, IconTree, IconUserCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import StepperForm, { StepperIcon } from '@/components/stepper_form';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';


const icon: StepperIcon = {
    'user-check': <IconUserCheck style={{ width: rem(16), height: rem(16) }} />,
    'lock': <IconLock style={{ width: rem(16), height: rem(16) }} />,
    'license': <IconLicense style={{ width: rem(16), height: rem(16) }} />,
    'building': <IconBuilding style={{ width: rem(16), height: rem(16) }} />,
    'check': <IconCheck style={{ width: rem(16), height: rem(16) }} />,
    'briefcase': <IconBriefcase style={{ width: rem(16), height: rem(16) }} />,
    'tree': <IconTree style={{ width: rem(16), height: rem(16) }} />,
}
type StepperInitialRecordForm = InitialRecordPayload;
type StepperInitialRecordFormProps = {
    initialData?: Partial<StepperInitialRecordForm>;
    headers: { title: string; description?: string, icon: 'user-check' | 'lock' | 'license' | 'building' | 'check' | 'briefcase' | 'tree' }[]
} & Required<Pick<React.ComponentPropsWithoutRef<typeof StepperForm>, 'children'>>
const StepperInitialRecordForm: React.FC<StepperInitialRecordFormProps> = ({
    ...props
}) => {
    const router = useRouter();

    const handleSubmit = async (data: StepperInitialRecordForm) => { }

    const handleFormFinish = useCallback(() => router.back(), [router]);

    return (
        <StepperForm<StepperInitialRecordForm>
            onSubmit={handleSubmit}
            icon={icon}
            onFinish={handleFormFinish}
            orientation='vertical'
            {...props} />
    )
}

export default StepperInitialRecordForm