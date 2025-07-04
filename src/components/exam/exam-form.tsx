'use client'

import { Box, Button, rem, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconDeviceFloppy, IconSignature } from '@tabler/icons-react';
import ExamSchema from './schemas/exam.schema';
import React, { useCallback } from 'react';
import { z } from 'zod';
import ModularLayout from '../modular/layout/ModularLayout';
import { ModularBox } from '../modular/box/ModularBox';
import { Exam } from '@/server/exam/server-types';

type ExamFormProps = Partial<Omit<Exam, 'examId'>> & {
    loading?: boolean
    onSubmit?: (value: z.infer<typeof ExamSchema>) => void;
};
const ExamForm: React.FC<ExamFormProps> = ({
    examName,
    loading,
    onSubmit
}) => {

    const form = useForm<z.infer<typeof ExamSchema>>({
        initialValues: {
            examName: examName ?? '',
        },
        validate: zodResolver(ExamSchema)
    });

    const handleSubmit = useCallback(
        (value: z.infer<typeof ExamSchema>) => {
            onSubmit?.(value);
        }, [onSubmit]);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}
            style={{ flex: '1' }}>
            <ModularLayout>
                <ModularBox flex={1}>
                    <Box mt={rem(16)} px={rem(16)}>
                        <TextInput
                            name="name"
                            label="Nombre del examen"
                            placeholder="Examen"
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('examName')} />

                    </Box>
                    <Button type='submit' style={{ display: 'none' }} />
                </ModularBox>
                <ModularBox>
                    <Button
                        loading={loading}
                        fullWidth
                        flex={1}
                        size='xs'
                        type="submit"
                        leftSection={(
                            <IconDeviceFloppy
                                style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        )}>
                        Guardar
                    </Button>
                </ModularBox>
            </ModularLayout>
        </form>)
}

export default ExamForm;