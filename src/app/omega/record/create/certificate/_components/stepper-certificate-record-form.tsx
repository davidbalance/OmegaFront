'use client'

import { rem } from '@mantine/core';
import { IconAlertOctagon, IconBriefcase, IconBuilding, IconCheck, IconHeart, IconLicense, IconNotebook, IconPick, IconTree, IconUserCheck, IconVirus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'
import StepperForm, { StepperIcon } from '@/components/stepper_form';
import { InitialRecordPayload } from '@/server/record/create-record/initial-record';
import { createClientRecordCertificate } from '@/server/record/actions';
import { CertificateRecordPayload } from '@/server/record/create-record/certificate-record';


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
type StepperCertificateForm = CertificateRecordPayload;
type StepperCertificateFormProps = {
    patientDni: string;
    initialData?: Partial<StepperCertificateForm>;
    headers: { title: string; description?: string, icon: 'user-check' | 'license' | 'building' | 'check' | 'briefcase' | 'tree' | 'risk' | 'activity' | 'disease' | 'heart' | 'notebook' }[]
} & Required<Pick<React.ComponentPropsWithoutRef<typeof StepperForm>, 'children'>>
const StepperCertificateForm: React.FC<StepperCertificateFormProps> = ({
    patientDni,
    ...props
}) => {
    const router = useRouter();

    const handleSubmit = useCallback(async (data: StepperCertificateForm) => {
        await createClientRecordCertificate({ ...data, patientDni });
    }, [patientDni]);

    const handleFormFinish = useCallback(() => router.back(), [router]);

    return (
        <StepperForm<StepperCertificateForm>
            onSubmit={handleSubmit}
            icon={icon}
            onFinish={handleFormFinish}
            orientation='vertical'
            {...props} />
    )
}

export default StepperCertificateForm