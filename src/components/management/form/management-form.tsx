'use client'

import { Box, TextInput, Button, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSignature } from "@tabler/icons-react";
import Joi from "joi";
import { joiResolver } from "mantine-form-joi-resolver";
import React, { FormEvent } from "react";

const diseaseSchema = Joi.object({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        })
});

interface ManagementFormProps {
    name?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};
const ManagementForm = React.forwardRef<HTMLFormElement, ManagementFormProps>(({
    name,
    onSubmit
}, ref) => {

    const form = useForm({
        initialValues: {
            name: name || '',
        },
        validate: joiResolver(diseaseSchema)
    });

    const handleSubmit = (_: any, event: FormEvent<HTMLFormElement> | undefined) => {
        if (event) {
            onSubmit?.(event);
        }
    };

    return (
        <Box
            ref={ref}
            component='form'
            mt={rem(16)}
            px={rem(16)}
            onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                name="name"
                label="Nombre de la gerencia"
                placeholder="Gerencia"
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')} />

            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    )
});

export default ManagementForm;