'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import MedicalConsultationSchema from './schemas/medical-consultation.schema'
import { z } from 'zod';
import { Box, rem, ScrollArea, Textarea } from '@mantine/core';

type MedicalConsultationFormProps = {
  data?: Partial<z.infer<typeof MedicalConsultationSchema>>,
  onSubmit?: (value: z.infer<typeof MedicalConsultationSchema>) => void;
}
const MedicalConsultationForm = React.forwardRef<HTMLFormElement, MedicalConsultationFormProps>(({
  data,
  onSubmit
}, ref) => {

  const form = useForm<z.infer<typeof MedicalConsultationSchema>>({
    initialValues: {
      medicalConsultationDescription: data?.medicalConsultationDescription ?? '',
    },
    validate: zodResolver(MedicalConsultationSchema)
  });

  const handleSubmit = useCallback((value: z.infer<typeof MedicalConsultationSchema>) => {
    console.log('Form submitted with values:', value);
    onSubmit?.(value);
  }, [onSubmit]);

  return (
    <Box
      ref={ref}
      component='form'
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ position: 'relative', width: '100%', height: '100%' }}>
      <ScrollArea
        component='div'
        px={rem(16)}
        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
        <Textarea
          label="MOTIVO DE CONSULTA"
          placeholder='eg. Consulta...'
          rows={10}
          {...form.getInputProps('medicalConsultationDescription')} />
      </ScrollArea>
    </Box >
  )
});


MedicalConsultationForm.displayName = 'MedicalConsultationForm';

export default MedicalConsultationForm