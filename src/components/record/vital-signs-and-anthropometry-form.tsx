'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import VitalSignsAndAnthropometryFormSchema, { adjustInitialValues } from './schemas/vital-signs-and-anthropometry.schema'
import { z } from 'zod';
import { Box, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';

const options: Record<keyof Omit<z.infer<typeof VitalSignsAndAnthropometryFormSchema>, 'vitalSignsMassIndex'>, { label: string, placeholder: string } & ({ type: 'text' } | { type: 'number'; min?: number; })> = {
    vitalSignsBloodPressure: {
        label: "Presión arterial (mmHg)",
        type: 'text',
        placeholder: 'eg. 10mmHg'
    },
    vitalSignsTemperature: {
        label: "Temperatura (°C)",
        type: 'text',
        placeholder: 'eg. 1°C'
    },
    vitalSignsHeartRate: {
        label: "Frecuencia cardíaca (lat/min)",
        type: 'text',
        placeholder: 'eg. 10 lat/min'
    },
    vitalSignsOxygenSaturation: {
        label: "Saturación de oxígeno (O₂ %)",
        type: 'text',
        placeholder: 'eg. 10 O2%'
    },
    vitalSignsRespiratoryRate: {
        label: "Frecuencia respiratoria (fr/min)",
        type: 'text',
        placeholder: 'eg. 10 fr/min'
    },
    vitalSignsWeight: {
        label: "Peso (kg)",
        type: 'number',
        min: 1,
        placeholder: 'eg. 10 kg'
    },
    vitalSignsSize: {
        label: "Talla (cm)",
        type: 'number',
        min: 1,
        placeholder: 'eg. 10 cm'
    },
    vitalSignsAbdominalPerimeter: {
        label: "Perímetro abdominal (cm)",
        type: 'text',
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
        const sizeInMeters = value.vitalSignsSize / 100;
        const sqrtMeters = Math.pow(sizeInMeters, 2);
        const imc = Math.floor((value.vitalSignsWeight / sqrtMeters) * 100) / 100;
        onSubmit?.({ ...value, vitalSignsMassIndex: imc });
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Constantes Vitales y Antropometría</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap={rem(16)}>
                    <SimpleGrid cols={{ base: 1, sm: 4 }}>
                        {Object.entries(options).filter(([key]) => key !== 'vitalSignsMassIndex').map(([key, values]) =>
                            <TextInput
                                key={key}
                                {...values}
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