import { BaseFormProps } from '@/lib/types/base-form-prop';
import { DiseaseGroup } from '@/services/api/disease-group/dtos';
import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import React from 'react'

type DiseaseGroupForm = Omit<DiseaseGroup, 'id'>;

const diseaseSchema = Joi.object<DiseaseGroupForm>({
  name: Joi
    .string()
    .empty()
    .required()
    .messages({
      "string.empty": 'Especifique un nombre'
    })
});

export type DiseaseGroupFormProps = BaseFormProps<DiseaseGroupForm>;
const DiseaseGroupForm = React.forwardRef<HTMLButtonElement, DiseaseGroupFormProps>(({ formData, onFormSubmitted }, ref) => {

  const form = useForm({
    initialValues: {
      name: formData?.name || '',
    },
    validate: joiResolver(diseaseSchema)
  });

  const handleFormSubmit = (submittedData: DiseaseGroupForm) => {
    onFormSubmitted?.(submittedData);
  }

  return (
    <Box component='form' onSubmit={form.onSubmit(handleFormSubmit)} miw={400}>
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

DiseaseGroupForm.displayName = 'DiseaseGroupForm';

export default DiseaseGroupForm