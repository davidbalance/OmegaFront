'use client'

import { ExamSubtype } from '@/server/exam_subtype/server_types';
import { Box, Button, rem, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconDeviceFloppy, IconSignature } from '@tabler/icons-react';
import ExamSubtypeSchema from './schemas/exam_subtype.schema';
import React, { useCallback } from 'react';
import { z } from 'zod';
import ModularLayout from '../modular/layout/ModularLayout';
import { ModularBox } from '../modular/box/ModularBox';

type ExamSubtypeFormProps = Partial<Omit<ExamSubtype, 'subtypeId' | 'hasExams'>> & {
    loading?: boolean
    onSubmit?: (value: z.infer<typeof ExamSubtypeSchema>) => void;
};
const ExamSubtypeForm: React.FC<ExamSubtypeFormProps> = ({
    subtypeName,
    loading,
    onSubmit
}) => {

    const form = useForm<z.infer<typeof ExamSubtypeSchema>>({
        initialValues: {
            subtypeName: subtypeName ?? '',
        },
        validate: zodResolver(ExamSubtypeSchema)
    });

    const handleSubmit = useCallback(
        (value: z.infer<typeof ExamSubtypeSchema>) => {
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
                            label="Nombre del subtipo de examen"
                            placeholder="Subtipo de examen"
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('subtypeName')} />

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

export default ExamSubtypeForm;