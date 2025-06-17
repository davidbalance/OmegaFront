'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialExtraJobActivitySchema from '../_schemas/initial-extra-job-activity.schema'
import { z } from 'zod';
import { Box, rem, Textarea, Title } from '@mantine/core';

type InitialExtraJobActivityFormProps = {
    data?: Partial<z.infer<typeof InitialExtraJobActivitySchema>>;
    onSubmit?: (value: z.infer<typeof InitialExtraJobActivitySchema>) => void;
}
const InitialExtraJobActivityForm = React.forwardRef<HTMLFormElement, InitialExtraJobActivityFormProps>(({
    data,
    onSubmit
}, ref) => {

    const form = useForm<z.infer<typeof InitialExtraJobActivitySchema>>({
        initialValues: {
            extraActivityDescription: data?.extraActivityDescription ?? ''
        },
        validate: zodResolver(InitialExtraJobActivitySchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialExtraJobActivitySchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <>
            <Title order={3}>Actividades Extra Laborales</Title>
            <Box
                mt={rem(16)}
                component='form'
                ref={ref}
                onSubmit={form.onSubmit(handleSubmit)}>
                <Textarea
                    mt={rem(16)}
                    placeholder="eg. Desempeña..."
                    rows={10}
                    {...form.getInputProps(`extraActivityDescription`)} />
            </Box>
        </>
    )
});

InitialExtraJobActivityForm.displayName = 'InitialExtraJobActivityForm';

export default InitialExtraJobActivityForm