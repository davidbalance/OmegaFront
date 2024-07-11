import { Management } from "@/lib/dtos/location/management/response.dto";
import { BaseFormProps } from "@/lib/types/base-form-prop";
import { Box, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSignature } from "@tabler/icons-react";
import Joi from "joi";
import { joiResolver } from "mantine-form-joi-resolver";
import React, { useCallback } from "react";

type ManagementWithOmittedIdAndArea = Omit<Management, 'id' | 'areas'>;

const diseaseSchema = Joi.object<ManagementWithOmittedIdAndArea>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Especifique un nombre'
        })
});

export type ManagementFormProps = BaseFormProps<ManagementWithOmittedIdAndArea>;
const ManagementForm = React.forwardRef<HTMLButtonElement, ManagementFormProps>(({ formData, onFormSubmitted }, ref) => {

    const form = useForm({
        initialValues: {
            name: formData?.name || '',
        },
        validate: joiResolver(diseaseSchema)
    });

    const handleFormSubmittedEvent = useCallback((submittedData: ManagementWithOmittedIdAndArea) => {
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
                label="Nombre de la gerencia"
                placeholder="Gerencia"
                size='xs'
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
})

ManagementForm.displayName = 'ManagementForm';

export { ManagementForm }