'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import RecommendationSchema from './schemas/recommendation.schema'
import { z } from 'zod';
import { Box, rem, Textarea, Title } from '@mantine/core';

type RecommendationFormProps = {
  data?: Partial<z.infer<typeof RecommendationSchema>>,
  onSubmit?: (value: z.infer<typeof RecommendationSchema>) => void;
}
const RecommendationForm = React.forwardRef<HTMLFormElement, RecommendationFormProps>(({
  data,
  onSubmit
}, ref) => {

  const form = useForm<z.infer<typeof RecommendationSchema>>({
    initialValues: {
      recommendationDescription: data?.recommendationDescription ?? '',
    },
    validate: zodResolver(RecommendationSchema)
  });

  const handleSubmit = useCallback((value: z.infer<typeof RecommendationSchema>) => {
    onSubmit?.(value);
  }, [onSubmit]);

  return (
    <>
      <Title order={3}>Recomendaciones y/o tratamientos</Title>
      <Box
        mt={rem(16)}
        ref={ref}
        component='form'
        onSubmit={form.onSubmit(handleSubmit)}
        style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Textarea
          placeholder='eg. Consulta...'
          rows={10}
          {...form.getInputProps('recommendationDescription')} />
      </Box>
    </>
  )
});


RecommendationForm.displayName = 'RecommendationForm';

export default RecommendationForm