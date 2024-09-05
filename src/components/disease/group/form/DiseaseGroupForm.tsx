import { Box, TextInput, Button, Flex, rem } from "@mantine/core";
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
            "string.empty": 'Especifique un nombre',
        })
});

export type DiseseGroupFormProps = {
    name?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};
const DiseseGroupForm = React.forwardRef<HTMLFormElement, DiseseGroupFormProps>(({
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
            mt={rem(16)}
            px={rem(16)}
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
                name="name"
                label="Nombre del grupo de morbilidades"
                placeholder="Grupo de morbilidades"
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    )
})

export default DiseseGroupForm