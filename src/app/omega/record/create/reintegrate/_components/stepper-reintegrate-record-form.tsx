'use client'

import { rem } from '@mantine/core';
import { IconAlertOctagon, IconBriefcase, IconBuilding, IconCheck, IconHeart, IconLicense, IconNotebook, IconPick, IconTree, IconUserCheck, IconVirus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import StepperForm, { StepperIcon } from '@/components/stepper_form';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';


const icon: StepperIcon = {
    'user-check': <IconUserCheck style={{ width: rem(16), height: rem(16) }} />,
    'license': <IconLicense style={{ width: rem(16), height: rem(16) }} />,
    'building': <IconBuilding style={{ width: rem(16), height: rem(16) }} />,
    'check': <IconCheck style={{ width: rem(16), height: rem(16) }} />,
    'briefcase': <IconBriefcase style={{ width: rem(16), height: rem(16) }} />,
    'tree': <IconTree style={{ width: rem(16), height: rem(16) }} />,
    'risk': <IconAlertOctagon style={{ width: rem(16), height: rem(16) }} />,
    'activity': <IconPick style={{ width: rem(16), height: rem(16) }} />,
    'disease': <IconVirus style={{ width: rem(16), height: rem(16) }} />,
    'heart': <IconHeart style={{ width: rem(16), height: rem(16) }} />,
    'notebook': <IconNotebook style={{ width: rem(16), height: rem(16) }} />,
}
type StepperReintegrateForm = InitialRecordPayload;
type StepperReintegrateFormProps = {
    initialData?: Partial<StepperReintegrateForm>;
    headers: { title: string; description?: string, icon: 'user-check' | 'license' | 'building' | 'check' | 'briefcase' | 'tree' | 'risk' | 'activity' | 'disease' | 'heart' | 'notebook' }[]
} & Required<Pick<React.ComponentPropsWithoutRef<typeof StepperForm>, 'children'>>
const StepperReintegrateForm: React.FC<StepperReintegrateFormProps> = ({
    ...props
}) => {
    const router = useRouter();

    const handleSubmit = async (data: StepperReintegrateForm) => { }

    const handleFormFinish = useCallback(() => router.back(), [router]);

    return (
        <StepperForm<StepperReintegrateForm>
            onSubmit={handleSubmit}
            icon={icon}
            onFinish={handleFormFinish}
            orientation='vertical'
            {...props} />
    )
}

export default StepperReintegrateForm