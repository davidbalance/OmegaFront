'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, rem, SimpleGrid, Stack, TextInput, Title } from '@mantine/core';
import VitalSignSchema, { VitalSignSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/vital-signs.schema';

type VitalSignsKey = keyof Omit<VitalSignSchemaType["vitalSigns"], 'bmi'>

const options: Record<`vitalSigns.${VitalSignsKey}`, { label: string, placeholder: string } & ({ type: 'text' } | { type: 'number'; min?: number; })> = {
    "vitalSigns.temperature": {
        label: "Temperatura (°C)",
        type: 'text',
        placeholder: 'eg. 1°C'
    },
    "vitalSigns.bloodPressure": {
        label: "Presión arterial (mmHg)",
        type: 'text',
        placeholder: 'eg. 10mmHg'
    },
    "vitalSigns.heartRate": {
        label: "Frecuencia cardíaca (lat/min)",
        type: 'text',
        placeholder: 'eg. 10 lat/min'
    },
    "vitalSigns.respiratoryRate": {
        label: "Frecuencia respiratoria (fr/min)",
        type: 'text',
        placeholder: 'eg. 10 fr/min'
    },
    "vitalSigns.oxygenSaturation": {
        label: "Saturación de oxígeno (O₂ %)",
        type: 'text',
        placeholder: 'eg. 10 O2%'
    },
    "vitalSigns.weight": {
        label: "Peso (kg)",
        type: 'number',
        min: 1,
        placeholder: 'eg. 10 kg'
    },
    "vitalSigns.height": {
        label: "Talla (cm)",
        type: 'number',
        min: 1,
        placeholder: 'eg. 10 cm'
    },
    "vitalSigns.abdominalPerimeter": {
        label: "Perímetro abdominal (cm)",
        type: 'text',
        placeholder: 'eg. 10 cm'
    }
}

type VitalSignsAndAnthropometryFormProps = {
    data?: Partial<VitalSignSchemaType>;
    onSubmit?: (value: VitalSignSchemaType) => void;
}
const FemoVitalSignsAndAnthropometryForm = React.forwardRef<HTMLFormElement, VitalSignsAndAnthropometryFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<VitalSignSchemaType>({
        initialValues: adjustInitialValue(data),
        validate: zodResolver(VitalSignSchema)
    });

    const handleSubmit = useCallback((value: VitalSignSchemaType) => {
        const sizeInMeters = value.vitalSigns.height / 100;
        const sqrtMeters = Math.pow(sizeInMeters, 2);
        const bmi = Math.floor((value.vitalSigns.weight / sqrtMeters) * 100) / 100;
        const newValue: VitalSignSchemaType["vitalSigns"] = {
            ...value.vitalSigns,
            bmi: bmi,
        }
        onSubmit?.({
            vitalSigns: { ...newValue }
        });
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

FemoVitalSignsAndAnthropometryForm.displayName = 'FemoVitalSignsAndAnthropometryForm';

export default FemoVitalSignsAndAnthropometryForm