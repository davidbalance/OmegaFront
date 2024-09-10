import { Area } from "@/lib/dtos/location/area/base.response.dto";
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

type FormProp = Omit<React.HTMLProps<HTMLFormElement>, 'ref'> & Partial<Omit<Area, 'id' | 'management'>>;
interface AreaFormProps extends FormProp { }
const AreaForm = React.forwardRef<HTMLFormElement, AreaFormProps>(({
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
    }

    return (
        <Box
            ref={ref}
            component='form'
            onSubmit={form.onSubmit(handleSubmit)}
            mt={rem(16)}
            px={rem(16)}
            {...props}
        >
            <TextInput
                name="name"
                label="Nombre de area"
                placeholder="Area"
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' style={{ display: 'none' }} />
        </Box>
    )
})

AreaForm.displayName = 'AreaForm';

export default AreaForm;