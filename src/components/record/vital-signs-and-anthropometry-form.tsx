'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import VitalSignsAndAnthropometryFormSchema, { adjustInitialValues } from './schemas/vital-signs-and-anthropometry.schema'
import { z } from 'zod';
import { Box, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';

const options: Record<keyof z.infer<typeof VitalSignsAndAnthropometryFormSchema>, { label: string, placeholder: string }> = {
    vitalSignsBloodPressure: {
        label: "PRESION ARTERIAL (mmHg)",
        placeholder: 'eg. 10mmHg'
    },
    vitalSignsTemperature: {
        label: "TEMPERATURA (C)",
        placeholder: 'eg. 1°C'
    },
    vitalSignsHeartRate: {
        label: "FRECUENCIA CARDIACA (lat/min)",
        placeholder: 'eg. 10 lat/min'
    },
    vitalSignsOxygenSaturation: {
        label: "SATURACION DE OXIGENO (O2%)",
        placeholder: 'eg. 10 O2%'
    },
    vitalSignsRespiratoryRate: {
        label: "FRECUENCIA CARDIACA (fr/min)",
        placeholder: 'eg. 10 fr/min'
    },
    vitalSignsWeight: {
        label: "PESO (kg)",
        placeholder: 'eg. 10 kg'
    },
    vitalSignsSize: {
        label: "TALLA (cm)",
        placeholder: 'eg. 10 cm'
    },
    vitalSignsMassIndex: {
        label: "INDICE DE MASA CORPORAL (kg/m2)",
        placeholder: 'eg. 10 kg/m2'
    },
    vitalSignsAbdominalPerimeter: {
        label: "PERIMETRO ABDOMINAL (cm)",
        placeholder: 'eg. 10 cm'
    }
}

type VitalSignsAndAnthropometryFormProps = {
    data?: Partial<z.infer<typeof VitalSignsAndAnthropometryFormSchema>>;
    onSubmit?: (value: z.infer<typeof VitalSignsAndAnthropometryFormSchema>) => void;
}
const VitalSignsAndAnthropometryForm = React.forwardRef<HTMLFormElement, VitalSignsAndAnthropometryFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof VitalSignsAndAnthropometryFormSchema>>({
        initialValues: adjustInitialValues(data),
        validate: zodResolver(VitalSignsAndAnthropometryFormSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof VitalSignsAndAnthropometryFormSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Constantes Vitales y Antropometria</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(16)}>
                    <SimpleGrid cols={{ base: 1, sm: 4 }}>
                        {Object.entries(options).map(([key, values]) =>
                            <TextInput
                                key={key}
                                label={values.label}
                                placeholder={values.placeholder}
                                {...form.getInputProps(key)} />)

                        }
                    </SimpleGrid>
                </Stack>
            </Box>
        </>
    )
});

VitalSignsAndAnthropometryForm.displayName = 'VitalSignsAndAnthropometryForm';

export default VitalSignsAndAnthropometryForm