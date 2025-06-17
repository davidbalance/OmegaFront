'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import IncidentSchema from './schemas/incident.schema'
import { z } from 'zod';
import { Box, rem, Textarea, Title } from '@mantine/core';

type IncidentFormProps = {
  data?: Partial<z.infer<typeof IncidentSchema>>,
  onSubmit?: (value: z.infer<typeof IncidentSchema>) => void;
}
const IncidentForm = React.forwardRef<HTMLFormElement, IncidentFormProps>(({
  data,
  onSubmit
}, ref) => {

  const form = useForm<z.infer<typeof IncidentSchema>>({
    initialValues: {
      incidentDescription: data?.incidentDescription ?? '',
    },
    validate: zodResolver(IncidentSchema)
  });

  const handleSubmit = useCallback((value: z.infer<typeof IncidentSchema>) => {
    onSubmit?.(value);
  }, [onSubmit]);

  return (
    <>
      <Title order={3}>Antecedentes Personales</Title>
      <Title order={5} c="dimmed">Incidentes</Title>
      <Box
        mt={rem(16)}
        ref={ref}
        component='form'
        onSubmit={form.onSubmit(handleSubmit)}
        style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Textarea
          label="Descripción"
          placeholder='eg. Consulta...'
          rows={10}
          {...form.getInputProps('incidentDescription')} />
      </Box>
    </>
  )
});


IncidentForm.displayName = 'IncidentForm';

export default IncidentForm