'use client'

import StepperForm, { StepperIcon } from '@/components/stepper_form';
import { createMedicalOrder } from '@/server/medical_order/actions';
import { CreateMedicalOrderPayload } from '@/server/medical_order/server_types';
import { rem } from '@mantine/core';
import { IconBuilding, IconStethoscope } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'

const icon: StepperIcon = {
    'doctor': <IconStethoscope style={{ width: rem(16), height: rem(16) }} />,
    'building': <IconBuilding style={{ width: rem(16), height: rem(16) }} />,
}
type StepperOrderForm = Omit<CreateMedicalOrderPayload, 'patientDni'>;
type StepperOrderFormProps = {
    patientDni: string,
    headers: { description: string, icon: 'doctor' | 'building' | 'exam' }[]
} & Required<Pick<React.ComponentPropsWithoutRef<typeof StepperForm>, 'children'>>
const StepperOrderForm: React.FC<StepperOrderFormProps> = ({
    patientDni,
    ...props
}) => {

    const router = useRouter();

    const handleSubmit = useCallback(
        async (data: StepperOrderForm) => {
            await createMedicalOrder({ ...data, patientDni: patientDni });
        }, [patientDni]);

    const handleFormFinish = useCallback(() => router.back(), [router]);

    return (
        <StepperForm<StepperOrderForm>
            onSubmit={handleSubmit}
            icon={icon}
            onFinish={handleFormFinish}
            initialData={{
                branchName: '',
                companyName: '',
                companyRuc: '',
                corporativeName: '',
                doctorDni: '',
                doctorFullname: '',
                process: '',
                year: dayjs().year()
            }}
            {...props} />
    )
}

export default StepperOrderForm