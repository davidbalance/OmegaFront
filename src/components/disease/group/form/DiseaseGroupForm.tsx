import { DiseaseGroup } from "@/lib/dtos/disease/group/response.dto";
import { BaseFormProps } from "@/lib/types/base-form-prop";
import { Box, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSignature } from "@tabler/icons-react";
import Joi from "joi";
import { joiResolver } from "mantine-form-joi-resolver";
import React, { useCallback } from "react";

type DiseaseGroupWithOmittedIdAndDiseases = Omit<DiseaseGroup, 'id' | 'diseases'>;

const diseaseSchema = Joi.object<DiseaseGroupWithOmittedIdAndDiseases>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        })
});

export type DiseseGroupFormProps = BaseFormProps<DiseaseGroupWithOmittedIdAndDiseases>;
const DiseseGroupForm = React.forwardRef<HTMLButtonElement, DiseseGroupFormProps>(({ formData, onFormSubmitted }, ref) => {

    const form = useForm({
        initialValues: {
            name: formData?.name || '',
        },
        validate: joiResolver(diseaseSchema)
    });

    const handleFormSubmittedEvent = useCallback((submittedData: DiseaseGroupWithOmittedIdAndDiseases) => {
        onFormSubmitted?.(submittedData);
    }, [onFormSubmitted]);

    return (
        <Box
            component='form'
            onSubmit={form.onSubmit(handleFormSubmittedEvent)}
            w='100%'
            maw={750}
        >
            <TextInput
                label="Nombre del grupo de morbilidades"
                placeholder="Grupo de morbilidades"
                size='xs'
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

DiseseGroupForm.displayName = 'DiseseGroupForm';

export default DiseseGroupForm