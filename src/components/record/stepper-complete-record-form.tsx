'use client'

import { rem } from '@mantine/core';
import { IconAlertOctagon, IconBriefcase, IconBuilding, IconCheck, IconHeart, IconLicense, IconMedicalCross, IconNotebook, IconPick, IconTree, IconUserCheck, IconVirus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import StepperForm, { StepperIcon } from '@/components/stepper-form';
import { FemoRecordPayload } from '@/server/record/create-record/femo-record';
import { completeClientRecord, createClientRecordFemo } from '@/server';

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
    'medicine': <IconMedicalCross style={{ width: rem(16), height: rem(16) }} />,
}
type StepperCompleteRecordForm = FemoRecordPayload;
type StepperCompleteRecordFormProps = {
    recordId: string;
    recordType: string;
    patientDni: string;
    initialData?: DeepPartial<StepperCompleteRecordForm>;
    headers: { title: string; description?: string, icon: 'user-check' | 'license' | 'building' | 'check' | 'briefcase' | 'tree' | 'risk' | 'activity' | 'disease' | 'heart' | 'notebook' | 'medicine' }[]
} & Required<Pick<React.ComponentPropsWithoutRef<typeof StepperForm>, 'children'>>
const StepperCompleteRecordForm: React.FC<StepperCompleteRecordFormProps> = ({
    recordId,
    recordType,
    patientDni,
    ...props
}) => {
    const router = useRouter();

    const handleSubmit = useCallback(async (data: StepperCompleteRecordForm) => {
        await completeClientRecord({ patientDni, recordId, recordType }, { ...data });
    }, [patientDni, recordId, recordType]);

    const handleFormFinish = useCallback(() => router.back(), [router]);

    return (
        <StepperForm<StepperCompleteRecordForm>
            onSubmit={handleSubmit}
            icon={icon}
            onFinish={handleFormFinish}
            orientation='vertical'
            buttonLabels={{
                next: 'Siguiente',
                prev: 'Atrás',
                submit: "Aprobar",
                finish: 'Finalizar',
            }}
            {...props} />
    )
}

export default StepperCompleteRecordForm