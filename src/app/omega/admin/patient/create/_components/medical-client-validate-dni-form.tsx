'use client'

import { ModularBox } from '@/components/modular/box/ModularBox'
import { Box, Button, Grid, GridCol, TextInput } from '@mantine/core'
import { joiResolver, useForm } from '@mantine/form'
import { IconSignature } from '@tabler/icons-react'
import Joi from 'joi'
import React, { useState } from 'react'
import { useMedicalClientValidateDni } from '../_context/medical-client-validate-dni.context'

const schema = Joi.object({
    dni: Joi
        .string()
        .min(10)
        .max(10)
        .required()
});

const MedicalClientValidateDniForm: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const { validate } = useMedicalClientValidateDni();

    const form = useForm({
        initialValues: { dni: '' },
        validate: joiResolver(schema)
    });

    const handleSubmit = async ({ dni }: { dni: string }) => {
        console.log(dni);
        setLoading(true);
        await validate(dni);
        setLoading(false);
    }

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
                            {...form.getInputProps('dni')}
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

export default MedicalClientValidateDniForm