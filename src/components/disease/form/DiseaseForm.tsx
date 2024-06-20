import { Disease } from "@/lib/dtos/disease/response.dto";
import { BaseFormProps } from "@/lib/types/base-form-prop";
import { Box, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSignature } from "@tabler/icons-react";
import Joi from "joi";
import { joiResolver } from "mantine-form-joi-resolver";
import React from "react";

type DiseaseWithOmittedId = Omit<Disease, 'id'>;

const diseaseSchema = Joi.object<DiseaseWithOmittedId>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        })
});

export type DiseaseFormProps = BaseFormProps<DiseaseWithOmittedId>;
const DiseaseForm = React.forwardRef<HTMLButtonElement, DiseaseFormProps>(({ formData, onFormSubmitted }, ref) => {

    const form = useForm({
        initialValues: {
            name: formData?.name || '',
        },
        validate: joiResolver(diseaseSchema)
    });

    const handleFormSubmit = (submittedData: DiseaseWithOmittedId) => {
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
                label="Nombre de morbilidad"
                placeholder="Morbilidad"
                size='xs'
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

DiseaseForm.displayName = 'DiseaseForm';

export { DiseaseForm }