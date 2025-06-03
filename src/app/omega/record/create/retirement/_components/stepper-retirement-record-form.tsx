'use client'

import { rem } from '@mantine/core';
import { IconAlertOctagon, IconBriefcase, IconBuilding, IconCheck, IconHeart, IconLicense, IconNotebook, IconPick, IconTree, IconUserCheck, IconVirus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import StepperForm, { StepperIcon } from '@/components/stepper-form';
import { RetirementRecordPayload } from '@/server/record/create-record/retirement-record';
import { createClientRecordRetirement } from '@/server';
import { RECORD_TMP_STORE_EXPIRE_AT } from '@/lib/utils/constants';
import { removeFromTmpStore, storeInTmpStore } from '@/lib/tmp-store/tmp-store.utils';


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
type StepperRetirementRecordForm = RetirementRecordPayload;
type StepperRetirementRecordFormProps = {
    tmpStoreKey?: string;
    patientDni: string;
    initialData?: Partial<StepperRetirementRecordForm>;
    headers: { title: string; description?: string, icon: 'user-check' | 'license' | 'building' | 'check' | 'briefcase' | 'tree' | 'risk' | 'activity' | 'disease' | 'heart' | 'notebook' }[]
} & Required<Pick<React.ComponentPropsWithoutRef<typeof StepperForm>, 'children'>>
const StepperRetirementRecordForm: React.FC<StepperRetirementRecordFormProps> = ({
    patientDni,
    tmpStoreKey = 'tmpRecordRetirement',
    ...props
}) => {
    const router = useRouter();

    const handleSubmit = useCallback(async (data: StepperRetirementRecordForm) => {
        await createClientRecordRetirement({ ...data, patientDni });
        await removeFromTmpStore(tmpStoreKey);
    }, [patientDni, tmpStoreKey]);

    const handleFormFinish = useCallback(async () => router.back(), [router]);

    const handleNextStep = useCallback(async (value: Partial<StepperRetirementRecordForm>) => {
        await storeInTmpStore<Partial<StepperRetirementRecordForm>>(tmpStoreKey, value, new Date(RECORD_TMP_STORE_EXPIRE_AT));
    }, [tmpStoreKey]);

    return (
        <StepperForm<StepperRetirementRecordForm>
            onSubmit={handleSubmit}
            icon={icon}
            onFinish={handleFormFinish}
            orientation='vertical'
            onNextStep={handleNextStep}
            {...props} />
    )
}

export default StepperRetirementRecordForm