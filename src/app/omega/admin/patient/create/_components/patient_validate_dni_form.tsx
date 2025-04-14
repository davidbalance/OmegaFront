'use client'

import { ModularBox } from '@/components/modular/box/ModularBox';
import { Box, Button, Grid, GridCol, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import React, { useCallback, useState } from 'react';
import { useDniValidation } from '../_context/dni_validation.context';
import DniSchema from '../_schemas/dni.schema';
import { z } from 'zod';

const PatientValidateDniForm: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { validate } = useDniValidation();

    const form = useForm<z.infer<typeof DniSchema>>({
        initialValues: { patientDni: '' },
        validate: zodResolver(DniSchema)
    });

    const handleSubmit = useCallback(
        async (data: z.infer<typeof DniSchema>) => {
            setLoading(true);
            await validate(data.patientDni);
            setLoading(false);
        }, [validate])

    return (
        <ModularBox>
            <Box
                component='form'
                onSubmit={form.onSubmit(handleSubmit)}>
                <Grid>
                    <GridCol span={9}>
                        <TextInput
                            name='dni'
                            placeholder='Validar cedula'
                            leftSection={<IconSignature stroke={1.5} />}
                            {...form.getInputProps('patientDni')}
                        />
                    </GridCol>
                    <GridCol span={3}>
                        <Button
                            fullWidth
                            type='submit'
                            loading={loading}>
                            Validar
                        </Button>
                    </GridCol>
                </Grid>
            </Box>
        </ModularBox >
    )
}

export default PatientValidateDniForm