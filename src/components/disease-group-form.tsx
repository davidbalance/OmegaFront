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
            "string.empty": 'Especifique un nombre',
        })
});

interface DiseseGroupFormProps extends Omit<React.HTMLProps<HTMLFormElement>, 'ref'> {
    name?: string;
};
const DiseseGroupForm = React.forwardRef<HTMLFormElement, DiseseGroupFormProps>(({
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
            onSubmit={form.onSubmit(handleSubmit)}
            {...props}>
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

DiseseGroupForm.displayName = 'DiseseGroupForm'

export default DiseseGroupForm