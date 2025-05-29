'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import CertificateGeneralDataSchema from '../_schemas/certificate-general-data.schema'
import { z } from 'zod';
import { Box, Group, Radio, RadioGroup, rem, Title } from '@mantine/core';

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
            generalData: data?.generalData ?? 'entry'
        },
        validate: zodResolver(CertificateGeneralDataSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof CertificateGeneralDataSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);


    return (
        <>
            <Title order={3}>Datos Generales</Title>
            <Box
                mt={rem(16)}
                ref={ref}
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}
                style={{ position: 'relative', width: '100%', height: '100%' }}>

                <RadioGroup {...form.getInputProps('generalData')}>
                    <Group
                        gap={rem(32)}
                        justify='center'
                        align='center'>
                        <Radio
                            label='INGRESO'
                            value='entry' />
                        <Radio
                            label='PERIODICO'
                            value='periodic' />
                        <Radio
                            label='REINTEGRO'
                            value='reintegrate' />
                        <Radio
                            label='RETIRO'
                            value='retirement' />
                    </Group>
                </RadioGroup>
            </Box>
        </>
    )
});

CertificateGeneralDataForm.displayName = 'CertificateGeneralDataForm';

export default CertificateGeneralDataForm