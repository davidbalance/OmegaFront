import { Box, Button, Table, TextInput, rem } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import { IconSignature } from '@tabler/icons-react';
import Joi from 'joi';
import React from 'react'

type IApiKeyForm = {
    name: string;
}

const apiKeySchema = Joi.object<IApiKeyForm>({
    name: Joi
        .string()
        .empty()
        .required()
        .messages({
            "string.empty": 'Debe escribir el nombre del ApiKey',
        }),
});

export type ApiKeyFormProps = {
    onSubmit: (data: any) => void;
    data?: IApiKeyForm;
}

const ApiKeyForm = React.forwardRef<HTMLButtonElement, ApiKeyFormProps>(({ data, onSubmit }, ref) => {

    const form = useForm({
        initialValues: {
            name: data?.name || '',
        },
        validate: joiResolver(apiKeySchema)
    });

    return (
        <Box component='form' onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
                label='Nombre de la ApiKey'
                placeholder='Nombre del ApiKey'
                leftSection={<IconSignature stroke={1.5} />}
                style={{ marginBottom: rem(16) }}
                {...form.getInputProps('name')}
            />

            <Button type='submit' ref={ref} style={{ display: 'none' }}></Button>
        </Box>
    )
});

export default ApiKeyForm