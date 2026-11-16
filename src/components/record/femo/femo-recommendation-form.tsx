'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, rem, Stack, Textarea, Title } from '@mantine/core';
import RecommendationSchema, { RecommendationSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/recommendation.schema';

type FemoRecommendationFormProps = {
  data?: Partial<RecommendationSchemaType>,
  onSubmit?: (value: RecommendationSchemaType) => void;
}
const FemoRecommendationForm = React.forwardRef<HTMLFormElement, FemoRecommendationFormProps>(({
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
      <Title order={3}>Recomendacion y/o Tratamiento</Title>
      <Box
        mt={rem(16)}
        ref={ref}
        component='form'
        onSubmit={formSubmit(handleSubmit)}
        style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Stack gap={rem(8)}>
          <Textarea
            label="Descripción"
            placeholder='eg. Lorem Ipsum...'
            rows={10}
            {...getInputProps('recommendation.description')} />
        </Stack>
      </Box>
    </>
  )
});


FemoRecommendationForm.displayName = 'FemoRecommendationForm';

export default FemoRecommendationForm