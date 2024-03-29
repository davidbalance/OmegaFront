import { MorbidityGroupModel } from '@/services';
import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import { joiResolver } from 'mantine-form-joi-resolver';
import React from 'react'

type IMorbidityGroupForm = Omit<MorbidityGroupModel, 'id'>;

const userSchema = Joi.object<IMorbidityGroupForm>({
  name: Joi
    .string()
    .empty()
    .required()
    .messages({
      "string.empty": 'Especifique un nombre'
    })
});

type MorbidityGroupFormProps = {
  onSubmit: (values: IMorbidityGroupForm) => void;
  data?: IMorbidityGroupForm;
}
const MorbidityGroupForm = React.forwardRef<HTMLButtonElement, MorbidityGroupFormProps>(({ onSubmit, data }, ref) => {

  const form = useForm({
    initialValues: {
      name: data?.name || '',
    },
    validate: joiResolver(userSchema)
  });

  return (
    <Box component='form' onSubmit={form.onSubmit(onSubmit)}>
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

export default MorbidityGroupForm