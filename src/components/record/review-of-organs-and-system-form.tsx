'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback, useState } from 'react'
import ReviewOfOrgansAndSystemSchema, { adjustInitalValues } from './schemas/review-of-organs-and-systems.schema'
import { z } from 'zod';
import { Box, Grid, GridCol, rem, Stack, Switch, Textarea, Title } from '@mantine/core';

const options: z.infer<typeof ReviewOfOrgansAndSystemSchema> = {
    reviewOfOrgansSkin: "Piel y anexos",
    reviewOfOrgansSenseOrgans: "Órganos de los sentidos",
    reviewOfOrgansBreath: "Respiratorio",
    reviewOfOrgansCardiovascular: "Cardiovascular",
    reviewOfOrgansDigestive: "Digestivo",
    reviewOfOrgansUrinary: "Genitourinario",
    reviewOfOrgansSkeletalMuscle: "Músculo-esquelético",
    reviewOfOrgansEndocrinic: "Endocrino",
    reviewOfOrgansHemoLymphatic: "Hemo-linfático",
    reviewOfOrgansHighlyStrung: "Nervioso",
}

type ReviewOfOrgansAndSystemFormProps = {
    data?: Partial<z.infer<typeof ReviewOfOrgansAndSystemSchema>>;
    onSubmit?: (value: z.infer<typeof ReviewOfOrgansAndSystemSchema>) => void;
}
const ReviewOfOrgansAndSystemForm = React.forwardRef<HTMLFormElement, ReviewOfOrgansAndSystemFormProps>(({
    data,
    onSubmit
}, ref) => {

    const [switches, setSwitches] = useState<Record<keyof z.infer<typeof ReviewOfOrgansAndSystemSchema>, boolean>>({
        reviewOfOrgansSkin: !!data?.reviewOfOrgansSkin,
        reviewOfOrgansSenseOrgans: !!data?.reviewOfOrgansSenseOrgans,
        reviewOfOrgansBreath: !!data?.reviewOfOrgansBreath,
        reviewOfOrgansCardiovascular: !!data?.reviewOfOrgansCardiovascular,
        reviewOfOrgansDigestive: !!data?.reviewOfOrgansDigestive,
        reviewOfOrgansUrinary: !!data?.reviewOfOrgansUrinary,
        reviewOfOrgansSkeletalMuscle: !!data?.reviewOfOrgansSkeletalMuscle,
        reviewOfOrgansEndocrinic: !!data?.reviewOfOrgansEndocrinic,
        reviewOfOrgansHemoLymphatic: !!data?.reviewOfOrgansHemoLymphatic,
        reviewOfOrgansHighlyStrung: !!data?.reviewOfOrgansHighlyStrung,
    });

    const form = useForm<z.infer<typeof ReviewOfOrgansAndSystemSchema>>({
        initialValues: adjustInitalValues(data),
        validate: zodResolver(ReviewOfOrgansAndSystemSchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof ReviewOfOrgansAndSystemSchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    const handleSwitchChange = useCallback((key: keyof z.infer<typeof ReviewOfOrgansAndSystemSchema>, value: boolean) => {
        setSwitches(prev => ({ ...prev, [key]: value }));
        if (!value) form.setFieldValue(key, '');
    }, [form]);

    return (
        <>
            <Title order={3}>Revisión Actual de Órganos y Sistemas</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Grid>
                    <GridCol span={4}>
                        <Stack gap={rem(16)}>
                            {Object.entries(options).map(([key, value]) => (
                                <Switch
                                    key={key}
                                    label={value}
                                    checked={switches[key as keyof z.infer<typeof ReviewOfOrgansAndSystemSchema>]}
                                    onChange={e => handleSwitchChange(key as keyof z.infer<typeof ReviewOfOrgansAndSystemSchema>, e.target.checked)} />
                            ))}
                        </Stack>
                    </GridCol>
                    <GridCol span={8}>
                        <Stack
                            gap={rem(32)}
                            align='start' w='100%'>
                            {Object.entries(options).map(([key, value]) => (
                                switches[key as keyof z.infer<typeof ReviewOfOrgansAndSystemSchema>] &&
                                <Textarea
                                    key={key}
                                    w='100%'
                                    rows={5}
                                    label={value}
                                    placeholder="Escriba la observación aquí"
                                    {...form.getInputProps(key)} />
                            ))}
                        </Stack>
                    </GridCol>
                </Grid>
            </Box>
        </>
    )
});

ReviewOfOrgansAndSystemForm.displayName = 'ReviewOfOrgansAndSystemForm';

export default ReviewOfOrgansAndSystemForm