import { ExamSubtype } from '@/lib/dtos/laboratory/exam/subtype/base.response.dto'
import { ExamType } from '@/lib/dtos/laboratory/exam/type/base.response.dto';
import { BaseFormProps } from '@/lib/types/base-form-prop';
import { Box, Button, Select, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React, { useMemo } from 'react';

interface ExamTypeForm extends Omit<ExamSubtype, 'id' | 'exams'> { }

const examTypeSchema = Joi.object<ExamTypeForm>({
    name: Joi
        .string()
        .empty()
        .messages({
            "string.empty": 'Especifique un nombre'
        })
});

interface ExamSubtypeFormProps extends BaseFormProps<ExamTypeForm> { }

const ExamSubtypeForm = React.forwardRef<HTMLButtonElement, ExamSubtypeFormProps>(({ formData, onFormSubmitted }, ref) => {

    const form = useForm<ExamTypeForm>({
        initialValues: {
            name: formData?.name || ''
        },
        validate: joiResolver(examTypeSchema)
    });

    return (
        <Box
            component='form'
            onSubmit={form.onSubmit(onFormSubmitted)}
        >
            <TextInput
                label="Noombre del subtipo"
                placeholder="Subtipo"
                size='xs'
                leftSection={<IconSignature stroke={1.5} />}
                {...form.getInputProps('name')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>

        </Box>
    )
});

ExamSubtypeForm.displayName = 'ExamSubtypeForm';

export { ExamSubtypeForm }