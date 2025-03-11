'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import InitialExtraJobActivitySchema from '../_schemas/initial-extra-job-activity.schema'
import { z } from 'zod';
import { Textarea } from '@mantine/core';

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
            extraActivityDescription: ''
        },
        validate: zodResolver(InitialExtraJobActivitySchema)
    });

    const handleSubmit = useCallback((value: z.infer<typeof InitialExtraJobActivitySchema>) => {
        onSubmit?.(value);
    }, [onSubmit]);

    return (
        <form
            ref={ref}
            onSubmit={form.onSubmit(handleSubmit)}>
            <Textarea
                label="ACTIVIDADES EXTRA LABORALES"
                placeholder="eg. Desempeña..."
                rows={10}
                {...form.getInputProps(`extraActivityDescription`)} />
        </form >
    )
});

InitialExtraJobActivityForm.displayName = 'InitialExtraJobActivityForm';

export default InitialExtraJobActivityForm