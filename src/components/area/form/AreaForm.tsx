import { Area } from "@/lib/dtos/location/area/base.response.dto";
import { BaseFormProps } from "@/lib/types/base-form-prop";
import { Box, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSignature } from "@tabler/icons-react";
import Joi from "joi";
import { joiResolver } from "mantine-form-joi-resolver";
import React from "react";

type AreaWithOmittedId = Omit<Area, 'id'>;

const diseaseSchema = Joi.object<AreaWithOmittedId>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        })
});

export type AreaFormProps = BaseFormProps<AreaWithOmittedId>;
const AreaForm = React.forwardRef<HTMLButtonElement, AreaFormProps>(({ formData, onFormSubmitted }, ref) => {

    const form = useForm({
        initialValues: {
            name: formData?.name || '',
        },
        validate: joiResolver(diseaseSchema)
    });

    const handleFormSubmit = (submittedData: AreaWithOmittedId) => {
        onFormSubmitted?.(submittedData);
    }

    return (
        <Box
            component='form'
            onSubmit={form.onSubmit(handleFormSubmit)}
            w='100%'
            maw={750}
        >
            <TextInput
                label="Nombre de area"
                placeholder="Area"
                size='xs'
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

AreaForm.displayName = 'AreaForm';

export { AreaForm }