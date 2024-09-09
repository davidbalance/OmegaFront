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

interface DiseaseFormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref'> {
    name?: string;
};
const DiseaseForm = React.forwardRef<HTMLFormElement, DiseaseFormProps>(({
    name,
    onSubmit,
    ...props
}, ref) => {

    const form = useForm({
        initialValues: {
            name: name || '',
        },
        validate: joiResolver(diseaseSchema)
    });

    const handleFormSubmit = (_: any, event: FormEvent<HTMLFormElement> | undefined) => {
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
            onSubmit={form.onSubmit(handleFormSubmit)}
            {...props}>
            <TextInput
                name="name"
                label="Nombre de morbilidad"
                placeholder="Morbilidad"
                leftSection={(<IconSignature stroke={1.5} />)}
                {...form.getInputProps('name')}
            />

            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    )
})

export default DiseaseForm;