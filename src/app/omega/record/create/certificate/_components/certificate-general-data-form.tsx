'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import CertificateGeneralDataSchema from '../_schemas/certificate-general-data.schema'
import { z } from 'zod';
import { Box, Group, Radio, RadioGroup, rem } from '@mantine/core';

type CertificateGeneralDataFormProps = {
    data?: Partial<z.infer<typeof CertificateGeneralDataSchema>>,
    onSubmit?: (value: z.infer<typeof CertificateGeneralDataSchema>) => void;
}
const CertificateGeneralDataForm = React.forwardRef<HTMLFormElement, CertificateGeneralDataFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof CertificateGeneralDataSchema>>({
        initialValues: {
            generalDataEntry: data?.generalDataEntry ?? true,
            generalDataPeriodic: data?.generalDataPeriodic ?? false,
            generalDataReintegrate: data?.generalDataReintegrate ?? false,
            generalDataRetirement: data?.generalDataRetirement ?? false,
        },
        validate: zodResolver(CertificateGeneralDataSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof CertificateGeneralDataSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);


    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            style={{ position: 'relative', width: '100%', height: '100%' }}>
            <RadioGroup>
                <Group
                    gap={rem(32)}
                    justify='center'
                    align='center'>
                    <Radio
                        defaultChecked={true}
                        label='INGRESO'
                        {...form.getInputProps('generalDataEntry')} />
                    <Radio
                        label='PERIODICO'
                        {...form.getInputProps('generalDataPeriodic')} />
                    <Radio
                        label='REINTEGRO'
                        {...form.getInputProps('generalDataReintegrate')} />
                    <Radio
                        label='RETIRO'
                        {...form.getInputProps('generalDataRetirement')} />
                </Group>
            </RadioGroup>
        </Box>
    )
});

CertificateGeneralDataForm.displayName = 'CertificateGeneralDataForm';

export default CertificateGeneralDataForm