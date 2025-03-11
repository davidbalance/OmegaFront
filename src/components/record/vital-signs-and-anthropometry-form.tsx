'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import VitalSignsAndAnthropometryFormSchema from './schemas/vital-signs-and-anthropometry.schema'
import { z } from 'zod';
import { rem, SimpleGrid, Stack, Textarea, TextInput } from '@mantine/core';

type VitalSignsAndAnthropometryFormFormProps = {
    data?: Partial<z.infer<typeof VitalSignsAndAnthropometryFormSchema>>;
    onSubmit?: (value: z.infer<typeof VitalSignsAndAnthropometryFormSchema>) => void;
}
const VitalSignsAndAnthropometryFormForm = React.forwardRef<HTMLFormElement, VitalSignsAndAnthropometryFormFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof VitalSignsAndAnthropometryFormSchema>>({
        initialValues: {
            vitalSignsBloodPressure: data?.vitalSignsBloodPressure ?? 0,
            vitalSignsTemperature: data?.vitalSignsTemperature ?? 0,
            vitalSignsHeartRate: data?.vitalSignsHeartRate ?? 0,
            vitalSignsOxygenSaturation: data?.vitalSignsOxygenSaturation ?? 0,
            vitalSignsRespiratoryRate: data?.vitalSignsRespiratoryRate ?? 0,
            vitalSignsWeight: data?.vitalSignsWeight ?? 0,
            vitalSignsSize: data?.vitalSignsSize ?? 0,
            vitalSignsMassIndex: data?.vitalSignsMassIndex ?? 0,
            vitalSignsAbdominalPerimeter: data?.vitalSignsAbdominalPerimeter ?? 0,
        },
        validate: zodResolver(VitalSignsAndAnthropometryFormSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof VitalSignsAndAnthropometryFormSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={rem(16)}>
                <SimpleGrid cols={{ base: 1, sm: 4 }}>
                    <TextInput
                        label="PRESION ARTERIAL (mmHg)"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsBloodPressure')} />
                    <TextInput
                        label="TEMPERATURA (C)"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsTemperature')} />
                    <TextInput
                        label="FRECUENCIA CARDIACA (lat/min)"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsHeartRate')} />
                    <TextInput
                        label="SATURACION DE OXIGENO (O2%)"
                        placeholder="eg. Omega"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsOxygenSaturation')} />
                    <TextInput
                        label="FRECUENCIA CARDIACA (fr/min)"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsRespiratoryRate')} />
                    <TextInput
                        label="PESO (kg)"
                        placeholder="eg. Omega"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsWeight')} />
                    <TextInput
                        label="TALLA (cm)"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsSize')} />
                    <TextInput
                        label="INDICE DE MASA CORPORAL (kg/m2)"
                        placeholder="eg. Omega"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsMassIndex')} />
                    <TextInput
                        label="PERIMETRO ABDOMINAL (cm)"
                        placeholder="eg. Omega"
                        type='number'
                        min={0}
                        {...form.getInputProps('vitalSignsAbdominalPerimeter')} />
                </SimpleGrid>
            </Stack>
        </form>
    )
});

VitalSignsAndAnthropometryFormForm.displayName = 'VitalSignsAndAnthropometryFormForm';

export default VitalSignsAndAnthropometryFormForm