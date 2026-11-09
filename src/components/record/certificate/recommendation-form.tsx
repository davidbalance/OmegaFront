'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, rem, Stack, Textarea, Title } from '@mantine/core';
import RecommendationSchema, { RecommendationSchemaType, adjustInitialValue } from '@/server/record/create-record/certificate/recommendation.schema';

type RecommendationFormProps = {
  data?: Partial<RecommendationSchemaType>,
  onSubmit?: (value: RecommendationSchemaType) => void;
}
const RecommendationForm = React.forwardRef<HTMLFormElement, RecommendationFormProps>(({
  data,
  onSubmit
}, ref) => {

  const { onSubmit: formSubmit, getInputProps } = useForm<RecommendationSchemaType>({
    initialValues: adjustInitialValue(data),
    validate: zodResolver(RecommendationSchema)
  });

  const handleSubmit = useCallback((value: RecommendationSchemaType) => {
    onSubmit?.(value);
  }, [onSubmit]);

  return (
    <>
      <Title order={3}>Recomendaciones/Observaciones</Title>
      <Box
        mt={rem(16)}
        ref={ref}
        component='form'
        onSubmit={formSubmit(handleSubmit)}
        style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Stack gap={rem(8)}>
          <Textarea
            label="Descripción"
            rows={10}
            {...getInputProps('recommendation.observation')} />
        </Stack>
      </Box>
    </>
  )
});


RecommendationForm.displayName = 'RecommendationForm';

export default RecommendationForm