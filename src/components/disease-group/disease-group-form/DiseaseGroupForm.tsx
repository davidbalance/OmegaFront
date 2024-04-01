import { BaseFormProps } from '@/lib/types/base-form-prop';
import { DiseaseGroup as DiseaseGroupType } from '@/services';
import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import React from 'react'

type IDiseaseGroupForm = Omit<DiseaseGroupType, 'id'>;

const diseaseSchema = Joi.object<IDiseaseGroupForm>({
  name: Joi
    .string()
    .empty()
    .required()
    .messages({
      "string.empty": 'Especifique un nombre'
    })
});

export type DiseaseGroupFormProps = BaseFormProps<IDiseaseGroupForm>;
const DiseaseGroupForm = React.forwardRef<HTMLButtonElement, DiseaseGroupFormProps>(({ formData, onFormSubmitted }, ref) => {

  const form = useForm({
    initialValues: {
      name: formData?.name || '',
    },
    validate: joiResolver(diseaseSchema)
  });

  const handleFormSubmit = (submittedData: IDiseaseGroupForm) => {
    onFormSubmitted?.(submittedData);
  }

  return (
    <Box component='form' onSubmit={form.onSubmit(handleFormSubmit)}>
      <TextInput
        label="Nombre del grupo de morbilidades"
        placeholder="Grupo de morbilidades"
        leftSection={<IconSignature stroke={1.5} />}
        {...form.getInputProps('name')}
      />

      <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
    </Box>
  )
})

export default DiseaseGroupForm