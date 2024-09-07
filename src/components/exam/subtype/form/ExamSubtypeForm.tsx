'use client'

import { ExamSingleSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto'
import { Box, Button, rem, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React, { FormEvent } from 'react';

const examTypeSchema = Joi.object({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        })
});

type FormProps = Omit<React.HTMLProps<HTMLFormElement>, 'ref'> & Partial<Omit<ExamSingleSubtype, 'id'>>
interface ExamSubtypeFormProps extends FormProps { }
const ExamSubtypeForm = React.forwardRef<HTMLFormElement, ExamSubtypeFormProps>(({
    name,
    onSubmit,
    ...props
}, ref) => {

    const form = useForm({
        initialValues: {
            name: name || ''
        },
        validate: joiResolver(examTypeSchema)
    });

    const handleSubmit = (_: any, event: FormEvent<HTMLFormElement> | undefined) => {
        if (event) {
            onSubmit?.(event);
        }
    }

    return (
        <Box
            ref={ref}
            component='form'
            mt={rem(16)}
            px={rem(16)}
            onSubmit={form.onSubmit(handleSubmit)}
            {...props}>

            <TextInput
                name='name'
                label="Nombre del subtipo"
                placeholder="Subtipo"
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' style={{ display: 'none' }} />

        </Box>
    )
});

ExamSubtypeForm.displayName = 'ExamSubtypeForm';

export { ExamSubtypeForm }