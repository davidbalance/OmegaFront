'use client'

import { useForm, zodResolver } from '@mantine/form';
import React, { useCallback } from 'react'
import { Box, rem, Select, Stack, Textarea, Title } from '@mantine/core';
import RetirementSchema, { RETIREMENT_NO_OPTION, RETIREMENT_YES_OPTION, RetirementSchemaType, adjustInitialValue } from '@/server/record/create-record/femo/retirement.schema';
import { Option } from '@/lib/types/option.type';

const evaluationPerformedOptions: Option[] = [
  { label: "Sí", value: RETIREMENT_YES_OPTION },
  { label: "No", value: RETIREMENT_NO_OPTION }
]

const healthConditionWorkRelatedOptions: Option[] = [
  { label: "Sí", value: RETIREMENT_YES_OPTION },
  { label: "No", value: RETIREMENT_NO_OPTION }
]

type FemoRetirementFormProps = {
  data?: Partial<RetirementSchemaType>,
  onSubmit?: (value: RetirementSchemaType) => void;
}
const FemoRetirementForm = React.forwardRef<HTMLFormElement, FemoRetirementFormProps>(({
  data,
  onSubmit
}, ref) => {

  const { onSubmit: formSubmit, getInputProps } = useForm<RetirementSchemaType>({
    initialValues: adjustInitialValue(data),
    validate: zodResolver(RetirementSchema)
  });

  const handleSubmit = useCallback((value: RetirementSchemaType) => {
    onSubmit?.(value);
  }, [onSubmit]);

  return (
    <>
      <Title order={3}>Retiro (Evaluación)</Title>
      <Box
        mt={rem(16)}
        ref={ref}
        component='form'
        onSubmit={formSubmit(handleSubmit)}
        style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Stack gap={rem(8)}>

          <Select
            data={evaluationPerformedOptions}
            checkIconPosition="left"
            label="Se realiza la evaluación"
            defaultDropdownOpened={false}
            maxDropdownHeight={200}
            allowDeselect={false}
            {...getInputProps('retirementEvaluation.performed')} />

          <Select
            data={healthConditionWorkRelatedOptions}
            checkIconPosition="left"
            label="La condición de salud esta relacionada con el Trabajo"
            defaultDropdownOpened={false}
            maxDropdownHeight={200}
            allowDeselect={false}
            {...getInputProps('retirementEvaluation.workRelated')} />

          <Textarea
            label="Descripción"
            rows={10}
            {...getInputProps('retirementEvaluation.observation')} />
        </Stack>
      </Box>
    </>
  )
});


FemoRetirementForm.displayName = 'FemoRetirementForm';

export default FemoRetirementForm